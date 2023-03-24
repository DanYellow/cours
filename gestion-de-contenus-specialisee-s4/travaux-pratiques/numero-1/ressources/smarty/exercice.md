# Exercice

Réalisez les tâches suivantes grâce à Smarty.

> Note : Pour des questions de simplicité, le fichier HTML final est généré à la volée. Autrement dit, si vous souhaitez ajouter de nouvelles pages, elles devront être à la racine du dossier templates/ et si vous souhaitez faire des liens entre les pages, il faudra réaliser les liens de la façon suivante : `<a href="?page=nom-de-la-page">Mon lien</a>`

> Note 2 : Pour des questions de lisibilité, nous vous invitons à télécharger l'extension gratuite pour VS Code Smarty Template Support. [Télécharger l'extension](https://marketplace.visualstudio.com/items?itemName=aswinkumar863.smarty-template-support). Elle vous vous permettra d'avoir la coloration syntaxique dans vos fichiers .tpl.

**Réalisez les choses suivantes :**

> Sauf indication contraire, la référence à une page fait référence aux pages à la racine du dossier templates/ (contact.tpl et index.tpl)

- Ajoutez un nouveau bloc dans le fichier `_partials/base.tpl` et utilisez-le sur une des pages
- Affichez le contenu de la variable `nom_page` (déjà injectée dans le template) sur une page au choix
- Dans le fichier `_partials/base.tpl` affichez un message en fonction de la valeur de la variable `nom_page`
- Sur une des pages au choix et à l'aide d'une boucle affichez le contenu de la variable `liste_affaires` (déjà injectée dans le template)
    - [Accéder à la documentation de la boucle foreach - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-builtin-functions/language-function-foreach/)
- Créez un nouveau bloc dans le fichier `_partials/base.tpl` et chargez un fichier CSS différent en fonction de la page
    - Le CSS est chargé depuis le fichier php qui le charge. Il ne faut pas prendre en compte la nomenclature de fichiers du dossier template (voir `_partials/base.tpl` pour exemple)
- Créez une nouvelle page (racine du dossier `templates/`) et faites-la hériter du template de base (`_partials/base.tpl`)
- Ajoutez un lien vers votre nouvelle page dans le menu principal
    - Le menu se trouve dans le fichier `_partials/base.tpl`
    - N'oubliez pas respecter la nomenclature des liens (voir en haut du document)
- Créez un nouveau template et affichez-le, grâce à la fonction {include} dans la page que vous avez crée précédemment
    - [Accéder à la documentation de la fonction {include}](https://smarty-php.github.io/smarty/4.x/designers/language-builtin-functions/language-function-include/)
- Utilisez le modifier de votre choix où vous le souhaitez
    - [Voir la liste des modifiers - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-modifiers/)
- Créez une nouvelle variable et affichez-la sur une des pages
    - Vous pouvez créer votre variable directement dans un de vos fichiers template ou le fichier `index.php`
    - [Accéder à la documentation des variables - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-variables/)
- Indiquez la page sur laquelle l'utilisateur est présent dans la navigation
    - Il faudra utiliser des variables et des conditions