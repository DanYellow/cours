# Pour aller plus loin

Pour aller plus loin sur cette SAE, voici une liste (non-exhaustive et non-ordonnée) de fonctionnalités que vous pouvez rajouter, **vous n'aurez pas plus de points pour autant,** mais vous acquerrez de nouvelles connaissances, elles vous permettront de valoriser votre CV pour vos stages, alternances et emplois futurs :

- Gérer via la base de données, la liste des SAÉ, celles affichées sur la page "a propos". Pour ce faire, il faudra :
  - Ajouter une nouvelle table et ses champs
  - Ajouter la maintenance de cette nouvelle table dans l'administration pour pouvoir ajouter ces SAÉ
- Gérer une page 404, autrement dit afficher une page spécifique si l'utilisateur essaye d'accéder à une page qui n'existe pas
  - Il vous faudra un fichier .htaccess, vous trouverez comment faire sur le web
- Mettre un système de pagination pour les articles de la page d'accueil. Il vous faudra :
  - Limiter le nombre d'entrées par requêtes SQL avec le mot-clé `LIMIT`
  - Définir le décalage dans la requêtes avec le mot-clé `OFFSET`
- (Ré)Écrire **votre CSS** en SCSS ou SASS
  - Cette partie de ce tutoriel sera amplement suffisant 
    - [Tutoriel SASS/SCSS](https://openclassrooms.com/fr/courses/6106181-simplifiez-vous-le-css-avec-sass/6596483-decouvrez-sass-et-sa-syntaxe)
  - [La documentation en anglais](https://sass-lang.com/guide)
  - Il vous faudra un outil pour compiler le SCSS/SASS en CSS
    - [En ligne (déconseillé)](https://jsonformatter.org/scss-to-css)
    - [Avec un plugin VS Code (préférable)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)
- Utiliser le langage de programmation javascript. Son utilisation peut être faite via des plugins
  - [Voir cours sur le javascript](https://raw.githubusercontent.com/DanYellow/cours/main/integration-web-s2/travaux-pratiques/numero-5/presentation.pdf)
- Ajouter une interaction sur la bannière erreur lors de la soumission du message, pour permettre, au clic sur la bannière, d'atteindre le premier champ en erreur :
  - Ceci peut être géré via une combinaison de PHP et d'ancres de lien
- Utiliser une Regex ou filtre (côté PHP) pour s'assurer que l'adresse e-mail est valide respectant bien le format `nom@domaine.ext`
- Permettre, à partir d'un article, d'accéder à la page de l'auteur de l'article
  - Cette page auteur contiendra également la liste de tous les articles écrits par l'auteur et il vous faudra faire le design
- Notifier l'utilisateur après création ou édition d'un élément dans le backoffice
- Donner la possibilité de supprimer un message ou article
  - Il faudra utiliser la requête `DELETE FROM ... WHERE`
- Gérer avec une base de données la liste des SAE présentes sur la page "a propos"
- Les champs en erreur sont **clairement** indiqués après soumission du formulaire
    - Note : Les attributs "required" doivent être supprimés
    - A vous de gérer le design, n'hésitez pas à prendre de l'inspiration sur le web
    - La bannière originale doit rester
- Améliorer le code de l'administration de façon à ce que l'édition et la création d'une entité soient faits sur la même page. Le contenu de la page doit donc s'adapter dépendamment qu'on fasse une édition ou une création d'entité

> C'est votre projet, n'hésitez pas à vous concerter pour penser, ajouter de nouvelles fonctionnalités