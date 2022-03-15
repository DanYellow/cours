# SAÉ 105 - Produire un site web

CY Cergy Paris Université nous confie la réalisation d'un site web dédié au BUT Métiers du Multimédia et de l'Internet (MMI).
L'objectif primaire du site sera de présenter de façon détaillée les aspects de la formation du parcours MMI aux lycéens qui sont potentiellement intéressés à poursuivre dans le parcours BUT MMI de l’IUT CYU. Le site doit aussi donner la possibilité de contacter l'administration via un formulaire. De ce fait, ce projet sera l'occasion de mettre en application les notions vues dans les cours de Développement Web et d'Intégration Web pour ainsi valider les apprentissages critiques suivants : 
- AC4101 : Exploiter de manière autonome un environnement de développement
efficace et productif
- AC4102 : Produire des pages Web statiques et fluides utilisant un balisage
sémantique efficace
- AC4103 : Générer des pages Web ou vues à partir de données structurées incluant
des interactions simples
- AC4104 : Mettre en ligne une application Web en utilisant une solution
d’hébergement standard

L'Université, pour sa part, nous fournit le style et la forme qu'elle souhaiterait donner au site, ainsi que delà des idées sur le contenu.

À cet effet, CY Cergy Paris Université vous demande de développer, par groupe de cinq, le site en suivant la maquette interactive (Adobe XD) qui vous trouvez ici :
- [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/9db2b308-f3b3-40d2-9372-2b43c83a277f-c8e1/screen/b2376c6c-7c7d-4071-a7f0-e32f20ac85aa/)


Dans le site sont prévues cinq pages qui partagent une structure commune composée par :
- Un header (en-tête) qui contient un menu de navigation et l’intitulé du BUT MMI ainsi qu'un logo stylisé (bulle)
- Un footer (pied-de-page) qui contient les liens vers les pages des réseaux sociaux du BUT MMI et le logo de l’Université. Ces liens sont disponibles dans la partie commentaires sur Adobe XD (voir le didacticiel sur Adobe XD pour plus d’informations)
  - [Accéder au didacticiel sur l’utilisation d’Adobe XD]()

Les pages web du site à réaliser sont donc :
- **Accueil.** Page qui contient des articles concernant le BUT MMI. Chaque article doit s’afficher dans une section composée par 2 éléments (image et texte). Tous les articles sont disposés sur une seule colonne centrale. A côté de cette colonne sera présente une bannière qui redirige vers la page web de la journée portes ouvertes 2022. Cette page a commencé à être développée et est présente dans le squelette fourni
- **À propos.** Page qui contient 3 sous-sections accessibles par 3 liens (ancres) placés en haut de page. Dans la 3ᵉ section, une liste de projets réalisés en SAÉ par les étudiants sera affichée dans une grille de boîtes
- **Contact.** Contient un formulaire qui permet à l’utilisateur d’envoyer une requête d’information.
La page contact possède trois états :
    <ol type="a">
        <li>Défaut (pas de bannière)</li>
        <li>Message envoyé avec succès (bandeau vert)</li>
        <li>Message envoyé avec erreur (bandeau rouge)</li>
    </ol>
    Le bandeau (succès ou erreur) n’est visible qu’après avoir soumis le formulaire. Ainsi, le traitement du formulaire doit être fait sur la même page. L’utilisation de php est indispensable pour réussir cette tâche (récupération des valeurs des champs du formulaire). Quant aux conditions qui vont afficher le bandeau rouge, c'est à vous de le définir
- **Sur les médias.** Cette page contient une grille de boîtes qui affichent les vidéos YouTube qui traitent différents sujets : le BUT, parcours MMI et IUT. Les liens des vidéos sont les suivants : 
  - https://www.youtube.com/watch?v=oiEbQF7qfBU
  - https://www.youtube.com/watch?v=SyjF4h2Zb7Q
  - https://www.youtube.com/watch?v=t72pdxpNjyc
  - https://www.youtube.com/watch?v=xD4wshE0hEg
  
  A vous de trouver comment on intègre une vidéo Youtube sur un site web. **Les vidéo ne doivent en aucun cas être téléchargées**
- **Nouvelle page à votre discretion.** Une cinquième page doit être développée, vous déciderez le contenu et les éléments. Toutefois, elle devra impérativement respecter le design et la mise en page du site. Cette nouvelle page devra être joignable par un lien présent dans la navigation en haut de page. Vous pourrez également rajouter des pages supplémentaires tout en respectant les
règles précédemment citées. A noter que cette SAÉ n'est pas un exercice rédactionnel, vous pouvez récupérer du code en ligne

Vous travaillez en groupe, profitez-en, sollicitez vos connaissances et appétences pour produire le meilleur site possible. Si certains sont moins à l’aise avec le code, ils peuvent s’assurer de la qualité du site en s’assurant que tout fonctionne correctement. Si d’autres sont plus à l’aise avec le design, ils peuvent imaginer la cinquième page.

