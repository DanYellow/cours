import unicodedata
import re
import glob
import os
import shutil
import time

start_time = time.time()


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

os.chdir("../")

list_ressources_folders_raw = glob.glob("**/ressources*", recursive=True)
list_ressources_folders = [path for path in list_ressources_folders_raw if os.path.isdir(path)]

list_ressources_folders_non_nested = [path for path in list_ressources_folders if path.count('ressources') == 1]
list_ressources_folders_non_nested = [path for path in list_ressources_folders_non_nested if path.count('code') == 0]


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
        
        
list_all_folders = list_ressources_folders_non_nested + list_saes_folders_root_ressources

for folder_path in list_ressources_folders_non_nested:
    head, tail = os.path.split(folder_path)
    
    archive_suffix = f"-{tail}" if "sae" in tail else ""
    archive_name = f'{slugify(head.replace("\\", "_").replace("/", "_"))}{archive_suffix}'
    shutil.make_archive(f"{head}/{archive_name}.ressources", 'zip', folder_path)
    
print("--- Archives generated in %.2f seconds ---" % (time.time() - start_time))