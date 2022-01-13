# En route vers la SAÉ 203 - Site web et Base de données (BDD) 

Dans le but de mieux vous préparer à la SAÉ 203 - Site web et Base de données (BDD), vous allez devoir travailler de façon **individuelle** sur un devoir **noté** fleuve. A partir du code donné, vous allez devoir compléter le site de façon à ce qu'il ressemble au projet Adobe XD mais surtout l'agrémenter des fonctionnalités vues en cours aussi bien en Intégration Web (HTML/CSS/JS) que Développement Web (PHP/MySQL) tout au long du semestre. Vu que vous partez d'un code fourni, pensez bien à le regarder (console du navigateur notamment), faire des tests avant de vous lancer à corps perdu dans le développement.

<iframe width="1920" height="1080" src="https://xd.adobe.com/embed/1e0c8482-b0f1-4dd2-b161-4ceb9128896b-4b5f/" frameborder="0" allowfullscreen></iframe>

- [Accéder au projet Adobe XD](https://xd.adobe.com/view/1e0c8482-b0f1-4dd2-b161-4ceb9128896b-4b5f/)


Ainsi, vous ne serez pas forcément apte dès le début du semestre à faire le site, toutefois au fur et à mesure des cours vous verrez de nouvelles fonctionnalités qui vous permettront d'avancer sur le site. Vous verrez donc durant ce semestre :

## Notions
### Integration Web
- Positionnement
- CSS Transform
- CSS Transition
- Iconfonts
- Langage de programmation javascript (initiation)

### Développement Web
- MySQL
- Sessions PHP
- PHP

Bien évidemment les notions vues durant le semestre précédent vous seront plus qu'utiles pour réaliser ce devoir. N'attendez pas le dernier moment pour le faire, **essayez d'ajouter les fonctionnalités au fur et à mesure des cours,** ça devrait être plus simple les notions étant encore fraîches dans votre tête.

Notez également que certaines données (descriptions, contenu du menu...) seront gérées via la base de données MySQL, inutile donc d'écrire tous les textes à la main.

## CSS Transform & CSS Transition
Les transitions mises sont là en guise d'exemple, libre à vous de reproduire les mêmes ou en inventer de nouvelles. Mais votre projet doit contenu des CSS transition ou des CSS transform.
N'oubliez pas de créer une cohérence dans vos animations : n'allez pas faire une animation qui dure 5 secondes à un endroit et à un autre une animation qui en dure 1, surtout sur les deux éléments se ressemblent

# Images
Les images sont distantes, ça sera à vous de reconstruire leur URL à partir du domaine et de la base de données. Vous ne devez pas les télécharger.

# Base de données
La catégorie "cakes" est volontairement vide, il faudra utiliser pour elle le template de la page vide, celle qui propose à l'internaute d'être notifié quand il y aura des produits.

# Astuces
- Vous ne pouvez pas être pixel perfect. N'essayez pas d'être iso avec la maquette, le moteur de rendu de votre navigateur et d'Adobe XD sont différents, des différences **mineures** appraîtront, c'est normal
- Nous vous avons fourni une base de données à remplir et remplie. Premier réflexe : l'importer dans phpMyAdmin 
- Inutile d'aller modifier le code CSS fourni, créer vos propres fichier pour limiter les effets de bords et alter le code CSS fourni
- Evitez de copier tout le code CSS fourni par Adobe XD, ça peut être tentant, mais il est malheureusement de très mauvaise qualité. Vous pouvez récupérer les propriétés CSS suivantes :
  - font-size
  - width (dans une moindre mesure)
  - height (dans une moindre mesure)
  - les couleurs
- Pensez bien à lire les notes présentes sur la maquette Adobe

# Rendus attendus
- Une archive nommée nom-prénom contenant l'ensemble des fichiers permettant le bon fonctionnement de votre site :
  - Base de données (fichier .sql)
  - HTML/PHP/CSS/javascript
- URL du site en ligne (facultatif). Attention, la mise en ligne du site nécessite également la mise en ligne de la base de données

Votre rendu devra être mis sur Moodle avant la date butoir, cette date sera donnée ultérieurement.

# Notation

### Integration Web
- Qualité du code
  - Pas de classes au nom étrange
  - Limitation du nombre de classes CSS 
  - Réutilisation des classes CSS
    - N'oubliez pas qu'une balise peut avoir plusieurs divs
  - Organisation du code
    - Utiliser la structure déjà présente peut vous aider
  - Sémantique HTML :
    - Toute utilisation inappropriée de la balise &lt;br> sera sanctionnée
    - Toute utilisation de l'unité px pour la propriété font-size sera sanctionnée, il faut utiliser l'unité rem
- Accessibilité
  - &lt;img> avec attribut "alt" même vide
  - Valeur de la balise &lt;title> qui change pour chaque page avec la valeur appropriée
  - Fichier(s) javascript sont chargés avant la fermeture de la balise &lt;body>
  - [Voir plus de normes d'accessibilité](https://www.accede-web.com/notices/html-et-css/)
- Présence des fonctionnalités / qualité de l'intégration (voir Adobe XD - lien plus haut -)

### Développement Web (PHP/MySQL)
- Qualité du code
  - Utilisation de la fonction include() pour réutiliser des parties de html entre les pages
    - Une partie du code fourni nécessite d'être optimisée avec la fonction include()
  - Utilisation de fonctions (quand c'est nécessaire)
  - Lecture et écriture en base
# Pour aller plus loin
Pour aller plus loin sur le projet, voici une liste (non-exhaustive) de fonctionnalités que vous pouvez rajouter pour aller plus loin, vous n'auraz pas plus de points pour autant :
- Un tunnel d'achat pour payer sa commande
  - Afficher un récaptiulatif de la commande
    - Nécessite l'utilistion de la technologie AJAX 
- Ajouter un mode sombre
  - [Voir didacticiel sur le mode sombre](https://www.jannaud.fr/guide-pour-passer-facilement-son-site-web-en-mode-sombre-dark-mode-css)
  - C'est à vous de faire le design
- Indiquer les éléments déjà dans le panier dans la page détails
- Afficher une notification à chaque fois qu'on rajoute un élément au panier
  - Indiquer également si on dépasse 100 -> bloquer l'ajout 