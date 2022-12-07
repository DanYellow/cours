# SAE 402- Création d'un jeu vidéo
_Les consignes pourront être modifiées._

Dans le cadre du cours de création et design interatif, nous avons pu découvrir le logiciel Unity, il permet de faire des jeux vidéo de toutes sortes. Le but de cette SAE sera donc de renforcer vos connaissances et d'en découvrir de nouvelles. Le tout dans le but de valider les Apprentissages Critiques (AC) suivants : 

- AC 23.02 | Définir une iconographie (illustrations, photographies, vidéos)
- ~~AC 23.03 | Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs~~
- AC 23.04 | Imaginer, écrire et scénariser en vue d'une communication multimédia ou transmédia
- AC 23.06 | Elaborer et produire des animations, des designs sonores, des effets spéciaux, de la visualisation de données ou de la 3D

Vous ne partirez pas d'un nouveau projet mais de la base d'un jeu de plate-formes possédant déjà quelques mécaniques de jeu. Parmi ces mécaniques, vous trouverez :
- Gestion des déplacements du joueur
    - Déplacements horizontaux
    - Multi sauts
- Suivi du joueur par la caméra
- Ennemis :
    - Un ennemi peut tirer des projectiles à cadence variable quand on entre dans sa zone de trigger (BoxCollider2D)
    - Des rhinocéros qui foncent sur le joueur
- Pièges :
    - RockHead : Une pierre qui se fonce à interval régulier à des endroits fixes. La mécanique est semblable aux thwomps dans l'univers des jeux Super Mario
    - Scie : Statique ou mobile sur une circuit défini
- Un ensemble de ScriptableObject de type évènementiels ou variables (Assets/Scripts/ScriptableObjects) :
    - Pause / Relance du jeu
    - Nombre de points de vie des ennemis de base
    - ...
- Système de pause (Appui sur le bouton Echap)
    - Il n'y a pas de menu de Pause, c'est une des tâches que vous devez effectuer
    - Il n'est pas forcément complet, il y a des choses à rajouter notamment la gestion des déplacements
- Un gestionnaire de Son / Musique
    - Les sons (par exemple, les pommmes) sont gérés via des scriptables objects


Pensez donc bien à observer le code / le projet fournit pour travailler dans de bonnes conditions. Ce projet Unity contient deux scènes :
- Un niveau qui devra faire office de premier niveau
- Une scène dite de bootstrap, elle sert, dans les grandes lignes, à précharger les éléments communs à toutes les scènes, par exemple, la gestion du son
    - Plus d'explications sur la scène de bootstrap

> Le projet contient quelques Assets (`Assets/Imports`) qui n'ont pas forcément été utilisés, vous pouvez les utiliser. Les autres assets de cet univers, vous les avez récupérés lors du premier TP, mais si vous avez perdu le lien, ils se trouvent ici : [Télécharger les assets](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fcreation-et-design-interactif-s4%2Ftravaux-pratiques%2Fnumero-1%2Fressources%2Funity)

Pour faciliter le développement, des raccouris (qui ne seront pas présents dans la version de build) :
- Touche R : Relance le niveau actuel
- Touche F9 : Tue le joueur d'un coup

# Commandes du jeu
- Flèches gauche et droite : déplacement du joueur
- Barre espace : Saut
- Touche V (maintien) : Accélération


## Liste des choses impératives à faire. **Vous devez toutes les faire**
- Compléter le niveau du projet en permettant au joueur de passer au niveau suivant
- Un écran d'accueil (écran qui permet de commencer le jeu)
    - L'écran doit contenir le logo de l'université
    - Essayez de rendre l'écran attrayant. Pourquoi pas des animations ?
    - Pour rappel, ici il faudra utiliser un Canvas
    - **Ceci nécessite donc de donner un nom à votre jeu également**
- Ajouter un nouveau niveau (décors, ennemis et mécaniques compris)
    - Vous pouvez utiliser le thème que vous souhaitez pour la décoration. Vous pouvez donc importer de nouvelles tilemaps ou  utiliser celles déjà présentes dans le projet
    - Pensez bien à créer la condition pour aller au niveau suivant
        - Exemple : Une zone de trigger
    - Vous pouvez récupérer des mécanismes déjà présents dans le premier niveau
    - Il doit être possible de le terminer
