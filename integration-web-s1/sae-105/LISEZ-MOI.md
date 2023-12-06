# SAÉ 105 - Produire un site web

> **IMPORTANT :** Le code fourni possède quelques modifications mineures par rapport à la maquette finale. Vous n'avez pas à les corriger.

## Contexte de la SAÉ
CY Cergy Paris Université nous confie la réalisation d'un site web dédié au BUT Métiers du Multimédia et de l'Internet (MMI).
L'objectif primaire du site sera de présenter de façon détaillée les aspects de la formation du parcours MMI aux lycéens qui sont potentiellement intéressés à poursuivre dans le parcours BUT MMI de l’IUT CYU. Le site doit aussi donner la possibilité de contacter l'administration via un formulaire. De ce fait, ce projet sera l'occasion de mettre en application les notions vues dans les cours de Développement Web et d'Intégration Web pour ainsi valider les apprentissages critiques suivants : 

**R1.11 – Intégration**
- AC14.01 : Exploiter de manière autonome un environnement de développement efficace et productif
- AC14.02 : Produire des pages Web statiques et fluides utilisant un balisage sémantique efficace et des interactions simples

**R1.12 – Développement Web**
- AC14.03 : Générer des pages Web ou vues à partir de données structurées incluant des interactions simples

**R1.13 – Hébergement**
- AC14.04 : Mettre en ligne une application Web en utilisant une solution d’hébergement standard


À cet effet, CY Cergy Paris Université vous demande de développer, par groupe de 3-5 environ **au sein du même TD/TP**, le site suivant à partir de la maquette interactive suivante :
- [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/95c93a87-3bd9-475d-8adf-6d6937baace9-c09a/)

Vous avez donc très peu de choses à faire niveau design, l'université vous le fournissant. Niveau code, vous êtes également aidé, nous vous fournissons une base d'intégration.
- [Télécharger le code de base](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fintegration-web-s1%2Fsae-105%2Fcode)

Dans le site sont prévues six pages qui partagent une structure commune composée par :
- Un header (en-tête) qui contient un menu de navigation et l’intitulé du BUT MMI ainsi qu'un logo stylisé (bulle)
  - Vous devez le compléter et l'adapter pour chaque page
  - Indiquer la page active dans la navigation
    - Ceci ne se fait pas avec la pseudo-classe ":active". Aidez-vous de la gestion de la couleur des bulles pour réaliser la fonctionnalité
- Un footer (pied-de-page), **que vous devrez compléter**, qui contient les liens vers les pages des réseaux sociaux du BUT MMI et le logo de l’Université. Ces liens sont disponibles dans la partie commentaires sur Adobe XD (voir le didacticiel sur Adobe XD pour plus d’informations)
> Sur l'ENT, vous avez une section qui explique comment Adobe XD fonctionne

Les pages web du site à réaliser sont donc :
- **Accueil :** Page qui contient des articles concernant le BUT MMI. Chaque article doit s’afficher dans une section composée par 2 éléments (image et texte). Tous les articles sont disposés sur une seule colonne centrale. A côté de cette colonne sera présente une bannière qui redirige vers la page web de la journée portes ouvertes. Dans le code que vous avez récupéré, vous trouverez une version inachevée de la page, à vous de la compléter
- **À propos :** Page qui contient trois sous-sections accessibles par trois ancres placées en haut de page. Dans la 3ᵉ section, une liste de projets réalisés en SAÉ par les étudiants sera affichée dans une grille de boîtes
- **Contact :** Contient un formulaire qui permet à l’utilisateur d’envoyer une requête d’information.
La page contact possède trois états :
    <ol type="a">
        <li>Défaut (pas de bannière)</li>
        <li>Message envoyé avec succès (bandeau vert)</li>
        <li>Message envoyé avec erreur (bandeau rouge)</li>
    </ol>

    Le bandeau (succès ou erreur) ne doit être visible **qu’après avoir soumis le formulaire.** Ainsi, le traitement du formulaire doit être fait sur la même page. L’utilisation du PHP est **indispensable** pour récupérer les valeurs des champs du formulaire. Quant aux conditions qui vont afficher le bandeau rouge, c'est à vous de les définir (quels champs sont obligatoires, etc.). Pour "forcer" l'affichage du bandeau rouge, vous pouvez vous baser sur l'adresse e-mail envoyée si elle est égale à une valeur bien spécifique alors on l'affiche
