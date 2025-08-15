# Pour aller plus loin

Pour aller plus loin sur cette SAE, voici une liste (non-exhaustive et non-ordonnée) de fonctionnalités que vous pouvez rajouter, **vous n'aurez pas plus de points pour autant,** mais vous acquerrez de nouvelles connaissances, elles vous permettront de valoriser votre CV pour vos stages, alternances et emplois futurs :

- Ajouter un mode sombre
  - [Voir didacticiel sur le mode sombre](https://www.alsacreations.com/article/lire/1927-Les-modes-d-apparence-Light-mode-et-Dark-mode.html)
  - C'est à vous de faire le design. N'oubliez pas les contrastes
- Gérer les articles (page d'accueil) et la liste des SAE (page à propos) via un tableau d'objets en PHP
- Ajouter des meta opengraph sur vos pages pour afficher de façon enrichie le site lorsqu'il est partagé. [Il existe des générateurs pour ce type de balises](https://webcode.tools/open-graph-generator/website)
    - Note : Le chemin de l'image doit être un chemin absolu, pas un chemin relatif. Pour récupérer la base du chemin absolu, vous pouvez utiliser le code PHP suivant `"https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']`

> C'est votre projet, n'hésitez pas à vous concerter pour penser, ajouter de nouvelles fonctionnalités