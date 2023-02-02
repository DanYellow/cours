# SAÉ 105 - Produire un site web

> **IMPORTANT :** Le code fournit possède quelques modifications mineures par rapport à la maquette finale. 

## Didacticiels
- [Travailler à plusieurs sur le même serveur php](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/PARTAGE-SERVEUR.md)
- [Travailler avec l'extension VS Code liveshare](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/LIVESHARE.md)

## Contexte de la SAÉ
CY Cergy Paris Université nous confie la réalisation d'un site web dédié au BUT Métiers du Multimédia et de l'Internet (MMI).
L'objectif primaire du site sera de présenter de façon détaillée les aspects de la formation du parcours MMI aux lycéens qui sont potentiellement intéressés à poursuivre dans le parcours BUT MMI de l’IUT CYU. Le site doit aussi donner la possibilité de contacter l'administration via un formulaire. De ce fait, ce projet sera l'occasion de mettre en application les notions vues dans les cours de Développement Web et d'Intégration Web pour ainsi valider les apprentissages critiques suivants : 

**R1.11 – Intégration**
- AC14.01 : Exploiter de manière autonome un environnement de développement
efficace et productif
- AC14.02 : Produire des pages Web statiques et fluides utilisant un balisage sémantique efficace et des interactions simples

**R1.12 – Développement Web**
- AC14.03 : Générer des pages Web ou vues à partir de données structurées incluant des interactions simples

**R1.13 – Hébergement**
- AC14.04 : Mettre en ligne une application Web en utilisant une solution d’hébergement standard


À cet effet, CY Cergy Paris Université vous demande de développer, par groupe de 4-6 environ **au sein du même TD/TP**, le site suivant à partir de la maquette interactive (Adobe XD) qui se trouve ici :
- [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/9db2b308-f3b3-40d2-9372-2b43c83a277f-c8e1/screen/b2376c6c-7c7d-4071-a7f0-e32f20ac85aa/)

Vous avez donc très peu de choses à faire niveau design, l'université vous le fournissant. Niveau code, vous êtes également aidé, nous vous fournissons une base d'intégration.
- [Télécharger le code de base](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fintegration-web-s1%2Fsae-105%2Fcode)

Dans le site sont prévues cinq pages qui partagent une structure commune composée par :
- Un header (en-tête) qui contient un menu de navigation et l’intitulé du BUT MMI ainsi qu'un logo stylisé (bulle)
  - Vous devez le compléter et l'adapter pour chaque page
  - Indiquer la page active dans la navigation
    - Ceci ne se fait pas avec la pseudo-classe ":active". Aidez-vous de la gestion de la couleur des bulles pour réaliser la fonctionnalité
- Un footer (pied-de-page) qui contient les liens vers les pages des réseaux sociaux du BUT MMI et le logo de l’Université. Ces liens sont disponibles dans la partie commentaires sur Adobe XD (voir le didacticiel sur Adobe XD pour plus d’informations)
  - [Accéder au didacticiel sur l’utilisation d’Adobe XD](https://cours.cyu.fr/course/view.php?id=81#section-3)
  - Vous devez le compléter

Les pages web du site à réaliser sont donc :
- **Accueil :** Page qui contient des articles concernant le BUT MMI. Chaque article doit s’afficher dans une section composée par 2 éléments (image et texte). Tous les articles sont disposés sur une seule colonne centrale. A côté de cette colonne sera présente une bannière qui redirige vers la page web de la journée portes ouvertes. Cette page a commencé à être développée et est présente dans le squelette fourni
- **À propos :** Page qui contient trois sous-sections accessibles par trois ancres placées en haut de page. Dans la 3ᵉ section, une liste de projets réalisés en SAÉ par les étudiants sera affichée dans une grille de boîtes
- **Contact :** Contient un formulaire qui permet à l’utilisateur d’envoyer une requête d’information.
La page contact possède trois états :
    <ol type="a">
        <li>Défaut (pas de bannière)</li>
        <li>Message envoyé avec succès (bandeau vert)</li>
        <li>Message envoyé avec erreur (bandeau rouge)</li>
    </ol>
    Le bandeau (succès ou erreur) n’est visible qu’après avoir soumis le formulaire. Ainsi, le traitement du formulaire doit être fait sur la même page. L’utilisation de php est **indispensable** pour réussir cette tâche (récupération des valeurs des champs du formulaire). Quant aux conditions qui vont afficher le bandeau rouge, c'est à vous de le définir. Vous pouvez très bien imaginer que si l'adresse e-mail est égale à une valeur bien spécifique alors on affiche le message d'erreur
- **Sur les médias :** Cette page contient une grille de boîtes qui affichent les vidéos YouTube qui traitent différents sujets : le BUT, parcours MMI et IUT. Les liens des vidéos sont les suivants : 
  - https://www.youtube.com/watch?v=oiEbQF7qfBU
  - https://www.youtube.com/watch?v=SyjF4h2Zb7Q
  - https://www.youtube.com/watch?v=t72pdxpNjyc
  - https://www.youtube.com/watch?v=xD4wshE0hEg
  
  A vous de trouver comment on intègre une vidéo Youtube sur un site web. **Les vidéos ne doivent en aucun cas être téléchargées**, c'est le lecteur de Youtube qui doit s'afficher
- **Nouvelle page à votre discretion.** Une cinquième page doit être développée, vous déciderez le contenu et les éléments. Toutefois, elle devra impérativement respecter le design et la mise en page du site. Cette nouvelle page devra être joignable par un lien présent dans la navigation en haut de page. Vous pourrez également rajouter des pages supplémentaires tout en respectant les règles précédemment citées. **A noter que cette SAÉ n'est pas un exercice rédactionnel, vous pouvez récupérer les textes sur le web.**

> Ce n'est pas un exercice de rédaction, vous pouvez très bien récupérer du contenu (textes et images) en ligne.

Vous travaillez en groupe, profitez-en, sollicitez vos connaissances et appétences pour produire le meilleur site possible. Si certains sont moins à l’aise avec le code, ils peuvent s’assurer de la qualité du site en vérifiant que tout fonctionne correctement. Si d’autres sont plus à l’aise avec le design, ils peuvent imaginer la cinquième page.

> Vous ne partirez pas d'une page blanche pour le code, nous avons mis en place une base de code pour vous aider. 
> [Télécharger le code de base](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fintegration-web-s1%2Fsae-105%2Fcode).

# Astuces
- La navigation principale du site se trouve dans le fichier `ressources/css/includes/header.php`
- A la racine du projet, il y a un fichier nommé "squelette.php". A chaque nouvelle page que vous aller créer, **copiez et renommez le fichier.** Ce fichier possède une base saine pour créer une nouvelle page
- Votre code HTML se répète à travers les pages (ou même la même page) ? Pensez à la fonction php `include()`
- Vous ne pouvez pas être pixel perfect. N'essayez pas d'être iso avec la maquette lors de votre intégration, le moteur de rendu de votre navigateur et d'Adobe XD sont différents, des différences **mineures** appraîtront, c'est normal et ce n'est pas grave
- **Vous ne devez en aucun cas modifier les fichier CSS fournis,** c'est à vous de rajouter de nouveaux fichiers CSS pour compléter l'intégration. Les fichiers CSS dans le dossier "ne-pas-modifier" et commençant par "npm-" ne doivent pas être modifiés
  - Vous pouvez en revanche copier un sélecteur présent dans le code de base pour le surcharger si besoin est
- Evitez de copier tout le code CSS fourni par Adobe XD, ça peut être tentant, mais il est malheureusement de très mauvaise qualité et va vous poser plus de problèmes qu'autre chose. Vous pouvez récupérer les propriétés CSS suivantes depuis AdobeXD :
  - font-size
  - width (dans une moindre mesure)
  - height (dans une moindre mesure)
  - les couleurs
  - font-weight
- Pensez bien à lire les notes présentes sur la maquette Adobe, elles peuvent apporter des éclaircissements. Par ailleurs, assurez-vous bien que le commentaire est bien associé à la page en question
- flexbox sera votre meilleur ami pour réaliser la mise en page. Si vous avez un trou de mémoire sur le sujet, vous avez le jeu flexboxfroggy
  - [Accéder au jeu flexboxfroggy](https://flexboxfroggy.com/#fr)
    - Et bien évidemment la documentation
  - [Accéder à la documentation](https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Flexbox)
  
  En tous les cas, n'allez pas faire la mise en page du site avec float ou pire &lt;table>
- Si vous décidez de travailler en groupe de la façon suivante : une page par personne. Assurez-vous de donner un nom unique par page html ET fichier CSS, ceci limitera les conflits lorsque vous metterez vos pages en commun. Par exemple, si un membre travaille sur la page "contact", il créera la page "contact.php" et le fichier "contact.css". Le fichier php étant mis au même niveau que le fichier "index.php" déjà présent et le fichier css dans le dossier "ressources/css" 
- Votre projet doit impérativement avoir un fichier "index.php"

# Rendus attendus
- **Une archive par groupe** nommée nom-prénom (celui du chef de projet) contenant :
  - Les fichiers permettant le bon fonctionnement de votre site
    - **Nous ne débuggerons pas votre site, assurez-vous qu'il fonctionne avant de l'envoyer**
  - Un fichier texte contenant l'URL de votre site hébergé + la composition du groupe

Votre rendu devra être mis sur Moodle avant la date butoir, **cette date sera donnée ultérieurement par e-mail.**
**Des points pourront être retirés ou la note nullifée si le devoir est rendu en retard.**

# Notation
Les critères suivants seront évalués. Une ou les deux parties peuvent être amenée à être évaluée via un oral.

## Intégration Web (HTML/CSS)
Cette partie sera évaluée par MM. Jean-Louis et Linardi.
- Qualité du code :
  - Pas de classes au nom étrange
  - Limitation du nombre de classes CSS
  - Réutilisation des classes CSS
    - N'oubliez pas qu'une balise peut avoir plusieurs classes CSS
  - Organisation du code
    - Utiliser la structure déjà présente peut vous aider
  - Sémantique HTML :
    - Toute utilisation inappropriée de la balise &lt;br> sera sanctionnée
- Accessibilité
  - &lt;img> avec attribut "alt" même vide
  - Valeur de la balise &lt;title> qui change pour chaque page avec la valeur appropriée
  - Unité des police d'écriture en rem
    - Toute utilisation de l'unité px pour la propriété font-size sera sanctionnée, il faut utiliser l'unité rem.
      - Il faut diviser la valeur de la maquette par 16 pour obtenir la font-size en rem
  - Les champs de formulaire sont liés à un label (attributs "for" et "id")
  - [Voir plus de normes d'accessibilité](https://www.accede-web.com/notices/html-et-css/)
- Présence des fonctionnalités / qualité de l'intégration (voir Adobe XD - lien plus haut -)

## Développement Web (PHP)
Cette partie (page "contact") sera évaluée par M. Roch.
- Qualité du code
  - Utilisation de la fonction `require_once()`
- Bon fonctionnement du formulaire avec envoi d'e-mail
  - **Nécessite d'héberger votre site** via un logiciel comme Filezilla (gratuit) ou autre

# Votre liste à faire
  - [x] Lire les consignes
  - [ ] S'approprier le code, bien le regarder (HTML et CSS), faire des tests
    - [ ] Je copie et renomme le fichier `squelette.php` pour chaque nouvelle page pour éviter de me créer des problèmes
  - [ ] Réaliser l'intégration de la maquette et la rendre le plus fidèle possible à la maquette
  - [ ] Mettre le site en ligne
  - [ ] Respecter les normes d'accessibilité web (liste non exhaustive)
    - [ ] Mes images possèdent un attribut "alt" **même s'il est vide**
    - [ ] L'unité de la propriété "font-size" est rem
    - [ ] Chaque page possède une balise &lt;title> avec une valeur appropriée et unique
    - [ ] Je n'utilise pas de balises &lt;br> de façon inappropriée

# FAQ - Foire Aux Questions
- J'ai uploadé mon site sur un serveur et j'ai une erreur "Access forbidden". Pourquoi ?
  - Vous n'avez pas de fichier `index.php` à la racine de votre dossier. Il faut impérativement un fichier `index.php` sinon, c'est comme construire une maison sans portes.

# Pour aller plus loin
[Voir la liste des ajouts possibles au projet pour aller plus loin](POUR-ALLER-PLUS-LOIN.md)