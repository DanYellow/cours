import unicodedata
import re
import glob
import os
import shutil

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

list_folders_raw = glob.glob("**/ressources*", recursive=True) #, root_dir="../"
list_folders = [path for path in list_folders_raw if os.path.isdir(path)]

list_folders_non_nested = [path for path in list_folders if path.count('ressources') == 1]
list_folders_non_nested = [path for path in list_folders_non_nested if path.count('code') == 0]

for folder_path in list_folders_non_nested:
    head, tail = os.path.split(folder_path)
    archive_name = slugify(head.replace("\\", "_").replace("/", "_"))
    shutil.make_archive(f"{head}/{archive_name}.tmp", 'zip', folder_path)