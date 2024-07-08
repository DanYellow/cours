# Pour aller plus loin - tâches optionnelles 
### A faire après avoir effectué toutes les tâches obligatoires du fichier [README.md](./README.md)

- [ ] Permettre la recherche d'auteurs au lieu d'une liste déroulante. Cette fonctionnalité peut être réalisée avec la balise &lt;datalist> ou un plugin comme TomSelect (pas installé et à préférer)
    - [Voir page npm de TomSelect](https://www.npmjs.com/package/tom-select)
    - Pour le cas de la SAÉ, vous n'avez pas besoin d'aller dans les méandres de TomSelect, l'exemple de base, avec un peu de modifications, fera l'affaire
- [ ] Modifier le modèle "Article" de façon à en permettre le "like"/"dislike"
  - **Ne pas oublier de créer des requêtes permettant ceci**
- [ ] Ajouter un nouveau modèle permettant de gérer les vidéos du site (page "sur les medias")
  - Il faudra également faire les requêtes, les modèles Mongoose ainsi que les formulaires dans l'administration
- [ ] Pour les listes (articles, saés et auteurs), ajouter une nouvelle action pour permettre à l'utilisateur d'accéder à l'équivalent côté frontend
- [ ] Proposer un système de suppression multiple d'éléments sur une liste via un système de cases à cocher
- [ ] Retirer la limite de taille d'upload des fichiers (gérée dans le fichier `database/validator.js`) et réduire la taille des images côté serveur
  - Vous pouvez utiliser un module comme [sharp](https://www.npmjs.com/package/sharp) pour réaliser cette tâche. Il existe de nombreuses sources en ligne pour coupler sharp avec multer, outil déjà utilisé pour l'upload
- [ ] Mettre en place des tests e2e avec Cypress
- [ ] Ajouter un système de connexion à l'administration
- [ ] Permettre l'activation / désactivation d'un article depuis la liste des articles
- [ ] Permettre d'activer / désactiver une SAE
  -  Il faudra mettre à jour l'API des SAE pour afficher que les SAE activées sur le site
  - Il faudra modifier le modèle de la SAE pour gérer l'activation / désactivation
- [ ] Système de recherche (administration et/ou site but)
  - Il faudra mettre à jour les API pour gérér les paramètres de recherche
  - Pensez également à modifier l'URL pour pouvoir rejouer la recherche
- [ ] Permettre d'ordonner des champs autres que la date de création dans l'administration
- [ ] Proposer la mise en place d'images responsives
- [ ] Utiliser un éditeur de texte riche pour le corps d'un article
- [Vous pouvez dans cette liste un ensemble de plugin javascript d'éditeur riches](https://github.com/JefMari/awesome-wysiwyg-editors)
- [ ] Proposer un système de thème au niveau des couleurs dans l'administration. Présentement tout tourne autour du bleu, proposez un moyen de changer la couleur pour chaque utilisateur
  - Vous ne devez pas utiliser une base de données pour stocker la valeur
  - Pour rendre les choses les plus simples possibles, vous ne proposerez que les [couleurs listées par tailwind](https://tailwindcss.com/docs/customizing-colors)
  - Changer la valeur de la balise [meta "theme-color"](https://developer.mozilla.org/fr/docs/Web/HTML/Element/meta/name/theme-color) en fonction du background-color de l'écran

