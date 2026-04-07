import unicodedata
import re
import glob
import os
import time
import subprocess
import argparse
import pathlib
from zipfile import ZipFile, ZIP_DEFLATED

import pathspec

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

def load_gitignore(path = '.gitignore'):
    with open(path) as gitignore_file:
        list_ignored_files = gitignore_file.readlines()
        list_ignored_files.extend(["*.odp", "gestion-ressources/**", "*.zip"]) # "zip", "code",
        # list_ignored_files.extend(["sae"])

        return pathspec.PathSpec.from_lines("gitwildmatch", list_ignored_files)

def extend_files_pattern_to_ignore(spec, new_patterns):
    return pathspec.PathSpec.from_lines(
        "gitwildmatch",
        [p.pattern for p in spec.patterns] + new_patterns
    )

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
    nargs='+',
    type=str
)
parser.add_argument(
    "--debug",
    help="Force la génération d'archive du dossier \"s3-integration-web/travaux-pratiques/numero-5/ressources\"",
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
        r = re.search(r"^(.*?)((numero-\d+\/ressources|datasets|exercice)|(sae-\d+))", path)

        return r.group(0) if r else ""

    list_cleaned_paths = map(
        get_last_commit_path if args.last_commit else clean_directory_path,
        list_staged_files
    )

    def get_zippable_directories(path):
        print(path)
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
    list_ressources_folders_to_zip = [r"s3-integration-web/travaux-pratiques/numero-5/ressources"]
else:
    if args.folder is None:
        if args.all:
            list_ressources_folders_to_zip = get_all_directories_to_zip()
        else:
            list_ressources_folders_to_zip = get_list_directories_updated()
    else:
        def transform_str_to_path(string):
            return pathlib.Path(string)
        list_paths = list(map(transform_str_to_path, args.folder))
        list_valid_paths = list(filter(lambda x: x.exists(), list_paths))
        list_ressources_folders_to_zip = list(map(lambda x: str(x), list_valid_paths))

dict_correction_archive_created = {}
list_zip_files_generated = []

def generate_archive_name(folder_path, is_correction_directory = False):
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

    return archive_path

def find_gitignore(directory):
    root = pathlib.Path(directory)
    for path in root.rglob('.gitignore'):
        if path.is_file():
            return path
    return None 

def generate_zip(list_folders, is_correction_directory = False):
    if len(list_folders) == 0:
        return

    for folder_path in list_folders:
        has_gitignore = find_gitignore(folder_path)
        archive_path = generate_archive_name(folder_path)

        if has_gitignore:
            try:
                git_project_path = folder_path

                command = ['git', 'archive', '-o', archive_path, f"HEAD:{pathlib.PureWindowsPath(git_project_path).as_posix()}"]
                subprocess.run(command, stdout=subprocess.PIPE).stdout
                list_zip_files_generated.append(archive_path)
            except:
                print(f"\033[91mCouldn't zip {archive_path}\033[0m")
        else:
            correction_directory = None
            files_from_gitignore = load_gitignore()
            list_correction_directories = []
        
            for root, directories, _ in os.walk(folder_path):
                if "correction" in directories:
                    list_correction_directories.append(os.path.join(root, "correction"))

            if len(list_correction_directories):
                for correction_directory in list_correction_directories:
                    correction_archive_path = generate_archive_name(correction_directory, True)
                    with ZipFile(correction_archive_path, 'w', ZIP_DEFLATED) as zip_object:
                        for root, _, files in os.walk(correction_directory):
                            for file in files:
                                if not files_from_gitignore.match_file(file):
                                    full_path = os.path.join(root, file)
                                    rel_path = os.path.relpath(full_path, correction_directory)
                                    zip_object.write(full_path, rel_path)
                        zip_object.close()
                        list_zip_files_generated.append(correction_archive_path)

            files_from_gitignore = extend_files_pattern_to_ignore(files_from_gitignore, ["**/correction/"])

            with ZipFile(archive_path, 'w', ZIP_DEFLATED) as zip_object:
                for root, dirs, files in os.walk(folder_path):
                    # dirs[:] = [
                    #     d for d in dirs
                    #     if not files_from_gitignore.match_file(os.path.relpath(os.path.join(root, d), folder_path))
                    # ]
        
                    for file in files:
                        full_path = os.path.join(root, file)
                        rel_path = os.path.relpath(full_path, folder_path)

                        if not files_from_gitignore.match_file(rel_path):
                            zip_object.write(full_path, rel_path)
                zip_object.close()
            
            list_zip_files_generated.append(archive_path)

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
