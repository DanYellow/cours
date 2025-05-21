- [Gestion des ressources](./LISTE-OUTILS.md)

## Générer les archives pour chaque dossier ressources contenu dans chaque sous-dossier

Ce script est exécuté à chaque commit et chaque archive généré est ajouté au dernier commit.

#### Dépendences
- Python 3
- git

#### Uniquement les dossiers staged - Comportement par défaut
```python
# Zippe toutes les ressources
python zip-ressources.py
```

#### Uniquement les dossiers du dernier commit
```python
python zip-ressources.py --last-commit / -lc
```

#### Tous les dossiers
```python
python zip-ressources.py --all / -a
```

Note : Les archives sont générées au même niveau que le dossier zippé

#### Un dossier (ou plusieurs) en particulier
```python
python zip-ressources.py --folder / -f chemin-depuis-la-racine-1, chemin-depuis-la-racine-2...
```

Note : Si les dossiers n'existent pas, ils seront ignorés

### Exemple de structure
```
nom-cours/
├── fichier1.txt
├── fichier2.jpg
├── fichier3.odp
└── ressources/ <- Le contenu du dossier sera dans un zip
    └── tp/
        ├── index.html
        ├── style.css
        ├── scripts.js
        ├── correction/ <- Ce dossier sera dans son **propre** zip
        └── ressources/ <- Ce dossier ne sera que contenu dans un zip, il ne sera pas zippé
            └── images/
                └── ...
```
Après exécution du script Python
```
nom-cours/
├── fichier1.txt
├── fichier2.jpg
├── fichier3.odp
├── **nom-cours.ressources.zip**
└── ressources/
    └── tp/
        ├── index.html
        ├── style.css
        ├── scripts.js
        ├── correction/
        ├── **nom-cours.correction.zip**
        └── ressources/
            └── images/
                └── ...
```
> Note : Tout fichier / dossier listé dans le fichier .gitignore sera exclu des fichiers zip

#### Gestion des hooks
Le dossier .githooks/ contient un ensemble de hooks permettant de générer et ajouter les archives des dossiers ressources modifiés.

Il faudra tout de même penser à les activer et les rendre exécutables avec les commandes suivantes.
```bash
# Rendre les hooks exécutables
chmod ug+x .githooks/*
# Indique à git où se trouvent les hooks
git config core.hooksPath .githooks
```
