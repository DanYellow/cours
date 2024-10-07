import unicodedata
import re
import glob
import os
import time
import subprocess
import argparse
from zipfile import ZipFile, ZIP_DEFLATED

start_time = time.time()

# Take all ressources's folder in each folder and create archives type zip. The folder MUST but named "ressources" or it will be ignored
# Note : If ressources folder is within another one, only the root one will be taken
# Note 2 : SAE's folder are excluded from the operation since the students, most of them, will download the code at home, there's almost no chance we have
# a token error from https://download-directory.github.io/

os.chdir("../")
print("--- Archives generation started. Please wait. ---")

parser = argparse.ArgumentParser()
parser.add_argument(
    "-a",
    "--all", 
    help="Crée les archives de tous les dossiers",
    required=False,
    action='store_true',
)
args = parser.parse_args()

def get_list_directories_updated():
    stdout_git_status = subprocess.check_output('git status', shell=True)
    git_status_raw = re.findall(
        r"modified:[\w\s./-]+$", 
        stdout_git_status.decode("utf-8"), 
        re.MULTILINE
    )

    list_excluded_words = [
        "gestion-ressources",
        "zip",
        "pdf",
        "odp",
        "sae",
        "code"
    ]

    def clean_directory_path(path):
        cleaned_path = path.replace("modified:", "").strip()
        return cleaned_path
    
    def get_cleared_directory(path):
        r = re.search(r"^(.*?)numero-\d+\/ressources", path)

        return r.group(0) if r else ""

    list_cleaned_paths = map(clean_directory_path, git_status_raw)
    list_directories_ressources = [x for x in list(list_cleaned_paths) if any(substring in x for substring in list_excluded_words) == False]
    
    list_cleared_directories_ressources = map(get_cleared_directory, list(list_directories_ressources))
    list_cleared_directories_ressources = list(filter(None, list_cleared_directories_ressources))
    list_cleared_directories_ressources = list(dict.fromkeys(list_cleared_directories_ressources))

    return list_cleared_directories_ressources

def slugify(value, allow_unicode=False):
    """
    Taken from https://github.com/django/django/blob/master/django/utils/text.py
    Convert to ASCII if 'allow_unicode' is False. Convert spaces or repeated
    dashes to single dashes. Remove characters that aren't alphanumerics,
    underscores, or hyphens. Convert to lowercase. Also strip leading and
    trailing whitespace, dashes, and underscores.
    """
    value = str(value)
    if allow_unicode:
        value = unicodedata.normalize('NFKC', value)
    else:
        value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value.lower())

    return re.sub(r'[-\s]+', '-', value).strip('-_')


def get_all_ressources_sae_directories():
    list_ressources_folders_raw = glob.glob("**/ressources*", recursive=True)
    list_ressources_folders = [path for path in list_ressources_folders_raw if os.path.isdir(path)]
    list_ressources_folders_to_zip = [path for path in list_ressources_folders if path.count('ressources') == 1]
    list_ressources_folders_to_zip = [path for path in list_ressources_folders_to_zip if path.count('code') == 0]

    list_saes_folders_raw = glob.glob("**/*sae*", recursive=True)
    list_saes_folders = [path for path in list_saes_folders_raw if os.path.isdir(path)]
    list_saes_folders_non_nested = [path for path in list_saes_folders if path.count('sae') == 1]

    # SAES at the root of the ressource's folder
    list_saes_folders_root_ressources = []

    for folder_path in list_saes_folders_non_nested:
        normalized_path = os.path.normpath(folder_path)
        arrayed_path = normalized_path.split(os.sep)

        sae_indexes = [i for i, item in enumerate(arrayed_path) if re.search('sae', item)]
        if len(sae_indexes) == 1 and sae_indexes[0] == 1:
            list_saes_folders_root_ressources.append(folder_path)
            
    # Contains ressources folder and saes folder, you can use that variable in the loop below if needed
    # list_all_folders = list_ressources_folders_to_zip + list_saes_folders_root_ressources
    
    return list_ressources_folders_to_zip

if args.all:
    list_ressources_folders_to_zip = get_all_ressources_sae_directories()
else:
    list_ressources_folders_to_zip = get_list_directories_updated()

# Debug purpose
# list_ressources_folders_to_zip = [r"integration-web-s3/travaux-pratiques/numero-5/ressources"]

list_folders_excluded = [
    "correction", 
    "node_modules", 
    "vendors", 
    "playwright-report", 
    "tmp",
    "temp",
    "test-results",
    "tests-examples",
    "blob-report",
    ".cache",
    ".DS_STORE",
    "lock.",
]

dict_correction_archive_created = {}

def generate_zip(list_folders, is_correction_directory = False):
    for folder_path in list_folders:
        head, tail = os.path.split(folder_path)
        archive_suffix = f"-{tail}" if "sae" in tail or is_correction_directory else ""
        archive_name = f'{slugify(head.replace("\\", "_").replace("/", "_"))}{archive_suffix}'
        archive_path = f'{head}/{archive_name.replace("_ressources", "")}.ressources.zip'        
        
        if is_correction_directory:
            if archive_path not in dict_correction_archive_created:
                dict_correction_archive_created[archive_path] = True
            else:
                continue
        
        with ZipFile(archive_path, 'w', ZIP_DEFLATED) as zip_object:
            abs_src = os.path.abspath(folder_path)
            for dirname, _, files in os.walk(folder_path):
                for filename in files:
                    absname = os.path.abspath(os.path.join(dirname, filename))
                    arcname = absname[len(abs_src) + 1:]

                    if bool([ele for ele in list_folders_excluded if(ele in arcname.encode("unicode_escape").decode("utf-8"))]) == False:
                        zip_object.write(absname, arcname)
                    if "correction" in arcname.encode("unicode_escape").decode("utf-8"):
                        generate_zip([os.path.join(folder_path, "correction")], True)
            zip_object.close()
            
generate_zip(list_ressources_folders_to_zip)

print("--- Archives generated in %.2f seconds ---" % (time.time() - start_time))