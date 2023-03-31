# Thème enfant - Partie 3

En plus du CSS, il est possible également de changer la structure HTML des pages.

> Note : Avant de changer la structure des pages assurez-vous bien de faire des modifications qui ne s'éloignent pas trop du thème original. Le cas échéant, il est peut-être préférable de faire son propre thème.

Cette surcharge de thèmes est possible grâce à Smarty. Le but est d'hériter (fonction {extends}) des templates du thème parent et d'en remplir les blocs (fonction {block}) avec le contenu de votre choix. Attention tout de même pour que ça fonctionne, il faut créer **la même structure de dossier dans le thème enfant**. Par exemple :

| ![](capture-1.jpg)|
|:--:|
| *Le thème Classic me propose un affichage du prix à l'unité qu'il est possible de changer grâce au système de thèmes enfant.* |

Le template gérant l'affichage du prix est contenu dans le fichier Smarty suivant : `classic/templates/catalog/_partials/product-prices.tpl`, souhaitant changer l'affichage de ce template, vous devez créer la **même** structure de dossier dans votre thème enfant dans le dossier templates/ (dossier à créer si besoin). Ainsi dans votre dossier `child_classic` (dossier du thème enfant), vous aurez `child_classic/templates/catalog/_partials/product-prices.tpl`.

Ce fichier devra commencer par la ligne suivante : `{extends file='parent:catalog/_partials/product-prices.tpl'}`. Elle indique à Prestashop de quel template nous souhaitons hériter. Nous observons deux choses :
- La présence du préfixe "parent:", il permet d'indiquer à Prestashop que nous souhaitons hériter d'un fichier contenu dans le thème parent et non dans le thème enfant. 
  - Note : si vous ne travaillez pas sur un thème enfant, ce mot-clé n'aura aucun effet
- L'absence de "classic/templates/" dans le chemin de fichier. Prestashop n'en a pas besoin vu qu'il y a le mot-clé "parent:" et qu'il s'attend à la présence de templates dans le dossier `templates/`

La suite est semblable à ce que nous avons vu précédemment lors de notre découverte de Smarty, il faudra repérer les blocs qui vous intéressent et les remplir dans votre thème enfant. Une fois la modification effectuée, sauvegardez et actualisez.

___
## Exercice :
Essayez de modifier une page dans votre thème enfant. Pour retrouver le fichier du template original, utilisez l'inspecteur du navigateur, trouvez le bon sélecteur CSS (privilégiez un sélecteur précis) et cherchez-le dans le dossier du thème grâce à votre éditeur de code.
- [En savoir plus sur la recherche dans VS Code - à partir de 1:42](https://www.youtube.com/watch?v=kWSjEs3kED8)

**Pensez bien à respecter la même structure de fichiers dans votre thème enfant, sinon vous ne verrez jamais vos modifications dans le front-office.**