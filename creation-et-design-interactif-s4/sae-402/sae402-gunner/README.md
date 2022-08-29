# SAE 402- Création d'un jeu vidéo
_Les consignes pourront être modifiées._

Dans le cadre du cours de création et design interatif, nous avons pu découvrir le logiciel Unity, il permet de faire des jeux vidéo de toutes sortes. Le but de cette SAE sera donc de renforcer vos connaissances et découvrir de nouvelles connaissances vis-à-vis de l'outil. Le tout dans le but de valider les Apprendtissage Critiques (AC) suivants : 

- AC 23.02 | Définir une iconographie (illustrations, photographies, vidéos)
- AC 23.03 | Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs
- AC 23.04 | Imaginer, écrire et scénariser en vue d'une communication multimédia ou transmédia
- AC 23.06 | Elaborer et produire des animations, des designs sonores, des effets spéciaux, de la visualisation de données ou de la 3D

## Liste des choses impératives à faire. Vous devez toutes les faire
- Ajouter un nouveau niveau (décors et mécaniques compris)
    - Vous pouvez utiliser le thème que vous souhaitez pour la décoration. Vous pouvez donc importer de nouvelles tilemps ou même utiliser celles déjà présentes dans le projet
- Ajouter un écran où sont crédités tous les assets utilisés (voir plus bas pour les auteurs des assets utilisés)
 - Vous pouvez utiliser des choses non libres de droits, mais évitez si possible
- Donner la possibilité au joueur de sauter (déplacement du sprite + animation)
    - Il existe plusieurs tutoriels en ligne pour le faire. Voici une petite liste (non exhaustive) :
        - https://gamedevbeginner.com/how-to-jump-in-unity-with-or-without-physics - anglais
        - https://www.youtube.com/watch?v=fE3agO5xfFw - français. La démonstration a lieu vers 28:00
> Pour la gestion de l'animation du saut, le sprite associé a déjà été implémenté et découpé. Il faudra donc créer l'animation et définir sa condition dans l'animator. Après quelques tests "850" semble être une bonne valeur pour la gravité.
> Le saut ne doit être utilisable que si et seulement si le joueur a débloqué la capacité. Il faudra donc jouer sur la classe "PlayerListSkills". Vous pourrez trouver un exemple d'utilisation dans le fichier `Assets/Scripts/Player/` 
- Donner la possibilité au joueur de mettre en pause le jeu (et bien évidemment le relancer)
    - Libre à vous d'ajouter d'autres options dans le menu de pause comme relancer le jeu ou encore afficher des crédits
- Ajouter une musique. Vous pourrez en trouver sur ces sites :
    - http://dig.ccmixter.org/games
    - https://www.playonloop.com/royalty-free-music/video-game-chiptune-music/
    - https://github.com/OpenSourceMusic

## Liste des choses à faire au choix. Vous devez au moins en faire une (+ le dernier point de la liste)
- Gestion des munitions (pensez bien à afficher le nombre de munitions restantes)
    - Vous pouvez également gérer la récupération de munitions
- Temps imparti pour terminer le niveau avec les mécaniques associées (mort du personnage, game over)
- Mort du personnage

- Ajouter un nouveau skill "Tir automatique". Pour ce faire, vous devrez :
    - Ajouter un nouveau scriptable object et son sprite associé. Vous pouvez utiliser le fichier `Assets/Arts/Misc/Power-ups.psd` pour vous aider à faire un nouveau icône
    - Ajouter ce nouveau powerup dans l'enum SkillType dans le fichier `Assets/Scripts/Player/PlayerShoot.cs`
    - Ajouter le powerup dans la scene (via le script `Assets/Scripts/Misc/PowerUp.cs`)
    - Gérer le tout dans `Assets/Scripts/PlayerShoot.cs`
- Un écran d'accueil où l'on peut commencer le jeu
- Ajouter une fonctionnalité de votre choix - Les possibilités sont infinies :
    > N'oubliez pas, c'est votre jeu. Faites preuve d'imagination, il pourra être un très beau moyen de valoriser vos CV. Ne vous limitez pas parce que c'est un devoir. tentez des choses, l'école est l'occasion de tenter des trucs en sécurité

### Liste des personnes à créditer (pas utile de mettre le lien)
> Mettez juste le pseudo de la personne + le site où vous avez trouvez la ressource.
- https://szadiart.itch.io/pixel-fantasy-caves
- https://secrethideout.itch.io/team-wars-platformer-battle
- https://oco.itch.io/medieval-fantasy-character-pack
- https://pixelplant.itch.io/chicken-sprite-sheet

### Ressources graphiques utilisables, source non exhaustives
- https://www.kenney.nl/assets
- https://ansimuz.itch.io/magic-cliffs-environment (le site itch.io propose plein de ressources)

###
- http://madwomb.com/tutorials/GameDesign_Unity2DTilemap.html