- Ajouter un écran des crédits (voir plus bas pour son contenu)
- Afficher un menu de pause
    - Il est déjà possible de mettre le jeu en pause en appuyant sur la touche "Echap"
    - La gestion du menu pause est faite grâce à un ScriptableObject (`Assets/Scripts/ScriptableObjects/Events/OnTogglePauseEventSO`)
    - Libre à vous d'ajouter d'autres options dans le menu de pause comme relancer le niveau ou encore retourner au menu principal
    - Rappel : si vous souhaitez animer le menu pause, il ne faut pas oublier de sélectionner l'option "Unscaled Time" dans l'animator. Sinon vos animations ne se joueront pas 
- Système de santé du joueur
    - Optionnel : possibilité de proposer le regain de vie
- Terminer la gestion de la mort du personnage. A l'heure actuelle, il y a :
    - un évènement (OnPlayerDeathSO) sur le GameObject "Player"
    - une animation de mort du personnage (testable avec la touche F9 du clavier)
    - "Suppression" du Rigidbody2D associé (Passage de "Simulated" à "Non simulated")
- Corriger les bugs / fonctionnalités incomplètes suivantes :
    - L'ennemi de type "plante" tire des graines même quand le joueur n'est pas à son niveau. Faites en sorte que les graines soient tirées uniquement 
- Ajouter une fonctionnalité de votre choix - Les possibilités sont infinies : chronomètre, boss...
    > N'oubliez pas : **c'est votre jeu**. Faites preuve d'imagination, ce projet peut être un très beau moyen de valoriser vos CV. Ne vous limitez pas parce que c'est un devoir. Tentez des choses, l'école est l'occasion de tenter des trucs en sécurité mais surtout d'apprendre

## Liste des choses à faire au choix. Vous devez au moins en faire une
- Afficher un écran de fin de partie (Game Over)
    - A vous de décider les conditions qui conduisent à la fin de la partie
- Ajouter une musique. Vous pourrez en trouver sur ces sites :
    - http://dig.ccmixter.org/games
    - https://www.playonloop.com/royalty-free-music/video-game-chiptune-music/
    - https://github.com/OpenSourceMusic
    - https://opengameart.org/
- Un système de score
    - A vous de définir les règles de bonus / malus de score
- Des bruitages lors d'actions (sauts, tir...)
    - Vous avez un exemple de fonctionnement de bruitage dans la Prefab "Apple"
    - Pourquoi pas ne pas réaliser vous-même ces bruitages
- Expliquer comment le jeu fonctionne (les contrôles, mécaniques...)
    - Vous pouvez faire un niveau de didacticiel ou encore menu dédié
        - Il y a un sprite avec les différents contrôles et boutons