# Astuces
- A la racine du projet, il y a un fichier nommé "squelette.php". A chaque nouvelle page que vous aller créer, **copiez et renommez le fichier.** Ce fichier possède une base saine pour créer une nouvelle page
- Votre code HTML se répète à travers les pages (ou même la même page) ? Pensez à la fonction php include
- Vous ne pouvez pas être pixel perfect. N'essayez pas d'être iso avec la maquette, le moteur de rendu de votre navigateur et d'Adobe XD sont différents, des différences **mineures** appraîtront, c'est normal
- **Vous ne devez en aucun cas modifier les fichier CSS fournis,** c'est à vous de rajouter de nouveaux fichiers CSS pour compléter l'intégration.
  - Vous pouvez en revanche copier un sélecteur présent dans le code de base pour le surcharger si besoin est
- Evitez de copier tout le code CSS fourni par Adobe XD, ça peut être tentant, mais il est malheureusement de très mauvaise qualité et va vous poser plus de problèmes qu'autre chose. Vous pouvez récupérer les propriétés CSS suivantes :
  - font-size
  - width (dans une moindre mesure)
  - height (dans une moindre mesure)
  - les couleurs
  - font-weight
- Pensez bien à lire les notes présentes sur la maquette Adobe, elles peuvent apporter des éclaircissements. Par ailleurs, assurez-vous bien que le commentaire est bien associé à la page en question
- flexbox sera votre meilleur ami pour réaliser la mise en page. Si vous avez un trou de mémoire sur le sujet, vous avez le jeu flexboxfroggy
  - [Accéder au jeu flexboxfroggy](https://flexboxfroggy.com/#fr)
  
  En tous les cas, n'allez pas faire la mise en page du site avec float ou pire &lt;table>. Flexbox va vous permettre de faire 100 % de la mise en page 

# Rendus attendus
- **Une archive par groupe** nommée nom-prénom (celui du chef de projet) contenant :
  - Les fichiers permettant le bon fonctionnement de votre site (fichiers)
    - **Nous ne débuggerons pas votre site, assurez-vous qu'il fonctionne avant de l'envoyer**
  - Un fichier texte contenant l'URL de votre site hébergé
  - Un rapport de ressenti par membre de groupe nommé nom-prénom
    - Ceci n'est pas noté, mais vous aidera pour le portfolio que vous devez remplir

Votre rendu devra être mis sur Moodle avant la date butoir, cette date sera donnée ultérieurement par e-mail et précisée à l'endroit où vous devrez remettre votre rendu. Des points pourront être retirés ou la note nulle si le devoir est rendu en retard.

# Notation
Les critères suivants seront évalués. Une ou les deux parties peuvent être amenée à être évaluée via un oral.

## Partie 1 - Intégration Web (HTML/CSS)
Cette partie sera évaluée par MM. Jean-Louis et Linardi.
- Qualité du code
  - Pas de classes au nom étrange
  - Limitation du nombre de classes CSS
  - Réutilisation des classes CSS
    - N'oubliez pas qu'une balise peut avoir plusieurs divs
  - Organisation du code
    - Utiliser la structure déjà présente peut vous aider
  - Sémantique HTML :
    - Toute utilisation inappropriée de la balise &lt;br> sera sanctionnée
- Accessibilité
  - &lt;img> avec attribut "alt" même vide
  - Valeur de la balise &lt;title> qui change pour chaque page avec la valeur appropriée
  - [Voir plus de normes d'accessibilité](https://www.accede-web.com/notices/html-et-css/)
  - Unité des police d'écriture en rem
    - Toute utilisation de l'unité px pour la propriété font-size sera sanctionnée, il faut utiliser l'unité rem.
      - Il faut diviser la valeur par 16 pour obtenir la font-size en rem
  - Les champs de formulaire sont liés à un label (attributs "for" et "id")
- Présence des fonctionnalités / qualité de l'intégration (voir Adobe XD - lien plus haut -)


## Partie 2 - Développement Web (PHP)
Cette partie sera évaluée par M. Roch.
- Qualité du code
  - Utilisation de la fonction include()
- Bon fonctionnement du formulaire

# Votre liste à faire
  - [x] Lire les consignes
  - [ ] S'approprier le code, bien le regarder (HTML et CSS), faire des tests
    - [ ] Je copie et renomme le fichier `squelette.php` pour chaque nouvelle page pour éviter de me créer des problèmes
  - [ ] Continuer l'intégration la rendre le plus fidèle possible à la maquette
  - [ ] Respecter les normes d'accessibilité web (liste non exhaustive)
    - [ ] Mes images possèdent un attribut "alt"
    - [ ] L'unité de la propriété "font-size" est rem
    - [ ] Je n'utilise pas de balises &lt;br> de façon inappropriée

# Pour aller plus loin

Pour aller plus loin sur le projet, voici une liste (non-exhaustive) de fonctionnalités que vous pouvez rajouter pour aller plus loin, vous n'aurez pas plus de points pour autant :
- Afficher un favicon
  - [Accèder au générateur de favicon](https://www.favicon-generator.org/)
    - Vous pouvez sélectionner l'option "Generate only 16x16 favicon.ico" pour générer moins de fichiers
    - Dans le code généré pensez à retirer la barre oblique devant les noms de fichiers. Par exemple `<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">` doit devenir `<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">`
- Indiquer la page active dans la navigation
  - Ceci ne se fait pas avec la pseudo-classe ":active". Aidez-vous de la gestion de la couleur des bulles
- Ajouter un mode sombre
  - [Voir didacticiel sur le mode sombre](https://www.jannaud.fr/guide-pour-passer-facilement-son-site-web-en-mode-sombre-dark-mode-css)
  - C'est à vous de faire le design

