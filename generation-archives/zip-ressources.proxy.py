import sys
import subprocess
import venv
import tempfile
import os

folder_arg = sys.argv[1:]

with tempfile.TemporaryDirectory() as tmpenv:
    venv.create(tmpenv, with_pip=True)
    python_bin = os.path.join(tmpenv, 'bin', 'python')
    subprocess.run([python_bin, '-m', 'pip', 'install', 'pathspec'], check=True)
    subprocess.run([python_bin, 'generation-archives/zip-ressources.py', *folder_arg], check=True)