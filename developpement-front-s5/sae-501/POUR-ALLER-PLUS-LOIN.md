# Pour aller plus loin - tâches optionnelles
### A faire après avoir effectué toutes les tâches obligatoires du fichier [README.md](./README.md#tâches-à-effectuer)

- [ ] Modifier le modèle "Article" de façon à en permettre le "like"/"dislike"
  - **Ne pas oublier de créer des requêtes permettant ceci**
- [ ] Ajouter un nouveau modèle permettant de gérer les vidéos du site (page "sur les medias")
  - Il faudra également faire les requêtes, les modèles Mongoose ainsi que les formulaires dans l'administration
- [ ] Pour les listes (articles, saés et auteurs), ajouter une nouvelle action pour permettre à l'utilisateur d'accéder à l'équivalent côté frontend
- [ ] Proposer un système de suppression multiple d'éléments sur une liste via un système de cases à cocher
- [ ] Retirer la limite de taille d'upload des fichiers (gérée dans le fichier `database/validator.js`), réduire la taille des images côté serveur et les convertir au format AVIF
  - Vous pouvez utiliser un module comme [sharp](https://www.npmjs.com/package/sharp) pour réaliser cette tâche. Il existe de nombreuses sources en ligne pour coupler sharp avec multer, outil déjà utilisé pour l'upload
- [ ] Mettre en place des tests e2e
- [ ] Ajouter un système de connexion à l'administration
  - N'allez pas faire un système de cookies avec un l'un d'entre-eux qui est un simple booléen. C'est très mauvais niveau sécurité, il faudra utiliser un token d'authentification. Le jwt est un très bon système de token sécurisé. Il existe pléthore de node_modules gérant le jwt. Pensez à prendre le module le plus populaire, pas un avec presque aucun téléchargement hebdomadaire
- [ ] Permettre d'activer / désactiver une SAE
  -  Il faudra mettre à jour
     - L'API des SAE pour afficher que les SAE activées sur le site
     - Le modèle de la SAE pour gérer l'activation / désactivation
- [ ] Système de recherche (administration et/ou site but)
  - Pensez à mettre à jour les API pour gérér les prédicats de recherche
- [ ] Permettre d'ordonner des champs autres que la date de création dans l'administration
- [ ] Proposer la mise en place d'images responsives
- [ ] Utiliser un éditeur de texte riche pour le corps d'un article
- [Vous pouvez dans cette liste un ensemble de plugins javascript d'éditeurs riches](https://github.com/JefMari/awesome-wysiwyg-editors)
- [ ] Appliquer des meta og sur toutes les pages
    - Il existe des générateurs : [https://metatags.io/](https://metatags.io/)
    - Note : **le lien des images doit être absolu**
- [ ] Rendre unique le champ "title" dans le modèle "SAE"
  - Mongoose permet l'ajout d'une clé "unique" dans un modèle. [Voir exemple](https://mongoosejs.com/docs/api/schematype.html#SchemaType.prototype.unique()).
  - Pour une question de confort, il sera préférable de mettre en place une API pour valider le champ "title" qui sera appelé lors de l'évènement "blur" sur le champ
- [ ] Gérer "proprement" les messages d'erreur
    - Présentement, certains messages d'erreurs sont dupliqués, proposez une solution plus maintenable
    - Les messages d'erreurs sont dans les dossiers "server" et "database"
- [ ] Mettre en place un système de galerie à place d'un upload d'image pour chaque entité
  - Il faudra mettre en place un nouveau modèle pour gérer les images et ayant de préférence une relation de type One-to-Many avec les entités où se trouveront ces images
  - Chaque image uploadé devra permettre d'avoir une valeur pour son attribut "alt"
- [ ] Proposer un mode sombre. Pour rappel, tailwindcss possède un modifier "dark:" pour gérer ce mode
  - [En savoir plus sur le modifier tailwind "dark:"](https://tailwindcss.com/docs/dark-mode)
- [ ] Mettre en place un linter de CSS. Stylint est le plus utilisé
  - [Accéder à la documentation de Stylint](https://github.com/stylelint/stylelint/tree/main)
- [ ] Permettre de changer le logo de l'université dans le footer
  - **Vous ne devez pas utiliser de base de données**
