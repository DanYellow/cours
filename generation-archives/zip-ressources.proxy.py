import sys
import subprocess
import venv
import tempfile
import os
import pathlib

folder_arg = sys.argv[1:]

with tempfile.TemporaryDirectory() as tmpenv:
    repo_root = subprocess.check_output(
        ["git", "rev-parse", "--show-toplevel"],
        text=True
    ).strip()

    venv.create(tmpenv, with_pip=True)
    python_bin = os.path.join(tmpenv, 'bin', 'python')

    subprocess.run([python_bin, '-m', 'pip', 'install', 'pathspec'], check=True)

    script_path = pathlib.Path(repo_root) / "generation-archives" / "zip-ressources.py"
    subprocess.run([python_bin, str(script_path), *folder_arg], check=True)
