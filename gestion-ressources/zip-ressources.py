import unicodedata
import re
import glob
import os
import shutil
import time
import tarfile
from zipfile import ZipFile


start_time = time.time()

# Take all ressources's folder in each folder and create archives type zip. The folder MUST but named "ressources" or it will be ignored
# Note : If ressources folder is within another one, only the root one will be taken
# Note 2 : SAE's folder are excluded from the operation since the students, most of them, will download the code at home, there's almost no chance we have
# a token error from https://download-directory.github.io/

os.chdir("../")
print("--- Archives generation started. Please wait. ---")

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

# list_ressources_folders_raw = glob.glob("**/ressources*", recursive=True)
# list_ressources_folders = [path for path in list_ressources_folders_raw if os.path.isdir(path)]
# list_ressources_folders_non_nested = [path for path in list_ressources_folders if path.count('ressources') == 1]
# list_ressources_folders_non_nested = [path for path in list_ressources_folders_non_nested if path.count('code') == 0]

# list_saes_folders_raw = glob.glob("**/*sae*", recursive=True)
# list_saes_folders = [path for path in list_saes_folders_raw if os.path.isdir(path)]
# list_saes_folders_non_nested = [path for path in list_saes_folders if path.count('sae') == 1]

# # SAES at the root of the ressource's folder
# list_saes_folders_root_ressources = []

# for folder_path in list_saes_folders_non_nested:
#     normalized_path = os.path.normpath(folder_path)
#     arrayed_path = normalized_path.split(os.sep)

#     sae_indexes = [i for i, item in enumerate(arrayed_path) if re.search('sae', item)]
#     if len(sae_indexes) == 1 and sae_indexes[0] == 1:
#         list_saes_folders_root_ressources.append(folder_path)
        
# # Contains ressources folder and saes folder, you can use that variable in the loop below if needed
# list_all_folders = list_ressources_folders_non_nested + list_saes_folders_root_ressources

# for folder_path in list_ressources_folders_non_nested:
#     head, tail = os.path.split(folder_path)
    
#     archive_suffix = f"-{tail}" if "sae" in tail else ""
#     archive_name = f'{slugify(head.replace("\\", "_").replace("/", "_"))}{archive_suffix}'
#     shutil.make_archive(f"{head}/{archive_name}.ressources", 'zip', folder_path)


def filter_function(tarinfo):
    if "correction" in tarinfo.name:
        return None
    else:
        return tarinfo

    
# EXCLUDE_FILES = ['correction']
# tar = tarfile.open("sample.tmp.tar.gz", "w:gz")
# tar.add("integration-web-s3/travaux-pratiques/numero-5/ressources", filter=filter_function)
# tar.close()
    # zip_object.write("integration-web-s3/travaux-pratiques/numero-5/ressources/**")

with ZipFile('sample.tmp.zip', 'w') as zip_object:
    abs_src = os.path.abspath("integration-web-s3/travaux-pratiques/numero-5/ressources/")
    for dirname, subdirs, files in os.walk("integration-web-s3/travaux-pratiques/numero-5/ressources/"):
        for filename in files:
            absname = os.path.abspath(os.path.join(dirname, filename))
            arcname = absname[len(abs_src) + 1:]
            print(arcname)
            if "correction" not in arcname:
                zip_object.write(absname, arcname)
    zip_object.close()

print("--- Archives generated in %.2f seconds ---" % (time.time() - start_time))