- Animer les checkpoints (Les carrés rouges dans les niveaux)
- Créer **une** props de votre choix (ennemi, bonus, panneau...) et l'intégrer dans le jeu
    - Pas besoin que votre props colle avec la DA du jeu
    - Ce n'est pas du grand art qui est attendu. Si nous n'êtes pas à l'aise avec le dessin, un simple panneau est suffisant
    - Vous pouvez utiliser le logiciel gratuit [LibreSprite](https://libresprite.github.io/#!/) pour réaliser votre création

### Contenu de l'écran des crédits 
> Mettez juste le pseudo de la personne + le site où vous avez trouvé la ressource.
- https://pixelfrog-assets.itch.io/pixel-adventure-2
- https://pixelfrog-assets.itch.io/pixel-adventure-1
- https://opengameart.org/content/8bit-style-music
- Et vous bien évidemment 
    - Pensez également à mettre le logo de l'université + l'année + le nom de la formation

### Ressources graphiques utilisables, source non exhaustives
- https://www.kenney.nl/assets
- https://www.itch.io
- https://opengameart.org/

# Astuces et conseils
- Le code fournit essaye le plus possible d'éviter le trop fort couplage entre les composants notamment en créeant des scripts dédiés pour chaque fonctionnalité et en utilisant les Scriptable Objects. Essayez de continuer sur cette voie !
- Un GameObject est réutilisé à plusieurs reprises ? Pensez aux Prefabs
- Variables, classes, commentaires sont écrits en anglais. Continuez ainsi. En programmation, on écrit plutôt en anglais, et ce, quelque soit le pays où vous êtes
- Pour vous éviter des quiproquos, nous vous suggèrons chaleureusement à définir une convention de nommage ainsi que nommer très clairement vos variables
    - Par exemple : N'appelez pas une variable "a". Vous connaîtrez son sens lors de sa création, mais rien ne dit que ça sera le cas une semaine plus tard ou pour un autre membre de votre groupe
- Vu que vous aller travailler à plusieurs, vous aller devoir forcément utiliser git. Malheureusement git n'est pas trop adapté pour Unity surtout quand on édite à plusieurs la même scène. Toutefois, il existe quelques astuces pour éviter les (gros) conflits lorsqu'on travaille à plusieurs : 
    - Créer des Prefabs : L'idée est de séparer sa scène en plusieurs prefabs et chacun édite sa propre prefab
        - Il est possible de faire des prefabs de prefabs
    - Utiliser des scènes dites "additives" : Un peu plus compliqué à mettre en place et nécessite du code en plus pour appeler une scène dans une autre
Quoiqu'il en soit, vous trouverez des explications sur ces méthodes : [ici](https://gist.github.com/j-mai/4389f587a079cb9f9f07602e4444a6ed#-git-workflow)
> Nous vous conseillons plutôt d'utiliser la méthode des prefabs, plus simple à mettre en place

# Votre liste à faire
- [x] Lire les consignes
- Former votre groupe, plus tôt vous le ferez, plus tôt vous pourrez commencer à travailler
- Respecter les attentes
- Générer une archive contenant :
    - Votre build du jeu
        - Pensez à tester votre jeu
    - Un fichier texte contenant les membres de votre groupe

# FAQ - Foire Aux Questions
- Est-il possible de réaliser ce travail seul(e) ?
    - Il est possible réaliser cette SAE en solitaire. Cependant, nous vous déconseillons de le faire car la charge de travail est assez conséquente et en cas d'imprévus qui vous empêche de travailler dans de saines conditions, il sera très compliqué pour nous de vous noter. De plus, le travail collaboratif vous incitera à utiliser github
- Est-il possible de rendre mon jeu jouable avec une manette de jeu ?
    - Ce n'est pas demandé, mais vous pouvez le faire. Après, si vous le faites, pensez bien à adapter votre UI si jamais vous affichez des touches de manettestant
- J'ai trouvé un super design / son / bruitage, mais je n'ai pas les droits, est-ce possible quand même de l'utiliser ?
    - Vous pouvez, toutefois, si possible, évitez, d'autant plus qu'un site comme itch.io propose des milliers d'assets de qualité et gratuit. Ainsi que d'autres sites listés plus haut
- Est-ce que j'ai le droit de modifier le code existant (ajout de propriétés, méthodes...) ?
    - Vous avez tout à fait le droit. Si une fonctionnalité ne sied pas à votre besoin final, modifiez-la.
- Sommes-nous obligés d'utiliser les Scriptables Objects ?
    - Non. Toutefois, nous vous conseillons fortement de ne pas vous en passer. Ils sont très utiles et limitent très fortement le couplage de votre code. Pour rappel, un couplage fort implique de nombreuses dépendances et surtout des difficulté à extraire un GameObject / Composant d'une scène sans embarquer avec lui d'autres GameObjects. Néanmoins, il existe des cas où l'utilisation de Scriptables Objects n'est pas forcément nécessaire. Ex : le suivi du joueur par la caméra
- Puis-je effectuer un projet à partir de zéro ?
    - Il est possible de ne pas utiliser la base que nous vous proposons. Cependant, il y a deux points importants à prendre en compte :
        - Mettre à la racine de votre projet un fichier .gitgnore pour vous permettre de mettre votre projet sur github
            - [Télécharger le .gitignore pour unity](https://raw.githubusercontent.com/github/gitignore/main/Unity.gitignore)
        - être ambitieux dans le projet, n'allez pas faire un jeu où c'est juste un carré / cube qui saute