- **Sur les médias :** Cette page contient une grille de boîtes qui affichent les vidéos YouTube qui traitent différents sujets : le BUT, parcours MMI et IUT. Les liens des vidéos sont les suivants : 
  - https://www.youtube.com/watch?v=oiEbQF7qfBU
  - https://www.youtube.com/watch?v=SyjF4h2Zb7Q
  - https://www.youtube.com/watch?v=t72pdxpNjyc
  - https://www.youtube.com/watch?v=xD4wshE0hEg
  
  A vous de trouver comment on intègre une vidéo Youtube sur un site web. **Les vidéos ne doivent en aucun cas être téléchargées**, c'est le lecteur de Youtube qui doit s'afficher
- **Lieux de vie :** Une page qui liste différents lieux de l'IUT. La maquette ne contient pas de réelles photos, vous pouvez utiliser des placeholders pour images comme le site [https://placehold.co/](https://placehold.co/). Libre à vous de mettre de vraies photos des lieux
- **Nouvelle page à votre discretion.** Une sixième page doit être développée, vous déciderez le contenu et les éléments. Toutefois, elle devra impérativement respecter le design, la mise en page des autres pages du site (navigation et pied de page) et contenir au minimum une image et un paragraphe. **Cette nouvelle page devra être joignable par un lien présent dans la navigation en haut de page.** Vous pouvez également rajouter des pages supplémentaires tout en respectant les règles précédemment citées. **A noter que cette SAÉ n'est pas un exercice rédactionnel, vous pouvez récupérer les textes sur le web.**

> Ce n'est pas un exercice de rédaction, vous pouvez très bien récupérer du contenu (textes et images) en ligne. Si vous ne souhaitez pas vous casser la tête pour les images, vous pouvez utiliser un site comme [https://placehold.co/](https://placehold.co/).

Vous travaillez en groupe, profitez-en, sollicitez vos connaissances et appétences pour produire le meilleur site possible. Si certains sont moins à l’aise avec le code, ils peuvent s’assurer de la qualité du site en vérifiant que tout fonctionne correctement. Si d’autres sont plus à l’aise avec le design, ils peuvent imaginer la sixième page.

> Pour rappel, vous ne partez pas d'une page blanche pour le code, nous avons mis en place une base de code pour vous aider. 
> [Télécharger le code de base](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fintegration-web-s1%2Fsae-105%2Fcode).

