import unicodedata
import re
import glob
import os
import time
import subprocess
import argparse
import pathlib
from zipfile import ZipFile, ZIP_DEFLATED

start_time = time.time()

# Take all ressources's folder in each folder and create archives type zip. The folder MUST but named "ressources" or it will be ignored
# Note : If ressources folder is within another one, only the root one will be taken
# Note 2 : SAE's folder are excluded from the operation since the students, most of them, will download the code at home, there's almost no chance we have
# a token error from https://download-directory.github.io/

if "generation-archives" in os.getcwd():
    os.chdir("../")
print("--- Archives generation started. Please wait. ---")

if not os.path.exists('flag.tmp.txt'):
    with open('flag.tmp.txt', 'w'): pass

with open('.gitignore') as my_file:
    list_ignored_files = my_file.readlines()
    list_ignored_files = list(filter(lambda x: not x.startswith("#"), list_ignored_files))
    list_ignored_files = list(map(lambda x: x.replace('\n', ''), list_ignored_files))
    list_ignored_files = list(filter(None, list_ignored_files))

    list_ignored_files.extend(["odp", "code", "gestion-ressources"]) # "zip",
    list_ignored_files.extend(["sae"])
    list_ignored_files = map(lambda x: x.replace("*", "").replace("~", ""), list(list_ignored_files))
    list_ignored_files = list(dict.fromkeys(list_ignored_files))

parser = argparse.ArgumentParser()
parser.add_argument(
    "-a",
    "--all",
    help="Crée les archives de tous les dossiers",
    required=False,
    action='store_true',
)
parser.add_argument(
    "-lc",
    "--last-commit",
    help="Crée les archives des dossiers du dernier commit",
    required=False,
    action='store_true',
)
parser.add_argument(
    "-f",
    "--folder",
    help="Dossier specifique à zipper",
    required=False,
    type=str
)
parser.add_argument(
    "--debug",
    help="Force la génération d'archive du dossier \"integration-web-s3/travaux-pratiques/numero-5/ressources\"",
    required=False,
    action='store_true',
)

args = parser.parse_args()

def get_list_directories_updated():
    command = ['git', 'status']
    if args.last_commit == True:
        command = ['git', 'log', '--name-status', '-1']

    stdout_git_status = subprocess.run(command, stdout=subprocess.PIPE).stdout

    re_staged = r"(\(.+--staged.+\)[\r\n\t]+)([->\w:.\/\s\n\r\t]*)(?=\n.+staged.+)?"
    re_last_commit = r"(?:M|A)([\s\n]+.+)"

    git_status_raw = re.search(
        re_staged,
        stdout_git_status.decode("utf-8"),
        re.MULTILINE
    )

    if args.last_commit == True:
        git_status_raw = re.findall(
            re_last_commit,
            stdout_git_status.decode("utf-8"),
            re.MULTILINE
        )

    list_staged_files = []

    if args.last_commit == False:
        if git_status_raw:
            list_staged_files = re.findall(
                r"(modified|new file|renamed|deleted):([\w\s./-]+)\.\w{2,8}",
                git_status_raw.group(),
                re.MULTILINE
            )
            list_staged_files = list(map(lambda x: x[1], list(list_staged_files)))
    else:
        list_staged_files = git_status_raw

    def clean_directory_path(path):
        cleaned_path = (
            path
                .replace("modified:", "")
                .replace(" -", "")
                .strip()
        )
        cleaned_path = re.sub('\\s+', '', cleaned_path)

        return cleaned_path

    def get_last_commit_path(entry):
        path = ' '.join(entry.split())
        path = path.replace("\"", "")
        path = re.sub('\\s+', '', path)

        return get_cleared_directory(path)

    def get_cleared_directory(path):
        r = re.search(r"^(.*?)(numero-\d+\/ressources|datasets|exercice)", path)

        return r.group(0) if r else ""

    list_cleaned_paths = map(
        get_last_commit_path if args.last_commit else clean_directory_path,
        list_staged_files
    )

    def get_zippable_directories(path):
        if "datasets" in path:
            return True
        return any(substring not in path for substring in list_ignored_files)

    list_directories_ressources = filter(get_zippable_directories, list(list_cleaned_paths))
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

