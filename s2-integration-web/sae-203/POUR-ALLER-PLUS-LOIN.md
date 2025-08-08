# Pour aller plus loin

Pour aller plus loin sur cette SAE, voici une liste (non-exhaustive et non-ordonnée) de fonctionnalités que vous pouvez rajouter, **vous n'aurez pas plus de points pour autant,** mais vous acquerrez de nouvelles connaissances, elles vous permettront de valoriser votre CV pour vos stages, alternances et emplois futurs :

- Implémenter [l'API view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition) entre les articles sur la page d'accueil et leur détails. Pou vous aider, voici une liste de didacticiels sur le sujet (certains sont en anglais) :
  - [https://daverupert.com/2023/05/getting-started-view-transitions/](https://daverupert.com/2023/05/getting-started-view-transitions/)
  - [https://www.julienpradet.fr/tutoriels/view-transitions/](https://www.julienpradet.fr/tutoriels/view-transitions/)
  - [https://css-tricks.com/toe-dipping-into-view-transitions/](https://css-tricks.com/toe-dipping-into-view-transitions/)
  - [https://developer.chrome.com/docs/web-platform/view-transitions/cross-document?hl=fr](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document?hl=fr)
  > Note : view-transition est déjà utilisé dans l'administration
- Gérer via la base de données, la liste des SAÉ, celles affichées sur la page "a propos". Pour ce faire, il faudra :
  - Ajouter une nouvelle table et ses champs
  - Ajouter la maintenance de cette nouvelle table dans l'administration pour pouvoir ajouter/éditer ces SAÉ
- Gérer une page 404, autrement dit afficher une page spécifique si l'utilisateur essaye d'accéder à une page qui n'existe pas
  - Il vous faudra un fichier .htaccess, vous trouverez comment faire sur le web
- Mettre un système de pagination pour les articles de la page d'accueil. Il vous faudra :
  - Limiter le nombre d'entrées par requêtes SQL avec le mot-clé `LIMIT`
  - Définir le décalage dans la requêtes avec le mot-clé `OFFSET`
  - Il y a des didactiels en ligne concernant cette fonctionnalité
- (Ré)Écrire **votre CSS** avec le CSS nesting
  - [Voir documentation du CSS nesting - anglais](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting)
  - Une partie du code utilise déjà le CSS nesting
- Ajouter une interaction sur la bannière erreur lors de la soumission du message, pour permettre, au clic sur la bannière, d'atteindre le premier champ en erreur :
  - Ceci peut être géré via une combinaison de PHP et d'ancres de lien
- Utiliser une Regex ou filtre (côté PHP) pour s'assurer que l'adresse du compte twitter est valide respectant bien le format `https://www.twitter.com/nom_du_compte`
- Permettre, à partir d'un article, d'accéder à la page de l'auteur de l'article
  - Cette page auteur contiendra également la liste de tous les articles écrits par l'auteur et il vous faudra faire le design
- Notifier l'utilisateur après création ou édition d'un élément dans le backoffice
  - Afficher un message indiquant que tout s'est bien passé
- Donner la possibilité de supprimer un message ou article
  - Il faudra utiliser la requête `DELETE FROM ... WHERE`
  - Note : En terme d'ergonomie, il est très mauvais de valider automatiquement une action dite "destructive", il faudra demander à l'utilisateur de valider son action
- Gérer avec une base de données la liste des SAE présentes sur la page "a propos"
- Les champs en erreur sont **clairement** indiqués avant que le formulaire envoie les données vers le serveur
    - Note : Les attributs "required" doivent être supprimés
    - A vous de gérer le design, n'hésitez pas à prendre de l'inspiration sur le web
    - La bannière originale doit rester
    - Il faudra utiliser du javascript
- Améliorer le code de l'administration de façon à ce que l'édition et la création d'une entité soient faits sur la même page. Le contenu de la page doit donc s'adapter dépendamment qu'on fasse une édition ou une création d'entité
- Afficher des pictogrammes dans l'administration. Par exemple, dans le bouton de soumission du formulaire
    - tailwindcss propose un liste d'icônes sur le [site heroicons](https://heroicons.com/). Nous vous conseillons, pour éviter de polluer le code, de mettre le code de chaque icône dans un fichier PHP pour ensuite les inclure avec la fonction PHP `include()`
- Toutes les pages qui ne sont pas dans l'administration possèdent des balises meta opengraph. Elles permettent d'afficher de façon enrichie le site lorsqu'il est partagé. [Il existe des générateurs pour ce type de balises](https://webcode.tools/open-graph-generator/website)
    - Note : Le chemin de l'image doit être un chemin absolu, pas un chemin relatif. Pour récupérer la base du chemin absolu, vous pouvez utiliser le code PHP suivant `"https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']`
    - Note 2 : Ce sont des balises &lt;meta>, elles doivent donc être dans la balise &lt;head>
    - Note 3 : Ceci ne fonctionnera pas en local, il faudra impérativement mettre le site en ligne pour pouvoir tester en partageant votre lien sur Discord ou le site [https://metatags.io/](https://metatags.io/)
    - [Accéder à la documentation des meta og - anglais](https://ogp.me/)
- Via les modifiers de tailwindcss, rendez l'administration responsive
  - [Accéder à la documentation du responsive de tailwindcss](https://tailwindcss.com/docs/responsive-design)
- Utiliser un &lt;select> personnalisé pour l'affichage des auteurs dans la création / édition d'articles
  - [Voir didacticiel du &lt;select> personnalisé](https://grafikart.fr/tutoriels/select-css-appearance-2284)
  > Note : A l'heure actuelle (04/2025), cette fonctionnalité n'est pas gérée par Safari et Firefox

> C'est votre projet, n'hésitez pas à vous concerter pour penser, ajouter de nouvelles fonctionnalités