# Police d'écriture
La maquette utilise la police d'écriture "Open Sans", elle n'est pas présente par défaut sur votre ordinateur, de ce fait, le projet utilise la règle @font-face pour charger la police, vous pourrez le voir en détails dans le fichier "ressources/css/npm-fonts.css".
> [Voir documentation de @font-face](https://developer.mozilla.org/fr/docs/Web/CSS/%40font-face).

Quoiqu'il en soit sachez que la police "Open Sans" est nommée "Open Sans" dans le projet, ainsi si vous souhaitez appliquer la police sur un élément, il faudra écrire la chose suivante :
```css
  mon-selecteur {
    font-family: "Open Sans", sans-serif;
  }
```
Néanmoins, la police étant déjà chargée au global, vous ne devriez pas avoir besoin d'écrire le code ci-dessus. En revanche, pour gérer les différentes graisses, il faudra jouer sur la propriété CSS "font-weight" et les valeurs suivantes :
- pas de gras : normal/400
- semi-gras : 600
- gras : bold

Le choix de la graisse est indiqué dans la maquette Adobe XD.

# Astuces
- La navigation principale et la bulle du site se trouvent dans le fichier `ressources/css/includes/header.php`. Nous avons utilisé la puissance de PHP pour partager des morceaux de code, **vous devrez faire de même avec le pied de page**
- A la racine du projet, il y a un fichier nommé `squelette.php`. A chaque nouvelle page que vous aller créer, **copiez et renommez le fichier.** Ce fichier possède une base saine pour créer une nouvelle page
- Votre code HTML se répète à travers les pages (ou même la même page) ? Pensez à la fonction php `require_once()`
- Vous ne pouvez pas être pixel perfect. N'essayez pas d'être iso avec la maquette lors de votre intégration, le moteur de rendu de votre navigateur et d'Adobe XD sont différents, des différences **mineures** appraîtront, c'est normal et ce n'est pas grave
- **Vous ne devez en aucun cas modifier les fichiers CSS fournis,** c'est à vous de rajouter de nouveaux fichiers CSS pour compléter l'intégration. Les fichiers CSS dans le dossier "ne-pas-modifier" ou commençant par "npm-" ne doivent pas être modifiés
  - Vous pouvez en revanche copier un sélecteur présent dans le code de base pour le surcharger si besoin est
- Evitez de copier tout le code CSS fourni par Adobe XD, ça peut être tentant, mais il est malheureusement de très mauvaise qualité et va vous poser plus de problèmes qu'autre chose. Vous pouvez récupérer les propriétés CSS suivantes depuis AdobeXD :
  - font-size. **N'oubliez pas de faire la conversion px -> rem**
  - width (dans une moindre mesure)
  - height (dans une moindre mesure)
  - les couleurs
  - font-weight
- Pensez bien à lire les notes présentes sur la maquette Adobe, elles peuvent apporter des éclaircissements. Par ailleurs, assurez-vous bien que le commentaire est bien associé à la page en question
- flexbox sera votre meilleur ami pour réaliser la mise en page. Si vous avez un trou de mémoire sur le sujet, vous avez le jeu flexboxfroggy
  - [Accéder au jeu flexboxfroggy](https://flexboxfroggy.com/#fr)
  - Et bien évidemment la documentation : [Accéder à la documentation de flexbox](https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Flexbox)
  
  En tous les cas, n'allez pas faire la mise en page du site avec float ou pire &lt;table>
- Si vous décidez de travailler en groupe de la façon suivante : une page par personne. Assurez-vous de donner un nom unique par page html ET fichier CSS, ceci limitera les conflits lorsque vous metterez vos pages en commun. Par exemple, si un membre travaille sur la page "contact", il créera la page "contact.php" et le fichier "contact.css". Le fichier php étant mis au même niveau que le fichier "index.php" déjà présent et le fichier css dans le dossier "ressources/css" 
- **Votre projet doit impérativement avoir un fichier "index.php".** Il y en a déjà un, n'allez pas le renommer
- Par défaut, VS Code ne permet pas l'auto-complétion de balises HTML dans un fichier PHP. Il faut l'activer, pour ce faire :
    1. Allez dans le menu File > Preferences > Settings
    1. Recherchez "emmet" dans la barre de recherche
    1. Dans la zone "Emmet: Includes languages", cliquez sur "Add Item" et ajoutez "php" dans la zone "key" et "html" dans la zone "value"


# Rendus attendus
- **Une archive par groupe** nommée nom-prénom (celui du chef de projet) contenant :
  - Les fichiers permettant le bon fonctionnement de votre site
    - **Nous ne débuggerons pas votre site, assurez-vous qu'il fonctionne avant de l'envoyer**
  - Un fichier texte contenant l'URL de votre site hébergé + la composition du groupe
    - Vous pouvez aussi lister les membres du groupe dans le fichier "bareme-notation.ods"
  - Un document expliquant qui a fait quoi dans le groupe. Plus d'explications dans la partie [gestion d'équipe](#gestion-déquipe)

Votre rendu devra être mis sur Moodle avant la date butoir, **cette date sera donnée ultérieurement par e-mail.**
**Des points pourront être retirés ou la note nullifée si le devoir est rendu en retard.**

# Notation
Les critères suivants seront évalués. Une ou les deux parties **peuvent** être amenées à être évaluée via un oral.

## Intégration Web (HTML/CSS)
Cette partie sera évaluée par vos enseignants en Intégration Web.
- Qualité du code :
  - Pas de classes au nom étrange
  - Réutilisation des classes CSS
    - N'oubliez pas qu'une balise peut avoir plusieurs classes CSS
  - Organisation du code
    - Utiliser la structure déjà présente peut vous aider
  - Sémantique HTML :
    - Toute utilisation inappropriée de la balise &lt;br> sera sanctionnée
- Accessibilité
  - Présence de l'attribut "alt" sur la balise &lt;img> même vide
  - Le contenu est contrasté dans la sixième page que vous devez réaliser
  - Valeur de la balise &lt;title> qui change pour chaque page avec la valeur appropriée
  - Unité des police d'écriture en rem
    - Toute utilisation de l'unité px pour la propriété font-size sera sanctionnée, il faut utiliser l'unité rem
      - Pour rappel, il faut diviser la valeur de la maquette par 16 pour obtenir la font-size en rem. Exemple : 24px -> 24/16 -> 1.5rem.
  - Les champs de formulaire sont liés à un label (attributs "for" et "id")
  - [Voir plus de normes d'accessibilité](https://www.accede-web.com/notices/html-et-css/) (vous n'avez pas à toutes les respecter)
- Présence des fonctionnalités / qualité de l'intégration (voir Adobe XD - lien plus haut -)

## Développement Web (PHP)
Cette partie (page "contact") sera évaluée par vos enseignants en Développement Web.
- Qualité du code
  - Utilisation de la fonction `require_once()`
- Bon fonctionnement du formulaire avec envoi d'e-mail
  - **Nécessite d'héberger votre site** via un logiciel comme Filezilla (gratuit) ou autre. Et un hébergeur comme alwaysdata qui est gratuit (déjà vu en TP)

## Gestion d'équipe
Vous devrez rédiger un document expliquant les tâches que chacun des membres de l'équipe a effectué dans cette SAE. Ces explications devront contenir, pour chaque membre, une capture d'écran ou une copie d'une partie de code avec une explication de ce que vous avez développé.

# Votre liste à faire
  - [x] Lire les consignes
  - [ ] S'approprier le code, bien le regarder (HTML et CSS), faire des tests
    - [ ] Je copie et renomme le fichier `squelette.php` pour chaque nouvelle page pour éviter de me créer des problèmes
  - [ ] Réaliser l'intégration de la maquette et la rendre le plus fidèle possible à la maquette
    - Je ne peux pas être iso maquette, c'est impossible
  - [ ] Mettre le site en ligne
  - [ ] Réaliser la sixième page
  - [ ] Afficher un favicon
    - [Accèder au générateur de favicon](https://www.favicon-generator.org/). Vous pouvez sélectionner l'option "Generate only 16x16 favicon.ico" pour générer moins de fichiers
  - [ ] Respecter les normes d'accessibilité web (liste non exhaustive)
    - [ ] Mes images possèdent un attribut "alt" **même s'il est vide**
    - [ ] **L'unité de la propriété "font-size" est rem**
    - [ ] Chaque page possède une balise &lt;title> avec une valeur appropriée et unique
    - [ ] Je n'utilise pas de balises &lt;br> de façon inappropriée
    - [...]
  - [ ] Traiter les données du formulaire pour envoyer un e-mail

# FAQ - Foire Aux Questions
- **J'ai uploadé mon site sur un serveur et j'ai une erreur "Access forbidden". Pourquoi ?**

  Vous n'avez pas de fichier `index.php` à la racine de votre dossier. Il faut impérativement un fichier `index.php` sinon, c'est comme construire une maison sans porte d'entrée.

- **Les images ne me plaisent pas, est-il possible de les changer ?**

  Oui, vous pouvez. Attention tout de même à ne pas mettre de contenus problématiques.

- **Il y a des animations quand on survole certains éléments, comment on fait ceci ?**

  Ce ne sont pas des animations mais des transitions. Ceci se fait en CSS, nous verrons ceci à l'occasion du deuxième semestre, mais si le sujet vous intéresse déjà, il y a la documentaion des CSS transitions sur mdn
    - [Accéder à la documentation de CSS Transition](https://developer.mozilla.org/fr/docs/Web/CSS/transition)
- **C'est compliqué de travailler en groupe, il y a parfois des fichiers dupliqués, est-ce grave ?**
    
    Vous n'avez pas vu comment développer de façon collaborative, c'est normal que vous ayez des duplications, notamment au niveau des sélecteurs CSS. Comme dit dans la partie Astuces, pour limiter les problèmes lors de la fusion, pour chaque page faite un CSS dédié quitte à avoir des doublons

- **Le raccourci `html:5` ne fonctionne pas dans mes fichiers PHP, pourquoi ?**
    
    Il faut activer l'outil d'emmet sur les fichiers PHP, c'est lui qui permet notamment d'utiliser le raccourci `html:5`. Pour ce faire :
    1. Allez dans le menu File > Preferences > Settings
    1. Recherchez "emmet" dans la barre de recherche
    1. Dans la zone "Emmet: Includes languages", cliquez sur "Add Item" et ajoutez "php" dans la zone "key" et "html" dans la zone "value"

# Pour aller plus loin
[Voir la liste des ajouts possibles au projet pour aller plus loin](POUR-ALLER-PLUS-LOIN.md)