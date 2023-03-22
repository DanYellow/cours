# Thème enfant - Partie 1

Fonctionnalité très puissante de Prestashop, le thème enfant permet de personnaliser un thème Prestashop existant. L'avantage est qu'en cas d'erreur, il est possible de revenir en arrière sans altérer le thème original ou encore de garder les modifications de votre thème enfant lors de la mise à jour du thème parent. Le système est plus ou moins semblable à ce que Wordpress propose.

Avant de commencer à modifier le thème Classic (nom du thème par défaut de Prestashop), nous allons configurer Prestashop pour avoir un environnement de développement plus adapté.

Dans le back-office : Paramètres Avancés > Performances. Effectuez les tâches suivantes :
- Désactiver le cache 
- Cocher "Forcer la compilation à chaque appel" 
- Activer le "mode Debug"

> Pensez à sauvegarder

Une fois ceci fait, vous allez pouvoir créer votre premier thème enfant sur la base du thème Classic. Pour ce faire allez dans le back-office : Apparence > Thème et Logo. Une fois dans ce menu cliquez sur "Personnalisation Avancée" (en haut) et le bouton "Télécharger le thème". 

Vous allez récupérer une archive avec le nom du thème parent préfixé de "classic_". Une fois ceci fait, restez sur la page actuelle de l'administration, vous allez directement réimporter votre archive grâce au bouton "Importer thème enfant".

> Passer par cette fonctionnalité limitera les erreurs lors de la création d'un thème enfant car Prestashop est très pointilleux sur la structure de l'archive attendue. 

L'importation va créer un dossier dans le dossier themes/ avec le nom du thème parent préfixé de "classic_", dans notre cas, ça sera `child_classic`. Retournez dans l'onglet "Thème et Logo" (menu en haut à gauche) et sélectionnez votre thème. 

> Le changement de thème peut prendre plus ou moins de temps.

Allez sur le front-office (Lien "Voir ma boutique" en haut à droite), si tout s'est bien passé la fond du menu d'en-tête devrait passer en rouge.

Analysons la structure de dossier de notre premier thème enfant.

.<br>
└── child_classic/<br>
&nbsp;&nbsp;&nbsp;&nbsp;├── assets/<br>
&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── css/<br>
&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── custom.css<br>
&nbsp;&nbsp;&nbsp;&nbsp;├── config/<br>
&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── theme.yml<br>
&nbsp;&nbsp;&nbsp;&nbsp;├── preview.png<br>
&nbsp;&nbsp;&nbsp;&nbsp;└── index.php<br>

- child_classic/ : Nom et conteneur du thème. Il doit toujours être écrit en minuscules
- assets/css : C'est ici que nous mettrons le CSS propre à notre thème enfant. Par défaut, Prestashop charge automatiquement un fichier css "custom.css" présent dans le même dossier. Il est possible de charger d'autres fichiers (css et js)
  - Le fichier "custom.css" est automatiquement injecté dans la page
- config/theme.yml : Contient la configuration du thème
- preview.png : Image représentant votre thème. Ceci rend son repérage plus facile
- index.php : (comme tous les autres fichiers index.php du dossier) Permet d'éviter qu'on puisse accéder au contenu du dossier. Ils sont là par sécurité. Gardez-les.

### Theme.yml
Tous les thèmes Prestashop possèdent un fichier theme.yml, il permet de décrire le comportement de votre thème. Dans le cas d'un thème enfant, le fichier est beaucoup plus léger car il hérite du ficher theme.yml du thème parent.

> Le format yml (ou yaml) est un format de représentation de données où les données sont organisées grâce à des tabulations (ou espace) 

Voici les **clés essentielles** à la création d'un thème enfant ainsi que leur rôle
```yaml
parent: Nom du thème parent.
name: Nom du dossier contenant le thème. Les deux valeurs doivent être identiques.
display_name: Nom du thème qui sera affichée dans l'interface dans le menu "Apparence > Thème et logo"
version: Version de votre thème
assets:
  use_parent_assets: Indique à Prestashop que le thème enfant chargera les assets (css, img et js) du parent au lieu des siens.
```

Il est possible de rajouter d'autres clés comme "author" pour indiquer l'auteur de ce thème enfant. Ou encore "css" et "js" pour ajouter d'autres fichiers de ce format. Par exemple :
```yaml
assets:
  # [...]
  css:
    all:
      - id: mon-fichier-css
        path: assets/css/style.css
  js:
    all:
      - id: mon-fichier-js
        path: assets/js/script.js
```

> Note : si jamais vous modifiez le contenu du fichier theme.yml, il est fort probable que Prestashop ne prenne pas en compte ces modifications. Pour les activer, il faudra supprimer votre thème dans le dossier `config/themes/nom-de-votre-theme`. Une fois fait, actualisez la page et vous observerez les modifications dans la partie Thèmes du back-office.

___
## Exercice :
Essayez de modifier le CSS en rajoutant de nouvelles règles au fichier CSS `assets/css/custom.css`. Aidez-vous de l'inspecteur du navigateur pour trouver les sélecteurs CSS du thème.