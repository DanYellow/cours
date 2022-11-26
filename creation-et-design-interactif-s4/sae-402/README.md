# SAE 402- Création d'un jeu vidéo
_Les consignes pourront être modifiées._

Dans le cadre du cours de création et design interatif, nous avons pu découvrir le logiciel Unity, il permet de faire des jeux vidéo de toutes sortes. Le but de cette SAE sera donc de renforcer vos connaissances et d'en découvrir de nouvelles. Le tout dans le but de valider les Apprentissages Critiques (AC) suivants : 

- AC 23.02 | Définir une iconographie (illustrations, photographies, vidéos)
- AC 23.03 | Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs
- AC 23.04 | Imaginer, écrire et scénariser en vue d'une communication multimédia ou transmédia
- AC 23.06 | Elaborer et produire des animations, des designs sonores, des effets spéciaux, de la visualisation de données ou de la 3D

Vous ne partirez pas d'une base vide mais d'un petit jeu de plate-forme possédant déjà quelques mécaniques de jeu, et bien évidemment des assets que vous pourrez utiliser pour cette SAE. Pensez donc bien à observer le code / le projet fournit pour travailler dans de bonnes conditions. Ce projet unity contient deux scènes :
- Un niveau qui devra faire office de premier niveau
- Une scène dite de bootstrap, elle sert, dans les grandes lignes, à précharger les éléments communs à toutes les scènes, par exemple, la gestion du son
    - Plus d'explications sur la scène de bootstrap

## Liste des choses impératives à faire. **Vous devez toutes les faire**
- Un écran d'accueil (écran qui permet de commencer le jeu)
    - L'écran doit contenir le logo de l'université
- Ajouter un nouveau niveau (décors, ennemis et mécaniques compris)
    - Vous pouvez utiliser le thème que vous souhaitez pour la décoration. Vous pouvez donc importer de nouvelles tilemaps ou même utiliser celles déjà présentes dans le projet
    - Pensez bien à créer la condition pour aller au niveau suivant
        - Exemple : Une zone de trigger
- Ajouter un écran des crédits (voir plus bas pour son contenu)
- Afficher un menu de pause
    - Il est déjà possible de mettre le jeu en pause en appuyant sur la touche "Echap"
    - La gestion du menu pause est faites grâce à un ScriptableObject (`Assets/Scripts/ScriptableObjects/Events/OnTogglePauseEventSO`)
    - Libre à vous d'ajouter d'autres options dans le menu de pause comme relancer le jeu ou encore retourner au menu principal
- Créer **une** props de votre choix (ennemi, panneau...) et l'intégrer dans le jeu
    - Pas besoin que votre props colle avec la DA du jeu
    - Ce n'est pas du grand art qui est attendu. Si nous n'êtes pas à l'aise avec le dessin, un simple panneau est suffisant
    - Vous pouvez utiliser le logiciel gratuit [LibreSprite](https://libresprite.github.io/#!/) pour réaliser votre création
- Expliquer comment le jeu fonctionne (les contrôles, mécaniques...)
    - Vous pouvez faire un niveau de didacticiel ou encore menu dédié
        - Il y a un sprite avec les différents contrôles et boutons
- Ajouter une fonctionnalité de votre choix - Les possibilités sont infinies : chronomètre, boss...
    > N'oubliez pas, c'est votre jeu. Faites preuve d'imagination, ce projet est être un très beau moyen de valoriser vos CV. Ne vous limitez pas parce que c'est un devoir. Tentez des choses, l'école est l'occasion de tenter des trucs en sécurité
- Système de santé du joueur

## Liste des choses à faire au choix. Vous devez au moins en faire une
- Afficher un écran de fin de partie (Game Over)
    - A vous de décider les conditions qui conduisent à la fin de la partie
- Mort du personnage + écran de game over
- Ajouter une musique. Vous pourrez en trouver sur ces sites :
    - http://dig.ccmixter.org/games
    - https://www.playonloop.com/royalty-free-music/video-game-chiptune-music/
    - https://github.com/OpenSourceMusic
    - https://opengameart.org/
- Un système de score
    - A vous de définir les règles de bonus / malus de score
- Des bruitages lors d'actions (sauts, tir...)
    - Pourquoi pas ne pas réaliser vous-même ces bruitages

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
