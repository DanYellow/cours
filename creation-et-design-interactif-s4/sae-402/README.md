# SAE 402 - Concevoir un dispositif interactif
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
    - Des pierres qui se divisent en deux lorsqu'on leur saute dessus
    - Un lapin qui vous saute dessus quand vous êtes dans son champ de vision
- Pièges :
    - RockHead : Une pierre qui fonce à interval régulier à des endroits fixes. La mécanique est semblable aux thwomps dans l'univers des jeux Super Mario
    - Scie : Statique ou mobile sur une circuit défini
    - Chaine : Une boule qui se déplace selon un axe défini
- Un ensemble de ScriptableObject de type évènementiels ou variables (Assets/Scripts/ScriptableObjects) :
    - Pause / Relance du jeu
    - Nombre de points de vie des ennemis de base
    - Tremblement de la caméra
    - Mort du joueur
    - ...
- Système de pause (Appui sur le bouton Echap)
    - Il n'y a pas de menu de Pause d'affiché, c'est une des tâches que vous devrez effectuer
    - Il est incomplet, il y a des choses à rajouter notamment la gestion des déplacements durant la pause
- Un gestionnaire de Son / Musique
    - Les sons (par exemple, les pommmes à leur récupération) sont gérés via des ScriptableObject de type évènement `Assets/ScriptableObjects/Events/Events/OnSFXAudioChannel`

> Des Scripts pour inspecteur sont dans le projet, ils permettent de tester directement, en _Play mode_, les ScriptableObjects de type évènement `Assets/ScriptableObjects/Events/Events/`. Pratique.

