# Programme cours Unity

- Raccourcis :
  - F : Focus sur un gameobject sur la scène
    - Shift + F : Suivi de focus

- Présentation de l'interface
  - Edit > Preferences > Playmode tint
  - Scene
  - Project settings > Player > Other Settings >Active Input Handling
  - Supprimer "Input System"
- Scènes
- GameObject
  - Base de tout projet
  - Sert de dossier virtuel
  - Tout est gameobject
- SpriteRenderer :
    - Pixel Per Unit : combien de pixels dans l'image valent une unité dans la scène
- Collision / Rigidbody
    - Rigidbody and a Collider
        - static : mur, élément qui ne bouge pas
        - kinematic : peut bouger tout seul mais ne pas être déplacé par un tiers / gravité. Plateformes mouvante. N'est pas soumis à la gravité, ignore les forces appliquées
        - dynamic : soumis à la gravité, affecté par le mouvement des autres
    - Un des GO doit avoir un rigidbody pour détecter une collision
- Script :
  - Système de mouvements (déplacements)
  - Santé
  - Camera
  - Composant : Entity Component System
- Zone de trigger / Ennemis

## Partie 2
- Prefab
- Tilemap : Rotation avec [ et ] - https://docs.unity3d.com/Manual/Tilemap-Painting.html
- Animations
    - has exit time : permet de définir le pourcentage de progression d'une animation
    - transition duration : permet de passer d'une anim à l'autre à partir de quel pourcentage
    - From Any State -> other state :
        - laisser has exit time
        - exit time = 1
        - transition duration = 0
        - laisser fixed duration
    - Ne pas animer dans le canvas
- Canvas / Menu Pause (Montrer les animations qui ne sont pas soumises à l'échelle du temps)
    - Render mode :
        - Overlay : Affiche en haut de l'écran
        - Camera : affecté par la caméra
    - Canvas scaler -> Scale with screen size. Pour adapter le canvas à l'écran. Ne pas oublier de mettre une référence
    https://unity.com/how-to/unity-ui-optimization-tips
    - Remove Graphic Raycasters from non-interactive UI Canvases and turn off the Raycast Target for static or non-interactive elements.

- GameObject
    - SpriteRenderer :
        - Pixel Per Unit : combien de pixels dans l'image valent une unité dans la scène
- Collision / Rigidbody
    - Rigidbody and a Collider
        - static : mur, élément qui ne bouge pas
        - kinematic : peut bouger tout seul mais ne pas être déplacé par un tiers. Plateformes. N'est pas soumis à la gravité, ignore les forces appliquées
        - dynamic : soumis à la gravité, affecté par le mouvement des autres
    - Un des GO doit avoir un rigidbody pour détecter une collision
    - Constraints : Freeze Rotation Z
    - Continuous Collision Detection
- Script : Système de mouvement (déplacements)
- Inputs (Saut et autres actions)
- Camera
  - LateUpdate()
- Zone de trigger / Ennemis
- Prefab
- Scripts : système de vie
- Scènes
- Events / ScriptableObjects (Montrer la mauvaise façon avec les singletons)
    - Création de prise de données dans la mémoire
- Canvas / Menu Pause (Montrer les animations qui ne sont pas soumises à l'échelle du temps)
- Sprite
- Tilemap : Rotation avec [ et ] - https://docs.unity3d.com/Manual/Tilemap-Painting.html
- Animations
    - has exit time : Désactivé permet de passer d'une animation à l'autre instantanément
    - transition duration : permet de passer d'une anim à l'autre à partir de quel pourcentage. Metre à 0 en 2D
    - From Any State -> other state :
        - laisser has exit time
        - exit time = 1
        - transition duration = 0
        - laisser fixed duration
    - Ne pas animer dans le canvas
    - Solo : Utile pour le débug, permet de lancer solo une animation omettant les autres
- Ecran de crédits
- Player Prefs
- Sound design

Canvas :
    - Render mode :
        - Overlay : Affiche en haut de l'écran
        - Camera : affecté par la caméra
    - Canvas scaler -> Scale with screen size. Pour adapter le canvas à l'écran. Ne pas oublier de mettre une référence
    https://unity.com/how-to/unity-ui-optimization-tips
    - Remove Graphic Raycasters from non-interactive UI Canvases and turn off the Raycast Target for static or non-interactive elements.
