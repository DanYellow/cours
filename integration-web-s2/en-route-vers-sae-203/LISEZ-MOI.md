# En route vers la SAÉ 203 - Site web et Base de données (BDD)

Dans le but de mieux vous préparer à la SAÉ 203 - Site web et Base de données (BDD), vous allez devoir travailler de façon **individuelle** sur un devoir **noté** fleuve. A partir du code donné, vous allez devoir compléter le site de façon à ce qu'il ressemble au projet Adobe XD (voir lien plus bas) mais surtout l'agrémenter des fonctionnalités vues tout au long du semestre en cours aussi bien en Intégration Web (HTML/CSS/JS) que Développement Web (PHP/MySQL). 

Vu que vous partez d'un code fourni, pensez bien à le regarder (console du navigateur notamment), faire des tests avant de vous lancer à corps perdu dans le développement. Par ailleurs, **vous ne devez en aucun cas modifier les fichier CSS fournis,** c'est à vous de rajouter de nouveaux fichiers CSS pour compléter l'intégration. Vous pouvez en revanche copier un sélecteur CSS présent dans le code de base pour le surcharger si besoin est **dans vos propres fichiers.**

- [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/1e0c8482-b0f1-4dd2-b161-4ceb9128896b-4b5f/)

Ainsi, vous ne serez pas forcément apte dès le début du semestre à faire le site, toutefois au fur et à mesure des cours vous verrez de nouvelles fonctionnalités qui vous permettront d'avancer sur le site. Vous verrez donc durant ce semestre :

## Notions

### Integration Web

- Positionnement
- CSS Transform
- CSS Transition
- Iconfonts
- Langage de programmation javascript (initiation)

### Développement Web

- PHP
- MySQL / Base de données

Bien évidemment les notions vues durant le semestre précédent vous seront plus qu'utiles pour réaliser ce devoir. N'attendez pas le dernier moment pour le faire, **essayez d'ajouter les fonctionnalités au fur et à mesure des cours,** ça devrait être plus simple les notions étant encore fraîches dans votre tête.

Notez également que certaines données (descriptions, contenu du menu...) seront gérées via la base de données MySQL, inutile donc d'écrire tous les textes à la main, il faudra donc les remplacer via la base de données.

## CSS Transform & CSS Transition

Les transitions dans la maquette Adobe XD sont là à titre d'exemple, libre à vous de reproduire les mêmes ou en inventer de nouvelles. Mais votre projet doit contenir des CSS transition ou des CSS transform.
N'oubliez pas de créer une cohérence dans vos animations : n'allez pas faire une animation qui dure 5 secondes à un endroit et à un autre une animation qui en dure 1, surtout sur les deux éléments se ressemblent

# Images

Les images sont distantes, ça sera à vous de reconstruire leur URL à partir du domaine et de la base de données. **Vous ne devez pas les télécharger.**

# Icônes

Les icônes sont des svg, ils ne doivent pas être au format .jpg dans votre projet. Il faudra utiliser une webfont comme vu en TP. Pour rappel, votre police d'écriture est générée grâce au site [icomoon.io](https://icomoon.io/).

# Base de données

![](schema-db.jpg "Schéma de la base de données")
<p style="text-align: center">Schéma de la base de données</p>

La catégorie "cakes" est volontairement vide, il faudra utiliser pour la page associée à cette catégorie le template de la page vide, celle qui propose à l'internaute d'être notifié quand il y aura des produits.

La base de données doit être utilisée pour les parties suivantes :
- Les catégories du menu
  - Le menu avec les images peut rester comme il est
- Le contenu des popups
- Le détail d'une catégorie

# Astuces

- A la racine du projet, il y a un fichier nommé "squelette.php". A chaque nouvelle page que vous aller créer, **copiez et renommez le fichier.** Ce fichier possède une base saine pour créer une nouvelle page
  - Évitez de nommer vos fichiers index2, index3..., nommer ses fichiers, c'est comme les classes, ça doit être explicite
- Vous ne pouvez pas être pixel perfect. N'essayez pas d'être iso avec la maquette, le moteur de rendu de votre navigateur et d'Adobe XD sont différents, des différences **mineures** appraîtront, c'est normal
- Nous vous avons fourni une base de données à remplir et remplie. Premier réflexe : l'importer dans phpMyAdmin
- Votre code HTML se répète à travers les pages (ou même la même page) ? Pensez à la fonction php include
- Inutile d'aller modifier le code CSS fourni, créer vos propres fichiers CSS pour limiter les effets de bords et altérer le code CSS fourni
- Evitez de copier tout le code CSS fourni par Adobe XD, ça peut être tentant, mais il est malheureusement de très mauvaise qualité et va vous poser plus de problèmes qu'autres choses. Vous pouvez récupérer les propriétés CSS suivantes :
  - font-size
  - width (dans une moindre mesure)
  - height (dans une moindre mesure)
  - les couleurs
  - font-weight