Pensez donc bien à observer le code / le projet fournit pour travailler dans de bonnes conditions. Ce projet Unity contient trois scènes :
- Un niveau qui devra faire office de premier niveau
- Une scène dite de bootstrap, elle sert, dans les grandes lignes, à précharger les éléments communs à toutes les scènes, par exemple, la gestion du son
    - [Plus d'explications sur le fonctionnement la scène de bootstrap - anglais](https://stackoverflow.com/questions/35890932/unity-game-manager-script-works-only-one-time/35891919#35891919)
    
- Une scène de debug pour tester des fonctionnalités rapidement

- [Télécharger le projet](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fcreation-et-design-interactif-s4%2Fsamples%2Fadvanced-base)

> Le projet contient quelques Assets (`Assets/Imports`) qui n'ont pas forcément été utilisés, vous pouvez les utiliser. Les autres assets de cet univers, vous les avez récupérés lors du premier TP, mais si vous avez perdu le lien, ils se trouvent ici : [Télécharger les assets](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fcreation-et-design-interactif-s4%2Ftravaux-pratiques%2Fnumero-1%2Fressources%2Funity)

Pour faciliter le développement, des raccouris (qui ne seront pas présents dans la version de build) ont été mis en place :
- Touche R : Relance le niveau actuel
- Touche F7 : Inflige des dégâts de 0 au joueur - C'est juste pour déclencher la fonction TakeDamage de la classe `PlayerHealth`
- Touche F8 : Relance le dernier checkpoint (cette méthode est juste appelée, elle ne fait rien. Nous la ferons ensemble)
- Touche F11 : Change le mode d'affichage de l'onglet "Game" entre fenêtré et plein écran
- Touche F12 : Arrête le mode "Play"
- Touche 0 (pas celle du pavé numéro) : Permet d'accéder à la salle "Debug" pour s'assurer que les données sont proprement passées entre les scènes

# Commandes du jeu
- Flèches gauche et droite : déplacement du joueur
- Flèche vers le bas (en hauteur) : déplacement rapide vers le sol
- Barre espace : Saut
- Touche V (maintien) : Accélération
- Pause / relance : Touche échap

## Liste des choses impératives à faire. **Vous devez toutes les faire**
- Compléter le niveau du projet en permettant au joueur de passer au niveau suivant
    - Pensez bien à créer la condition pour aller au niveau suivant
        - Exemple : Une zone de trigger
- Un écran d'accueil (écran qui permet de commencer le jeu)
    - L'écran doit contenir : 
        - Le logo de l'université
        - Le nom du jeu
        - De quoi commencer le jeu au premier niveau (Un menu de jeu en somme)
    - Essayez de rendre l'écran attrayant. Pourquoi pas des animations ?
    - Pour rappel, ici il faudra utiliser un Canvas
    - **Ceci nécessite donc de donner un nom à votre jeu également**
- Ajouter un nouveau niveau (décors, ennemis et mécaniques compris)
    - Vous pouvez utiliser le thème que vous souhaitez pour la décoration. Vous pouvez donc importer de nouvelles tilemaps ou utiliser celles déjà présentes dans le projet
    - Vous pouvez récupérer des mécanismes déjà présents dans le premier niveau
    - Il doit être possible de terminer ce nouveau niveau
    - Vous pourrez trouver des inspirations ici :
        - [https://pixelfrog-assets.itch.io/pixel-adventure-1](https://pixelfrog-assets.itch.io/pixel-adventure-1)
        - [https://pixelfrog-assets.itch.io/pixel-adventure-2](https://pixelfrog-assets.itch.io/pixel-adventure-2)
- Ajouter un écran des crédits (voir plus bas pour son contenu)
- Afficher un menu de pause
    - Il est déjà possible de mettre le jeu en pause en appuyant sur la touche "Echap"
    - La gestion du menu pause est faite grâce à un ScriptableObject (`Assets/ScriptableObjects/Events/Events/OnTogglePauseEventSO`)
    - Libre à vous d'ajouter d'autres options dans le menu de pause comme relancer le niveau ou encore retourner au menu principal
    - Rappel : si vous souhaitez animer le menu pause, il ne faut pas oublier de sélectionner l'option "Unscaled Time" dans l'animator des GameObjects qui ne doivent pas être soumis à l'échelle du temps. Sinon vos animations ne se joueront pas 
- Système de santé du joueur
    - Optionnel : possibilité de proposer le regain de vie
    - Note : Vous pouvez également décider qu'au moindre dégâts le joueur meurt immédiatement
- Terminer la gestion de la mort du personnage. A l'heure actuelle, il y a :
    - un évènement (OnPlayerDeathSO) sur le GameObject "Player"
    - une animation de mort du personnage (testable avec la touche F9 du clavier)
    - "Suppression" du Rigidbody2D associé (Passage de "Simulated" à "Non simulated")
- Ajouter une fonctionnalité de votre choix - Les possibilités sont infinies : score, chronomètre, boss, objets à récupérer...
    > N'oubliez pas : **c'est votre jeu**. Faites preuve d'imagination, ce projet peut être un très beau moyen de valoriser vos CV. Ne vous limitez pas parce que c'est un devoir. Tentez des choses, l'école est l'occasion de tenter des trucs en sécurité mais surtout apprendre de nouvelles choses
- Rajouter un ennemi parmi ceux proposés
    - Dans l'archive que vous avez récupéré au début des cours, il y a un dossier "Enemies"
        - L'ennemi "Mushroom" ou "Chicken" semblent être les plus simples à l'implémenter
        - N'oubliez pas qu'il y déjà des scripts décrivant des comportants appliquables à un ennemi : Patrouille (EnemyPatrol), Saut (EnemyJumpAttack), Santé (Enemy)
- Afficher un écran de fin de partie (Game Over)
    - A vous de décider les conditions qui conduisent à la fin de la partie

## Liste des choses à faire au choix. Vous devez au moins en faire une
- Ajouter une musique. Vous pourrez en trouver sur ces sites :
    - http://dig.ccmixter.org/games
    - https://www.playonloop.com/royalty-free-music/video-game-chiptune-music/
    - https://github.com/OpenSourceMusic
    - https://opengameart.org/
    - Rappel : la musique est gérée au niveau de la scène _Preload
- Un système de score
    - A vous de définir les règles de bonus / malus de score
- Des bruitages lors d'actions (sauts, tir...)
    - Vous avez un exemple de fonctionnement de bruitage dans la Prefab "Apple"
    - Pourquoi pas ne pas réaliser vous-même ces bruitages ?
- Ajouter une attaque "impact" alors qu'on appuie sur la flèche du bas en l'air
    - Il faudra utiliser la méthode [Physics2D.OverlapAreaAll() (ou Physics2D.OverlapCircleAll())](https://docs.unity3d.com/ScriptReference/Physics2D.OverlapAreaAll.html) pour savoir qui a été touché dans une zone spécifique
- Animer les checkpoints (Les carrés bleus dans le niveau)
    - Ajouter une indication de checkpoint atteint
    - Il y a un sprite également pour les checkpoints. A vous de l'implémenter
- Créer **une** props de votre choix (ennemi, bonus, panneau...) et l'intégrer dans le jeu
    - Pas besoin que votre props colle avec la DA du jeu
    - Ce n'est pas du grand art qui est attendu. Si nous n'êtes pas à l'aise avec le dessin, un simple panneau est suffisant
    - Vous pouvez utiliser le logiciel gratuit [LibreSprite](https://libresprite.github.io/#!/) pour réaliser votre création
- Un écran d'accueil personnalisé (celui où est affiché le logo Unity au lancement du jeu dans la version de build). Il y a ce didacticiel pour en savoir plus :
    - [Didacticiel sur l'écran d'accueil personnalisé d'Unity - anglais](https://www.youtube.com/watch?v=BY40xbA5qYQ)
- Ecran de chargement asynchrone de la scène
    - [Didacticiel sur l'écran de chargement asynchrone - anglais](https://www.youtube.com/watch?v=BY40xbA5qYQ)
    - Note : compte-tenu du jeu, il est fort probable que la scène de chargement ne s'affiche même pas 3 secondes
- Expliquer comment le jeu fonctionne (les contrôles, mécaniques...)
    - Vous pouvez réaliser cette tâche via un niveau de didacticiel, un menu dédié ou tout simplement du texte affiché directement dans la scène
        - Il y a un sprite avec les différents contrôles et boutons dans les Assets que vous avez téléchargé. Si le sprite ne vous convient pas, vous pouvez également en télécharger un sur le site [thoseawesomeguys](https://thoseawesomeguys.com/prompts/), néanmoins les images sont séparées, il est préférable de tout fusionner en un sprite. Il est possible de générer des sprites avec un site comme [images-sprite-sheet-generator](https://codeshack.io/images-sprite-sheet-generator/)  
- Proposer une traduction de votre jeu en anglais (ou une autre langue)
    - Il existe le package gratuit "Localization" qui vous permet de gérer ceci. Voici un tutorial (en anglais) expliquant comment intégrer et utiliser le package.
        - Voir le tutoriel sur le [package Localization](https://www.youtube.com/watch?v=qcXuvd7qSxg)
    - Pensez bien à sauvegarder les préférences de l'utilisateur grâce au `PlayerPrefs`

## Fonctionnalités que nous développerons ensemble
Pour vous permettre de commencer sur de bonnes bases, nous travaillerons (et réfléchirons) ensemble sur les fonctionnalités suivantes. Ceci vous permettra d'avoir plus d'assurance dans l'utilisation d'Unity et de découvrir de nouveaux composants. 
### Recommencer au dernier checkpoint
Dans la classe `CurrentSceneManager`vous trouverez les fonctionnalités qui doivent être présentes pour que ça fonctionne correctement. Nous allons utiliser un scriptable object pour nous aider.

### Système de ventilateurs
Nous rajouterons une props qui permettra au joueur de s'élever dans le ciel. Le sprite que nous allons utiliser est déjà dans le projet dans le dossier `Assets/Imports/Sprites/Misc/Fan On (24x8).png`. Cette fonctionnalité sera l'occasion de découvrir le composant [`Area Effector 2D`](https://docs.unity3d.com/Manual/class-AreaEffector2D.html). Et de permettre aux joueurs finir le niveau en atteignant le trophée sur-élevé.

## Contenu de l'écran des crédits 
> Mettez juste le pseudo de la personne + le site où vous avez trouvé la ressource.
- https://pixelfrog-assets.itch.io/pixel-adventure-2
- https://pixelfrog-assets.itch.io/pixel-adventure-1
- https://opengameart.org/content/8bit-style-music
- Et vous bien évidemment 
    - Pensez également à mettre le logo de l'université + l'année + le nom de la formation

### Ressources graphiques / musicales gratuites utilisables, source non exhaustives
- https://www.kenney.nl/assets
- https://www.itch.io
- https://opengameart.org/
- https://www.youtube.com/@NCALIB

# Astuces et conseils
- Le code fournit essaye le plus possible d'éviter un couplage trop fort entre les composants notamment en créeant des scripts dédiés pour chaque fonctionnalité et en utilisant les Scriptable Objects. Essayez de continuer sur cette voie !
- Un GameObject est réutilisé à plusieurs reprises ? Pensez aux Prefabs
- Variables, classes, commentaires sont écrits en anglais. Continuez ainsi. En programmation, on écrit plutôt en anglais, et ce, quelque soit le pays où vous êtes
- Pour vous éviter des quiproquos, nous vous suggèrons chaleureusement à définir une convention de nommage ainsi que nommer très clairement vos variables
    - Par exemple : N'appelez pas une variable "a". Vous connaîtrez son sens lors de sa création, mais rien ne dit que ça sera le cas une semaine plus tard ou pour un autre membre de votre groupe
- Si vous avez du mal à visualiser le niveau que vous devez faire, pourquoi ne pas le faire sur papier avant ?
- Vu que vous aller travailler à plusieurs, vous aller devoir forcément utiliser git. Malheureusement git n'est pas trop adapté pour Unity surtout quand on édite à plusieurs la même scène. Toutefois, il existe quelques astuces pour éviter les (gros) conflits lorsqu'on travaille à plusieurs : 
    - Créer des Prefabs : L'idée est de séparer sa scène en plusieurs prefabs et chacun édite sa propre prefab
        - Il est possible de faire des prefabs de prefabs
    - Utiliser des scènes dites "additives" : Un peu plus compliqué à mettre en place et nécessite du code en plus pour appeler une scène dans une autre
Quoiqu'il en soit, vous trouverez des explications sur ces méthodes : [ici](https://gist.github.com/j-mai/4389f587a079cb9f9f07602e4444a6ed#-git-workflow)
> Nous vous conseillons plutôt d'utiliser la méthode des prefabs, plus simple à mettre en place

# Votre liste à faire
- [x] Lire les consignes
- Former votre groupe, plus tôt vous le ferez, plus tôt vous pourrez commencer à travailler sereinement
- Respecter les attentes
- Générer une archive contenant :
    - Votre build pour Windows du jeu (pas de build web)
        - Pensez à tester le build final de votre jeu
    - Un fichier texte contenant les membres de votre groupe

# FAQ - Foire Aux Questions
- Est-il possible de réaliser ce travail seul(e) ?
    - Il est possible réaliser cette SAE en solitaire. Cependant, nous vous déconseillons de le faire car la charge de travail est assez conséquente et en cas d'imprévus qui vous empêche de travailler dans de saines conditions, il sera très compliqué pour nous de vous noter. De plus, le travail collaboratif vous incitera à utiliser github
- Est-il possible de rendre mon jeu jouable avec une manette de jeu ?
    - Ce n'est pas demandé, mais vous pouvez le faire. Après, si vous le faites, pensez bien à adapter votre UI si jamais vous affichez des touches de manettes
    - Si vous souhaitez gérer une manette, nous vous conseillons très fortement d'utiliser l'Input System d'Unity, il permet de gérer plus facilement les entrées manettes (et clavier)
        - Note : l'utilisation du system nécessitera également une réécriture de certains bouts de code
        - [Voir didacticiel sur l'Input System - anglais](https://www.youtube.com/watch?v=24-BkpFSZuI)
- J'ai trouvé un super design / son / bruitage, mais je n'ai pas les droits, est-ce possible quand même de l'utiliser ?
    - Vous pouvez, toutefois, si possible, évitez, d'autant plus qu'un site comme itch.io propose des milliers d'assets de qualité et gratuit. Ainsi que d'autres sites listés plus haut
- Est-ce que j'ai le droit de modifier le code existant (ajout de propriétés, méthodes...) ?
    - Vous avez tout à fait le droit. Si une fonctionnalité ne sied pas à votre besoin final, modifiez-la ou même supprimez-la
- Sommes-nous obligés d'utiliser les Scriptables Objects ?
    - Non. Toutefois, nous vous conseillons fortement de ne pas vous en passer. Ils sont très utiles et limitent très fortement le couplage de votre code. Pour rappel, un couplage fort implique de nombreuses dépendances et surtout des difficulté à extraire un GameObject / Composant d'une scène sans embarquer avec lui d'autres GameObjects. Néanmoins, il existe des cas où l'utilisation de Scriptables Objects n'est pas forcément nécessaire. Ex : le suivi du joueur par la caméra
- Puis-je effectuer un projet à partir de zéro ?
    - Il est possible de ne pas utiliser la base que nous vous proposons. Cependant, il y a deux points importants à prendre en compte :
        - Mettre à la racine de votre projet un fichier .gitgnore pour vous permettre de mettre votre projet sur github
            - [Télécharger le .gitignore pour unity](https://raw.githubusercontent.com/github/gitignore/main/Unity.gitignore)
        - être ambitieux dans le projet, n'allez pas faire un jeu où c'est juste un carré / cube qui saute
- Est-ce que j'ai le droit de supprimer des mécanismes de jeu ?
    - Vous pouvez. Si certains ennemis ou pièges ne vous conviennent pas, vous avez tout à fait le droit de faire des modifications. Le niveau de base a été réalisé pour vous fournir une base
- Il y a l'erreur "There are no audio listeners in the scene. Please ensure there is always one audio listener in the scene" affichée dans la console. Est-ce grave ?
    - Non. Cette erreur est liée à la scène de préchargement (_Preload), elle n'a aucune incidence sur le build final