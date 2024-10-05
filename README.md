## Générer les archives pour chaque dossier ressources contenu dans chaque sous-dossier
```python
python zip-ressources.py
```
Note : Les archives sont générées au même niveau que le dossier lui-même

### Exemple de structure
```
nom-cours/
├── fichier1.txt
├── fichier2.jpg
├── fichier3.odp
└── ressources/ <- Ce dossier sera zippé
    └── tp/
        ├── index.html
        ├── style.css
        ├── scripts.js
        └── ressources/
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
        └── ressources/
            └── images/
                └── ...
```

TODO : Mettre dans un pre-commit hook ?