## Générer les archives pour chaque dossier ressources contenu dans chaque sous-dossier

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
        ├── **nom-cours-correction.ressources.zip**
        └── ressources/
            └── images/
                └── ...
```
> Note : Tout fichier / dossier listé dans le fichier .gitignore sera également exclu des fichiers zip

TODO : Mettre dans un pre-commit hook ?