- Pensez bien à lire les notes présentes sur la maquette Adobe, elles peuvent apporter des éclaircissements. Par ailleurs, assurez-vous bien que le commentaire est bien associé à la page en question

# Rendus attendus

- Une archive nommée nom-prénom contenant l'ensemble des fichiers permettant le bon fonctionnement de votre site :
  - Base de données (fichier .sql)
  - HTML/PHP/CSS/javascript...
- URL du site en ligne **(facultatif).** Attention, la mise en ligne du site nécessite également la mise en ligne de la base de données

Votre rendu devra être mis sur Moodle avant la date butoir, cette date sera donnée ultérieurement.


# Notation
Les critères suivants seront évalués 
### Intégration Web (HTML/CSS/javascript)

- Qualité du code
  - Pas de classes au nom étrange
  - Limitation du nombre de classes CSS
  - Réutilisation des classes CSS
    - N'oubliez pas qu'une balise peut avoir plusieurs classes CSS
  - Organisation du code
    - Utiliser la structure déjà présente peut vous aider
  - Sémantique HTML :
    - Toute utilisation inappropriée de la balise &lt;br> sera sanctionnée
    
- Accessibilité
  - &lt;img> avec attribut "alt" même vide
  - Valeur de la balise &lt;title> qui change pour chaque page avec la valeur appropriée
  - Fichier(s) javascript sont chargés **avant** la fermeture de la balise &lt;body>
  - [Voir plus de normes d'accessibilité](https://www.accede-web.com/notices/html-et-css/)
  - Unité des police d'écriture en rem
    - Toute utilisation de l'unité px pour la propriété font-size sera sanctionnée, il faut utiliser l'unité rem
      - Il faut diviser la valeur par 16 pour obtenir la font-size en rem
- Présence des fonctionnalités / qualité de l'intégration (voir Adobe XD - lien plus haut -)

### Développement Web (PHP/MySQL)

- Qualité du code
  - Utilisation de la fonction include()
    - Une partie du code fourni nécessite d'être optimisée avec la fonction include()
  - Utilisation de fonctions (quand c'est nécessaire)
  - Lecture et écriture de la base de données
  - Utilisation des paramètres d'url
    - Pour changer le contenu de la page "details.php", Vous ne devez en aucun cas créer une page php pour chaque catégorie 


# Votre liste à faire
- [x] Lire les consignes
- [ ] Importer et connecter la base de données
- [ ] S'approprier le code, bien le regarder (HTML et CSS), faire des tests
- [ ] Continuer l'intégration, la rendre le plus fidèle possible à la maquette
  - [ ] Mettre un état actif pour la page courante
  - [ ] Générer ma webfont pour les icônes 
- [ ] Respecter les normes d'accessibilité web (liste non exhaustive)
  - [ ] Mes images possèdent un attribut "alt"
  - [ ] L'unité de la propriété "font-size" est rem
  - [ ] Je n'utilise pas de balises &lt;br> de façon inappropriée
- [ ] Rajouter un favicon (image au choix)
- [ ] Toutes mes pages sont accessibles, je n'ai pas d'erreur 404 (page non trouvée)
- [ ] Rendre le projet
  - [ ] **Exporter la base de données**
  - [ ] Créer une archive avec votre nom-prénom qui contient :
    - [ ] Le code
    - [ ] La base de données
  - [ ] Nommer l'archive avec mon nom-prénom

# Pour aller plus loin

Pour aller plus loin sur le projet, voici une liste (non-exhaustive) de fonctionnalités que vous pouvez rajouter pour aller plus loin, vous n'aurez pas plus de points pour autant :

- Ajouter un mode sombre
  - [Voir didacticiel sur le mode sombre](https://www.jannaud.fr/guide-pour-passer-facilement-son-site-web-en-mode-sombre-dark-mode-css)
  - C'est à vous de faire le design
- Indiquer les éléments déjà dans le panier dans la page détails
  - Vous pouvez utiliser une icône pour l'indiquer par exemple
  - Vous pouvez stocker les éléments dans le panier dans le localStorage
- Afficher une notification à chaque fois qu'on rajoute un élément au panier
  - Indiquer également si on dépasse 100 -> bloquer l'ajout
- Gérer une page 404, autrement dit afficher une page spécifique si l'utilisateur essaye d'accéder à une page qui n'existe pas.
- Écrire votre **CSS** en SCSS ou SASS
  - Cette partie de ce tutoriel sera amplement suffisante
    - [Tutoriel SASS/SCSS](https://openclassrooms.com/fr/courses/6106181-simplifiez-vous-le-css-avec-sass/6596483-decouvrez-sass-et-sa-syntaxe)
  - [La documentation en anglais](https://sass-lang.com/guide)
  - Il vous faudra un outil pour compiler le SCSS/SASS en CSS
    - [En ligne (je déconseille)](https://jsonformatter.org/scss-to-css)
    - [Avec un plugin VS Code (préférable)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)
- Ajouter des plugins **pertinents** en javascript
