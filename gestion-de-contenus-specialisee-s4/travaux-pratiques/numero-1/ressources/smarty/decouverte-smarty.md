# Découverte du moteur de template Smarty

Le but de ce TP est de découvrir le moteur de template Smarty. S'il est utilisé par Prestashop, il est tout à fait possible de l'utiliser seul. Nous allons l'utiliser seul pour le moment et ensuite nous ajouterons de la complexité quand nous l'utiliserons avec Prestashop.

Pour ce faire, vous allez avoir besoin d'installer avant Smarty, le moteur n'étant pas natif à PHP.

- [Télécharger Smarty v4.x](https://github.com/smarty-php/smarty/archive/refs/tags/v4.3.0.zip)

Une fois l'archive récupérée, vous allez en récupérer le dossier `libs/` et le mettre à la racine du dossier code. Ainsi, vous devriez avoir la structure suivante :

.<br>
└── code/<br>
&nbsp;&nbsp;&nbsp;&nbsp;├── **libs/** <-- Le dossier que vous devez rajouter<br>
&nbsp;&nbsp;&nbsp;&nbsp;├── templates/<br>
&nbsp;&nbsp;&nbsp;&nbsp;└── index.php

Ensuite, vous metterez le dossier code/ (que vous pouvez renommer) dans le dossier www/ de WAMP. Accédez à l'index.php depuis le navigateur et vous devriez voir la chose suivante dans votre navigateur (capture d'écran non représentative).
![](capture-1.jpg)

Le projet que vous avez récupéré est déjà prêt à être utilisé avec Smarty, il y a déjà des templates qui utilisent quelques fonctionnalités de Smarty.

L'un des gros avantages des moteurs de templates, au-delà de ne plus nous retrouver avec du code PHP dans du HTML, c'est qu'ils permettent la réutilisation de bouts de code, très facilement. Et de séparer nos pages en petits morceaux, ce qui rend le travail à plusieurs encore plus simple. Nous allons en détailler plus bas certaines fonctionnalités que vous allez appliquer dans le TP et plus tard avec Prestashop. Si vous souhaitez en savoir plus, il y a la documentation :

- [Accéder à la documentation de Smarty v4.x - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-basic-syntax/)

## Variables

Comme tout langage de programmation Smarty permet de définir des variables. Avec Smarty les variables peuvent avoir deux origines :

- Le fichier .tpl lui-même, vous définissez votre variable au sein même du fichier de la façon suivante : `{assign var=age value=42}`. Ici on définit une variable nommée "age" avec la valeur "42".

- Le fichier .php, dans le fichier php qui se charge d'afficher votre fichier .tpl, vous définissez des variables (et leur valeur) qui seront ensuite récupérées et affichées par Smarty. Il y a un exemple dans le fichier "index.php" à la ligne 22.

```php
$smarty->assign('ma_variable', 'Bonjour');
```

Ici nous définissons en PHP une variable nommée "ma_variable" avec la valeur "Bonjour". On retrouve les types habituels de variables : chaînes de caractères, nombre, tableaux... 

En tous les cas, peu importe d'où provient la variable (fichier .tpl ou du .php), elle s'affiche en Smarty avec la syntaxe suivante : `{$ma_variable}` ("Bonjour" s'affichera dans le navigateur).
> **N'oubliez pas le dollar ($) devant le nom d'une variable, sinon ça ne fonctionnera pas.**

Dans le cadre de l'utilisation sur Prestashop, nous ne devrions pas avoir besoin de créer des variables (ou des fonctions) Smarty toutefois il reste très important de ne pas oublier comment afficher une variable car ça nous en aurons besoin.

> Comme tout langage de programmation, il n'est pas possible de mettre des espaces ou des tirets dans le nom d'une variable.

Enfin, sachez qu'il est possible d'appliquer une fonction directement sur une variable ou une chaîne de caractères, on appelle ceci un "modifier". Ils peuvent être utiles, par exemple, pour mettre une chaîne de caractères en majuscules ou formatter une date.
 - [Voir la liste des modifiers de Smarty v4.x - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-modifiers/)

## Conditions (if, elseif, else)

Smarty nous donne également la possibilité de créer des conditions (chose impossible en HTML) pour afficher des éléments en fonctions de paramètres que vous aurez définis. Par exemple :

```php
{if $formation === 'MMI'}
    <p>Vous devez aimer le multimédia<p>
{elseif $formation === 'TC'}
    <p>Vous devez aimer les relations commerciales<p>
{else}
    <p>Je ne sais pas ce que vous aimez<p>
{/if}
```
Dans le code ci-dessus, nous évaluons la variable "$formation" (qui a été définie dans un fichier .tpl ou .php) et en fonction de sa valeur nous n'affichons pas la même chose. Il également possible de vérifier si une valeur est supérieure ou égale à une autre, etc.

- [Voir la liste des conditions possibles avec Smarty - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-builtin-functions/language-function-if/#qualifiers)


## Boucles
Structures également disponibles dans d'autres langages de programmation. Smarty permet d'itérer sur des structures comme des tableaux, il existe plusieurs fonctions pour le faire :
- {foreach}
- {for}
- ~~{section}~~

Nous nous intéresserons qu'à la boucle {foreach} dont la syntaxe est la suivante :
```php 
    {foreach $MON_TABLEAU as $ENTREE_TABLEAU}
        {$ENTREE_TABLEAU}
    {/foreach}
```
Avec un cas plus concret, ceci donnerait la chose suivante :
```php 
    {# Fichier php #}
    <?php
        $liste_formations = array('mmi', 'mt2e', 'tc', 'ge2i');
        $smarty->assign('liste_formations', $liste_formations);
```

```php
    {# Fichier Smarty #}
    <ul>
        {foreach $liste_formations as $formation}
            <li>{$formation}</li>
        {/foreach}
    </ul>
```

> Il est possible d'effectuer une boucle dans une autre boucle.

- [Accéder à la documentation de la fonction {foreach} de Smarty - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-builtin-functions/language-function-foreach/)


## Gabarit
Une des grandes forces des moteurs de template est leur système de gabarit. Il donne la possibilité de réutiliser un élément ou encore de partager une page en plusieurs briques. Smarty ne déroge pas à la règle et nous propose plusieurs fonctions.

### Fonction {extends}

La fonction `{extends}` permet à n'importe quel fichier Smarty d'hériter d'un autre fichier Smarty. Autrement dit, de définir un comportement unique pour un fichier en se basant sur un autre.

Cette fonction est très utile quand on a un gabarit de base et qu'en fonction des pages nous souhaitons en modifier certaines parties. 

> Nous allons beaucoup utiliser cette fonctionnalité avec Prestashop

Cette fonction doit toujours être au début de voter fichier. De plus, vous devez définir le lien entre le parent et l'enfant. Assurez-vous donc bien de structurer vos dossiers. 

Souvent, nous utilisons ce système d'héritage pour définir un gabarit de base et ses parties communes avec des trous que nous allons remplir grâce à la fonction {block} (voir partie suivante). 

- [Accéder à la documentation de la fonction {extends} de Smarty - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-builtin-functions/language-function-extends/)

### Fonction {block}
Grâce au système d'héritage (une page dans une autre page), il nous est donné la possibilité de définir des trous dans nos templates pour ensuite les remplir avec le contenu de notre choix. Dans le code qui vous a été fourni, il y a deux pages. Ces deux pages héritent d'un même template (_partials/page.tpl) et contiennent le contenu de notre choix. Par exemple :

```html
{# parent.tpl #}
<!-- [...] -->
<head>
    <title>{block name='nom_page'}{/block}</title>
</head>
<!-- [...] -->
```
Nous définissons un bloc (ou trou) nommé "nom_page" qui pourra être rempli par n'importe quel template qui en héritera.

> Avec Smarty les commentaires s'écrivent entre "{# mon commentaire #}". Et contrairement à HTML, les commentaires ne sont pas visibles dans le navigateur.

```php
{# enfant.tpl #}
{extends file='parent.tpl'}
<!-- [...] -->
{block name='nom_page'}Mon titre de page{/block}
<!-- [...] -->
```
Notre template "child.tpl" peut hériter de parent.tpl grâce à la fonction Smarty `extends`, une fois hérité, il est possible de réutiliser le bloc "nom_page" et d'y mettre le contenu souhaité. Ce qui donne le résultat suivant dans le navigateur pour la page "enfant.tpl".


```html
<!-- [...] -->
<head>
    <title>Mon titre de page</title>
</head>
<!-- [...] -->
```
Remarquez bien qu'en héritant du template "parent.tpl", le template "child.tpl" récupére tout le contenu par la même occasion pour former un seul et unique fichier. **De ce fait, quand un template hérite d'un autre tout élément HTML en dehors de la fonction `block` ne sera pas affiché.**

> Il est possible d'utiliser dans un template parent, une variable définie dans un template enfant.

A noter également qu'il est possible d'hériter de plusieurs templates à la fois, **cette méthode reste à éviter car elle reste de rendre complexe l'organisation de vos pages à la place,** il est plus intéressant de faire des héritages en cascade (un template hérite d'un autre et ainsi de suite). Parallèlement, il est possible d'inclure un bloc dans un autre bloc.

- [Accéder à la documentation de la fonction {block} de Smarty - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-builtin-functions/language-function-block/)

### Fonction {include}
Lorsqu'un fragment de code peut être réutilisé ou que notre template devient trop complexe, il peut être intéressant d'utiliser la fonction `{include}` pour effectuer un découpage. La syntaxe est très simple, il vous suffit de mettre son contenu dans un fichier .tpl et ensuite d'en afficher le contenu dans n'importe quel fichier .tpl, le contenu d'un `{include}` est donc réutilisable.

Vous en avez un exemple dans le code que vous avez récupéré, il y a fichier "contact.tpl" qui inclut le contenu du fichier "includes/formulaire.tpl". Voici quand même un exemple ci-dessous.

```php
{# index.tpl #}
<!-- [...] -->
<p>Bonjour tout le monde, voici le contenu de mon dernier article</p>
{include file="article.tpl"}
<!-- [...] -->
```
```php
{# article.tpl #}
<!-- [...] -->
<p>La formation MMI est une formation en trois ans visant à former de futurs experts du multimédia...</p>
<!-- [...] -->
```
Dans le code ci-dessus, le template "index.tpl" affiche le contenu du template "article.tpl". Le tout sera compilé de la façon suivante :
```html
<!-- [...] -->
<p>Bonjour tout le monde, voici le contenu de mon dernier article</p>
<p>La formation MMI est une formation en trois ans visant à former de futurs experts du multimédia...</p>
<!-- [...] -->
```

Enfin, Smarty donne la possibilité de passer des paramètres à la fonction `{include}`, ce qui les templates encore plus réutilisables (voir exemples dans la documentation).

- [Accéder à la documentation de la fonction {include} de Smarty - anglais](https://smarty-php.github.io/smarty/4.x/designers/language-builtin-functions/language-function-include/)

> **Les fonctions `include`, `extends` ou encore `block` vont être beaucoup utilisées dans Prestashop pour la gestion des thèmes enfants, nous vous conseillons d'être très à l'aise avec elles.**

Notre très courte introduction à Smarty est terminée, l'outil propose bien plus. Néanmoins, nous avons couvert le nécessaire pour ensuite l'utiliser avec Prestashop. Smarty ou non, il faudra penser à appliquer les bonnes pratiques vues précemment concernant le HTML ou le CSS.

Avant de commencer avec Prestashop, vous allez devoir prendre la main avec Smarty, vous trouverez dans la ressource un [exercice](exercice.md) que vous allez devoir réaliser grâce au code que vous avez récupéré et normalement mis dans le dossier "www/" de WAMP / MAMP.
