# SAE 402 - Concevoir un dispositif interactif
> _Les consignes pourront être modifiées et peuvent aborder des notions qui n'ont pas pu être vues en cours pour des questions de temps. La cas échéant ne prenez pas en compte ces consignes là. Toutefois rien ne nous empêche d'essayer._

> **Note : Le projet a été développé avec une ancienne version d'Unity. Néanmoins, vous serez en capacité de l'ouvrir avec une version plus récente. Il est donc inutile de perdre du temps à installer une ancienne version d'Unity pour ouvrir ce projet.**

Dans le cadre du cours de création et design interatif, nous avons pu découvrir le logiciel Unity, il permet de réaliser des jeux vidéo de toutes sortes en 2D ou 3D. Le but de cette SAE sera donc de renforcer vos connaissances et d'en découvrir de nouvelles. Le tout dans le but de valider les Apprentissages Critiques (AC) suivants : 

- AC 23.02 | Définir une iconographie (illustrations, photographies, vidéos)
- AC 23.03 | Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs
- ~~AC 23.04 | Imaginer, écrire et scénariser en vue d'une communication multimédia ou transmédia~~
- AC 23.06 | Elaborer et produire des animations, des designs sonores, des effets spéciaux, de la visualisation de données ou de la 3D

Vous ne partirez pas d'un nouveau projet mais d'un jeu de plate-formes existant.
> [Télécharger le projet](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fcreation-et-design-interactif-s4%2Fsamples%2Fadvanced-base)
>
> Pour ouvrir le projet, il faudra passer par Unity Hub. Ensuite, cliquer sur le bouton `Open` et sélectionner `Add Project From Disk` puis **le dossier** contenant le projet. 
![](unity-hub.jpg)
<p style="text-align: center">L'import de projets se fait depuis l'Unity Hub, et non depuis le logiciel Unity.</p>

> **Pour rappel, le projet a été développé avec une ancienne version d'Unity. Néanmoins, vous serez en capacité de l'ouvrir avec une version plus récente. Il est donc inutile de perdre du temps à installer une ancienne version d'Unity pour ouvrir ce projet.**

Le projet possède déjà quelques mécaniques de jeu. Parmi ces mécaniques, vous trouverez :
- Gestion des déplacements du joueur
    - Déplacements horizontaux
    - Multi sauts
- Suivi du joueur par la caméra
- Ennemis :
    - Des fleurs qui tirent des projectiles à cadence variable quand on entre dans sa zone de trigger (BoxCollider2D)
    - Des rhinocéros qui foncent sur le joueur
    - Des pierres qui se divisent en deux lorsqu'on leur saute dessus
- Pièges :
    - RockHead : Une pierre qui fonce à intervalle régulier à des endroits fixes. La mécanique est semblable aux thwomps dans l'univers des jeux Super Mario
    - Scie : Statique ou mobile se déplaçant sur un circuit défini
    - Chaine : Une boule qui se déplace selon un axe défini
- Un ensemble de ScriptableObject de type évènementiels ou variables (Assets/Scripts/ScriptableObjects) :
    - Pause / Relance du jeu
    - Nombre de points de vie des ennemis de base
    - Tremblement de la caméra
    - Mort du joueur
    - Perte de points de vies du joueur
    - ...
- Système de pause (Appui sur le bouton Echap)
- Un gestionnaire de Son / Musique
    - Les sons (par exemple, les pommmes à leur récupération) sont gérés via des ScriptableObject de type évènementiel `Assets/ScriptableObjects/Events/Values/OnSFXAudioChannel`

> Des Scripts pour l'éditeur Unity sont dans le projet, ils permettent de tester directement, en **Play mode**, les ScriptableObjects de type évènement `Assets/ScriptableObjects/Events/Values/`. Pratique.