def get_all_directories_to_zip():
    list_ressources_folders_raw = glob.glob("**/ressources*", recursive=True)
    list_ressources_folders_raw.extend(["exercice"])
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

    # Contains ressources folder and saes folder, you can use that if needed
    # list_all_folders = list_ressources_folders_to_zip + list_saes_folders_root_ressources

    return list_ressources_folders_to_zip

if args.debug is True:
    list_ressources_folders_to_zip = [r"integration-web-s3/travaux-pratiques/numero-5/ressources"]
else:
    if args.folder is None:
        if args.all:
            list_ressources_folders_to_zip = get_all_directories_to_zip()
        else:
            list_ressources_folders_to_zip = get_list_directories_updated()
    else:
        def transform_str_to_path(string):
            return pathlib.Path(string)

        list_paths = list(map(transform_str_to_path, args.folder.split(',')))
        list_valid_paths = list(filter(lambda x: x.exists(), list_paths))
        list_ressources_folders_to_zip = list(map(lambda x: str(x), list_valid_paths))

dict_correction_archive_created = {}

list_ignored_files_to_generate_zip = list_ignored_files
list_ignored_files_to_generate_zip.append("correction")

list_zip_files_generated = []

def generate_zip(list_folders, is_correction_directory = False):
    for folder_path in list_folders:
        head, tail = os.path.split(folder_path)
        archive_suffix = f"-{tail}" if "sae" in tail or is_correction_directory else ""
        archive_name = f'{slugify(head.replace("\\", "_").replace("/", "_"))}{archive_suffix}'

        zip_extension = "ressources"

        if "exercice" in folder_path:
            zip_extension = "exercice"
        elif "correction" in folder_path:
            zip_extension = "correction"
        elif "datasets" in folder_path:
            zip_extension = "datasets"
        elif "devoir" in folder_path:
            zip_extension = "devoir"

        archive_path = f'{head}/{archive_name.replace("_ressources", "").replace("-correction", "")}.{zip_extension}.zip'

        if is_correction_directory:
            if archive_path not in dict_correction_archive_created:
                dict_correction_archive_created[archive_path] = True
            else:
                continue

        list_zip_files_generated.append(archive_path)

        with ZipFile(archive_path, 'w', ZIP_DEFLATED) as zip_object:
            abs_src = os.path.abspath(folder_path)
            for dirname, _, files in os.walk(folder_path):
                for filename in files:
                    absname = os.path.abspath(os.path.join(dirname, filename))
                    arcname = absname[len(abs_src) + 1:]

                    if "package-lock.json" in arcname or "prenoms.csv.zip" in arcname:
                        zip_object.write(absname, arcname)
                    if bool([ele for ele in list_ignored_files_to_generate_zip if(ele.casefold() in arcname.casefold().encode("unicode_escape").decode("utf-8").replace(os.sep,"/"))]) == False:
                        zip_object.write(absname, arcname)
                    if "correction" in arcname.encode("unicode_escape").decode("utf-8"):
                        if len(arcname.split('\\correction')) > 1:
                            generate_zip([os.path.join(folder_path, arcname.split('\\correction')[0], "correction")], True)
                        else:
                            generate_zip([os.path.join(folder_path, "correction")], True)
            zip_object.close()

            if len(zip_object.infolist()) == 0:
                os.remove(archive_path)

generate_zip(list_ressources_folders_to_zip)
print("    ")
with open("output.tmp.txt", "w") as txt_file:
    if len(list_zip_files_generated) > 0:
        print(f"\033[96m--- {len(list_zip_files_generated)} archives generated ---\033[0m")
        for line in list_zip_files_generated:
            print(f"• {line}")
            if os.path.isfile(line):
                txt_file.write(line + "\n")
    else:
        print("\033[91mNo archives generated\033[0m")
print("\033[96m--- in %.2f seconds ---\033[0m" % (time.time() - start_time))