Pensez donc bien à observer le code / le projet fournit pour travailler dans de bonnes conditions. Ce projet Unity contient quatre scènes :
- Un menu d'accueil **que vous devrez compléter voir plus bas**
- Un niveau qui devra faire office de premier niveau
- Une scène dite de bootstrap, elle sert, dans les grandes lignes, à précharger les éléments communs à toutes les scènes, par exemple, la gestion du son
    - [Plus d'explications sur le fonctionnement la scène de bootstrap - anglais](https://stackoverflow.com/questions/35890932/unity-game-manager-script-works-only-one-time/35891919#35891919)
- Une scène de debug pour tester des fonctionnalités rapidement
    - Inutile de la mettre dans le build final (à enlever dans le menu `File > Build Settings`)

> **Si Unity Hub indique que le projet a été ouvert avec une ancienne version d'Unity, vous pouvez quand même l'ouvrir avec une version plus récente, vous ne devriez pas avoir de problèmes. Il n'est pas utile de télécharger cette ancienne version.**

> Le projet contient quelques Assets (`Assets/Imports`) qui n'ont pas forcément été utilisés, vous pouvez les utiliser. Les autres assets de cet univers, vous les avez récupérés lors du premier TP, mais si vous ne les avez plus, ils se trouvent ici : [Télécharger les assets](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fcreation-et-design-interactif-s4%2Ftravaux-pratiques%2Fnumero-1%2Fressources%2Funity)

Pour faciliter le développement, des raccouris (qui ne seront pas présents dans la version de build) ont été mis en place :
- Touche R : Relance le niveau actuel
- Touche M : Relance le dernier checkpoint (cette méthode est juste appelée, elle ne fait rien. Nous la ferons ensemble)
- Touche K : Change le mode d'affichage de l'onglet "Game" entre fenêtré et plein écran d'ans l'éditeur
- Touche L : Arrête le mode "Play"
- Touche 0 (pas celle du pavé numérique) : Permet d'accéder à la salle "Debug" pour s'assurer que les données sont proprement passées entre les scènes

# Commandes du jeu
- Flèches gauche et droite : déplacement du joueur
- Flèche vers le bas (en hauteur) : déplacement rapide vers le sol
- Barre espace : Saut
- Pause / relance : Touche échap

## Liste des choses impératives à faire. **Vous devez toutes les faire**
- Compléter le niveau du projet en permettant au joueur de passer au niveau suivant
    - Pensez bien à créer la condition pour aller au niveau suivant
        - Exemple : Une zone de trigger
- Un écran d'accueil (écran qui permet de commencer le jeu)
    - L'écran doit contenir : 
        - Le logo de l'université
        - Le nom du jeu
        - De quoi commencer le jeu au premier niveau
            - Il y a déjà un bouton, il faut ajouter une fonction pour charger le premier niveau
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
- Afficher dans le menu de chargement du jeu les auteurs du jeu (voir menu `Project Settings > Player > Logo`)
    - [Didacticiel en anglais sur la personnalisation de la splash page](https://www.youtube.com/watch?v=BY40xbA5qYQ)
- Compléter le menu de pause
    - Il est déjà possible de mettre le jeu en pause en appuyant sur la touche "Echap"
    - La gestion du menu pause est faite grâce à un ScriptableObject (`Assets/ScriptableObjects/Events/Events/OnTogglePauseEventSO`)
    - Libre à vous d'ajouter d'autres options dans le menu de pause comme relancer le niveau ou encore retourner au menu principal via un bouton
    - Rappel : si vous souhaitez animer le menu pause, il ne faut pas oublier de sélectionner l'option "Unscaled Time" dans l'animator des GameObjects qui ne doivent pas être soumis à l'échelle du temps. Sinon vos animations ne se joueront pas 
    > Le menu Pause contient du texte. Toutefois, il est possible qu'il ne s'affiche pas. C'est lié à des packages Unity manquants. Pour ce faire, allez dans le menu d'Unity : `Window > TextMeshPro > Import TMP Essential Ressources.` Ceci va afficher une fenêtre, cliquez sur le bouton "Import" en bas à droite.  
- Afficher un indicateur du nombre de points de vie
    - Optionnel : possibilité de proposer le regain de vie
    - Note : Vous pouvez également décider qu'au moindre dégâts le joueur meurt immédiatement
> La gestion des points de vie du joueur est gérée via un ScriptableObject. Qui gère à la fois le nombre de points de vie actuels et maximum. A noter que la valeur des points de vie actuels est "clampée", autrement dit, elle ne peut pas être inférieure à 0 ni supérieure au nombre de points de vie maximum définis. Si vous le souhaitez, vous pouvez supprimer ce comportement.

- Terminer la gestion de la mort du personnage. A l'heure actuelle, il y a :
    - un évènement (OnPlayerDeathSO) sur le GameObject "Player"
    - une animation de mort du personnage (testable avec la touche N du clavier)
    - "Suppression" du Rigidbody2D associé (Passage de "Simulated" à "Non simulated"). Le personnage traverse les murs à la mort
    - La mort instanée si le joueur est écrasé par un rockhead
    - **A vous de faire le reste** (liste non exhaustive)
      - Bloquer les mouvements du joueur
- Ajouter une fonctionnalité de votre choix - Les possibilités sont infinies : score, chronomètre, boss, objets à récupérer...
    > N'oubliez pas : **c'est votre jeu**. Faites preuve d'imagination, ce projet peut être un très beau moyen de valoriser vos CV. Ne vous limitez pas parce que c'est un devoir. Tentez des choses, l'école est l'occasion de tenter des trucs en sécurité mais surtout apprendre de nouvelles choses
- Rajouter un ennemi parmi ceux proposés
    - Dans l'archive que vous avez récupéré au début des cours, il y a un dossier `ressources/unity/sprites/platformer/Enemies`
        - L'ennemi "Mushroom" ou "Chicken" semblent être les plus simples à l'implémenter
        - N'oubliez pas qu'il y déjà des scripts décrivant des comportants appliquables à un ennemi : Patrouille (EnemyPatrol), Tir (EnemyShooting + ObjectPooling), Santé (Enemy) à vous de les réutiliser, au besoin, pour votre nouvel ennemi
- Afficher un écran de fin de partie (Game Over)
    - A vous de décider les conditions qui conduisent à la fin de la partie

## Liste des choses à faire au choix. Vous devez au moins en faire une
- Ajouter une musique. Vous pourrez en trouver sur ces sites :
    - http://dig.ccmixter.org/games
    - https://www.playonloop.com/royalty-free-music/video-game-chiptune-music/
    - https://github.com/OpenSourceMusic
    - https://opengameart.org/
    - Rappel : la musique est gérée au niveau de la scène _Preload
- Des bruitages lors d'actions (sauts, tir...)
    - Vous avez un exemple de fonctionnement de bruitage dans la Prefab "Apple"
    - Pourquoi pas ne pas réaliser vous-même ces bruitages ?
- Ajouter une attaque "impact" alors qu'on appuie sur la flèche du bas durant un saut
    - Il faudra utiliser la méthode [Physics2D.OverlapAreaAll() (ou Physics2D.OverlapCircleAll())](https://docs.unity3d.com/ScriptReference/Physics2D.OverlapAreaAll.html) pour savoir qui a été touché dans une zone spécifique
- Animer les checkpoints (Les carrés bleus dans le niveau)
    - Ajouter une indication de checkpoint atteint
    - Il y a un sprite également pour les checkpoints. A vous de l'implémenter
- Créer **un** prop de votre choix (ennemi, bonus, panneau...) et l'intégrer dans le jeu
    - Pas besoin que votre props colle avec la direction artistique (DA) du jeu
    - Ce n'est pas du grand art qui est attendu. Si nous n'êtes pas à l'aise avec le dessin, un simple panneau est suffisant
    - Vous pouvez utiliser le logiciel gratuit [LibreSprite](https://libresprite.github.io/#!/) pour réaliser votre création en pixelart. Sinon, il y a Photoshop
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
- Réécrire sous forme de ScriptableObject les statistiques du joueur (nombre de sauts maximum, vitesse de déplacement...). Toutes ces informations peuvent tenir dans une seule et unique classe

## Fonctionnalités que nous développerons ensemble
Pour vous permettre de commencer sur de bonnes bases, nous travaillerons (et réfléchirons) ensemble sur les fonctionnalités suivantes. Ceci vous permettra d'avoir plus d'assurance dans l'utilisation d'Unity et de découvrir de nouveaux composants. 
### Recommencer au dernier checkpoint
Dans la classe `Scripts/Managers/CurrentSceneManager`, vous trouverez les fonctionnalités qui doivent être présentes pour que ça fonctionne correctement. Nous allons utiliser un ScriptableObject de type évènementiel pour notifier tous les composants qui doivent réagir à cet évènement.

### Système de ventilateurs
Nous rajouterons un _prop_ qui permettra au joueur de s'élever dans le ciel. Le sprite que nous allons utiliser est déjà dans le projet dans le dossier `Assets/Imports/Sprites/Misc/Fan On (24x8).png`. Cette fonctionnalité sera l'occasion de découvrir le composant [`Area Effector 2D`](https://docs.unity3d.com/Manual/class-AreaEffector2D.html). Et de permettre aux joueurs finir le niveau en atteignant le trophée sur-élevé.
> Le terme "prop" provient du jargon cinématographique, il désigne un objet / accessoire utilisé par les acteurs. Ensuite, il a été transposé dans le monde du jeu vidéo où le sens n'a pas changé. Ainsi tout objet est nommé "prop".

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

# Console de debug
Pour vous aider dans votre productivité, une console de débuggage a été rajoutée dans le jeu. Placée dans la Prefab "DebugConsole", elle s'affiche via le raccourci `ctrl/command + b`. Elle permet notamment de charger un niveau spécifique via son nom ou encore de soigner le joueur.

# Astuces et conseils
- Le code fournit essaye le plus possible d'éviter un couplage trop fort entre les composants notamment en créeant des scripts dédiés pour chaque fonctionnalité et en utilisant les Scriptable Objects. Essayez de continuer sur cette voie !
- Un GameObject est réutilisé à plusieurs reprises ? Pensez aux Prefabs
- Variables, classes, commentaires sont écrits en anglais. Continuez ainsi. En programmation, on écrit plutôt en anglais, et ce, quelque soit le pays où vous êtes
- Pour vous éviter des quiproquos, nous vous suggèrons chaleureusement à définir une convention de code ainsi que nommer très clairement vos variables
    - Par exemple : N'appelez pas une variable "a". Vous connaîtrez son sens lors de sa création, mais rien ne dit que ça sera le cas une semaine plus tard ou pour un autre membre de votre groupe
    - Il existe des conventions de code déjà établies, l'idée n'est pas de les suivre à la lettre, vous pouvez prendre certains points, mais restez cohérent.
        - [Conventions de code C# par Unity - anglais](https://unity.com/how-to/naming-and-code-style-tips-c-scripting-unity)
        - [Conventions de code C# par Microsoft](https://learn.microsoft.com/fr-fr/dotnet/csharp/fundamentals/coding-style/coding-conventions)
        - [Conventions de code C# par Google](https://google.github.io/styleguide/csharp-style.html)
- Si vous avez du mal à visualiser le niveau que vous devez faire, pourquoi ne pas le faire sur papier avant ?
- Vu que vous aller travailler à plusieurs, vous aller devoir forcément utiliser git. Malheureusement git n'est pas trop adapté pour Unity surtout quand on édite à plusieurs la même scène. Toutefois, il existe quelques astuces pour éviter les (gros) conflits lorsqu'on travaille à plusieurs : 
    - Créer des Prefabs : L'idée est de séparer sa scène en plusieurs prefabs et chacun édite sa propre prefab
        - **Il est possible de faire des prefabs de prefabs**
    - Utiliser des scènes dites "additives" : Un peu plus compliqué à mettre en place et nécessite du code en plus pour appeler une scène dans une autre
Quoiqu'il en soit, vous trouverez des explications sur ces méthodes : [ici](https://gist.github.com/j-mai/4389f587a079cb9f9f07602e4444a6ed#-git-workflow)
> Nous vous conseillons plutôt d'utiliser la méthode des prefabs, plus simple à mettre en place

> [Conseils et recommendations concernant Unity et git](https://unity.com/how-to/version-control-systems)

- Si vous avez besoin d'inspirations pour votre UI, vous avez le site [gameuidatabase](https://www.gameuidatabase.com/). Il rencense les UI des nombreux jeux vidéo.
- Le projet utilise déjà TextMeshPro. N'oubliez pas qu'il est possible d'utiliser du code proche du HTML pour personnaliser votre texte (couleur, taille...).
    - [Voir liste non exhaustive des balises TextMeshPro](http://digitalnativestudios.com/textmeshpro/docs/rich-text/)
    - Si vous avez oublié les bases de TextMeshPro, [vous avez cette vidéo en anglais.](https://www.youtube.com/watch?v=gVialGm65Yw)

# Travail en groupe
Nous vous conseillons de ne pas faire un groupe excédent trois membres. Si vous souhaitez être plus **(cinq, maximum).** Vous devrez effectuer quelques tâches supplémentaires en plus de celles déjà demandées :
- Ajouter deux niveaux supplémentaires (portant le total de niveaux à quatre)
- Ajouter un nouvel ennemi au choix

Ces ajouts sont là pour s'assurer que tout le monde travaille équitablement sur le projet. Pensez à utiliser git, ça vous permettra d'avancer à votre allure. 

# Votre liste à faire
- [x] Lire les consignes
- Former votre groupe, plus tôt vous le ferez, plus tôt vous pourrez commencer à travailler sereinement
- Respecter les attentes
- Générer une archive contenant :
    - **Votre build pour Windows ou MacOS du jeu (pas de build WebGL)**
        - Pensez à tester le build final de votre jeu. Il faut faire un build de production, l'option "Développement Build" ne doit pas être cochée
        - [Voir didacticiel sur la génération d'un build](https://github.com/DanYellow/cours/blob/main/creation-et-design-interactif-s4/travaux-pratiques/numero-1/ressources/unity/BUILD.md)

# FAQ - Foire Aux Questions
- **Est-il possible de réaliser ce travail seul(e) ?**

    Il est possible réaliser cette SAE en solitaire. Cependant, nous vous déconseillons de le faire car la charge de travail est assez conséquente et en cas d'imprévus qui vous empêche de travailler dans de saines conditions, il sera très compliqué pour nous de vous noter correctement. De plus, le travail collaboratif vous incitera plus à utiliser github
- **Est-il possible de rendre mon jeu jouable avec une manette de jeu ?**
    
    Ce n'est pas demandé, mais vous pouvez le faire. Après, si vous le faites, pensez bien à adapter votre UI si jamais vous affichez des touches de manettes. Si vous souhaitez gérer une manette, nous vous conseillons très fortement d'utiliser l'Input System d'Unity, il permet de gérer plus facilement les entrées manettes (et clavier)
        - Note : l'utilisation du system nécessitera également une réécriture de certains bouts de code
        - [Voir didacticiel sur l'Input System - anglais](https://www.youtube.com/watch?v=24-BkpFSZuI)
- **J'ai trouvé un super design / son / bruitage, mais je n'ai pas les droits, est-ce possible quand même de l'utiliser ?**
    
    Vous pouvez, toutefois, si possible, évitez, d'autant plus qu'un site comme itch.io propose des milliers d'assets de qualité et gratuit. Ainsi que d'autres sites listés plus haut
- **Est-ce que j'ai le droit de modifier le code existant (ajout de propriétés, méthodes...) ?**

    Vous avez tout à fait le droit. Si une fonctionnalité ne sied pas à votre besoin final, modifiez-la ou même supprimez-la
- **Sommes-nous obligés d'utiliser les Scriptables Objects ?**

    Non. Toutefois, nous vous conseillons fortement de ne pas vous en passer. Ils sont très utiles et limitent très fortement le couplage de votre code et donc des crashs en cas de référence manquante. Pour rappel, un couplage fort implique de nombreuses dépendances et surtout des difficultés à extraire un GameObject / Composant d'une scène sans embarquer avec lui d'autres GameObjects pas nécessaires ailleurs. Encore une fois, ce n'est pas obligatoire, mais préférez leur utilisation.
- **Puis-je effectuer un projet à partir de zéro ?**

    Non, utilisez le projet qu'on vous fournit. Si vous souhaitez commencer un projet à partir de zéro, faites ça plutôt dans le cadre d'un projet personnel
- **Est-ce que j'ai le droit de supprimer des mécanismes de jeu ?**

    Vous pouvez. Si certains ennemis ou pièges ne vous conviennent pas, vous avez tout à fait le droit de faire des modifications. Le niveau de base a été réalisé pour vous fournir une base de travail et d'exemples
