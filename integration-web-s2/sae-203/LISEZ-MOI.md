# SAÉ 203 - Site web et Base de données (BDD)
_Les consignes pourront être modifiées_

CY Cergy Paris Université nous confie la réalisation d'un site web dédié au BUT Métiers du Multimédia et de l'Internet (MMI). Et pas n'importe lequel puisqu'il s'agit du site sur lequel vous avez travaillé durant la SAÉ 105 dans le but de valider les apprentissages critiques suivants : 
- AC4102 : Produire des pages Web statiques et fluides utilisant un balisage sémantique efficace
- AC4103 : Générer des pages Web ou vues à partir de données structurées incluant des interactions simples
- AC4104 : Mettre en ligne une application Web en utilisant une solution d’hébergement standard
- AC4105 : Modéliser les données et les traitements d’une application Web - AC4106 : Utiliser et adapter un modèle d’accès aux données

Comme la SAÉ 105, ceci est un projet de groupe, groupe de 4 à 5 personnes, les membres peuvent être transverses aux TD/TP de la promotion. Un chef devra encore une fois être désigné, car un seul rendu de projet est attendu sur l'ENT. 

Vous partirez de la correction du projet (dossier `"code/"`). Des petits changements ont été opérés par rapport à la maquette originale dans le code fourni.

Notez qu'il y a un dossier `"ressources/css/ne-pas-modifier"`, **merci de ne pas y toucher,** il contient le strict nécessaire pour avoir le squelette d'une page, toutefois vous pouvez copier un sélecteur CSS présent dans le code de base pour le surcharger dans vos fichiers si besoin est.

- [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/9db2b308-f3b3-40d2-9372-2b43c83a277f-c8e1/screen/b2376c6c-7c7d-4071-a7f0-e32f20ac85aa/)

Nous vous remettons le lien vers la maquette Adobe XD, toutefois vous n'en aurez pas trop besoin, en effet, votre travail sur cette SAÉ sera de développer de nouvelles pages, deux pour être exacts :
- article : lorsqu'on clique sur un article sur la **page d'accueil**, on doit accéder à son contenu. Il y a déjà un fichier `article.php`, **il doit être complété.** Un article doit contenir : 
  - Son titre
  - Son chapô + contenu (dans cet ordre)
  - Son image
  - Sa date de création
  - La date de sa dernière mise à jour
    - Ne pas afficher si la date est égale à celle de création
  - Son auteur
    - Mettre une valeur par défaut s'il n'y a pas d'auteur
  - Sa vidéo youtube. S'il y en a une
    - **Le lecteur Youtube doit s'afficher sur la page de votre site**
    - La balise contenant votre vidéo devra elle-même être contenue dans une balise ayant la classe CSS "youtube-video-conteneur". Exemple :
    ```html
    <article class="youtube-video-conteneur">
      <!-- code pour afficher la vidéo -->
    </article>
    ```
- La liste des auteurs du site 
  - L'entrée pour y accéder est déjà dans la navigation mais pas le fichier
  - Afficher pour chaque auteur : 
    - Image
    - Prénom
    - Nom
    - Lien vers le compte twitter
      - Facultif
      - Vous pouvez mettre le lien vers n'importe quel compte twitter dans la mesure du raisonnable

Pour ces deux pages, c'est à vous de réaliser le design. Il faudra prendre soin à ce qu'elles contiennent au moins :
- Le haut de page (header) (`<?php require_once('./ressources/includes/header.php'); ?>`)
- Le pied de page (footer) (`<?php require_once('./ressources/includes/footer.php'); ?>`)

La présence des bulles (`<?php require_once('./ressources/includes/bulle.php'); ?>`) est facultative dans ces deux nouvelles pages.

Notez qu'il y a été mis une classe "conteneur-1280" pour avoir un conteneur possédant une largeur de 1280px. Ainsi, si vous ajoutez une balise à l'extérieur d'une balise ayant la classe "conteneur-1280", elle occupera toute la largeur de la fenêtre. Idéal pour afficher des images en plein écran.

N'hésitez pas à appliquer ce que nous avons vu, et allons voir durant ce semestre :
- Positionnement CSS
- CSS Transform
- CSS Transition
- Pseudo-éléments ::before / ::after
- Langage de programmation javascript
- MySQL
- PHP
- ...

Vous allez devoir également réaliser le back-office du site, vous trouverez plus d'informations concernant cette partie dans la partie dédiée dans ce document.
# Base de données

Comme le nom de la SAE l'indique, elle sera l'occasion de voir les bases de données. Celle du projet ressemble à ceci :

![](schema-bdd.png "Schéma de la base de données")
<p style="text-align: center">Schéma de la base de données</p>

Cette base de données est composée de trois tables dont une relation One-to-Many. Ainsi un auteur peut avoir rédigé plusieurs articles, mais un article ne peut avoir qu'un **seul et unique auteur.** De ce fait, on retrouve dans la table "article", la clé étrangère "auteur_id", cette clef peut être nulle, un article peut donc avoir aucun auteur.

Toujours à propos de la table article, la colonne "date_creation" n'est mise à jour **que** lors de la création d'un article (`INSERT INTO`) tandis que la clef date_derniere_mise_a_jour **est mise à jour à chaque mise à jour d'un article** (`UPDATE`). Pour la gestion des dates (et donc mettre à jour ces clefs), il faudra vous inspirer de ce qui a été fait dans le fichier `contact.php`.

### Images et base de données
Dans les tables "article" et "auteur" sont gérés des images, ces dernières devront être gérées par des liens, vous n'avez pas à gérer un système d'upload. Vous devrez proposer à l'utilisateur de mettre un lien (absolu) vers l'image.

[Script SQL pour créer la base de données Mysql (cliquez sur le bouton "raw" puis faites clic droit > Enregistrer sous)](base-de-donnees.sql).

# Administration (appelé également backoffice)

Grosse partie de cette SAE, l'administration du site, accessible via l'url mon.site/administration, permettra d'ajouter des nouveaux contenus au site. Elle sera l'occasion de mettre en application les connaissances vues sur bootstrap, en base de données et javascript. Dans le dossier `/administration`, vous trouverez un gabarit de site sous bootstrap, il faudra compléter le tout de façon à avoir les pages et les fonctionnalités suivantes :
- Articles
  - Création d'article
    - On doit pouvoir associer un auteur à un article
    - Édition d'article
  - Liste d'articles
- Auteur
  - Création d'auteur
  - Édition d'auteur
  - Liste d'auteurs
- Message
  - Liste des messages reçus

Vu que vous débutez en php/mysql, la plupart des requêtes sont déjà présentes, il faudra toutefois les éditer en fonction de vos besoins. **Nous vous invitons à regarder les commentaires ainsi que le fichier REQUETES-SQL.md pour mieux comprendre ces requêtes.**

> N'hésitez pas à tester vos requêtes dans phpmyadmin

La partie "Auteur" est presque complète, et vous servira d'exemple, il faudra remplacer quelques valeurs dans les requêtes pour que les bonnes données soit enregistrées.

> En temps normal, une interface d'administration nécessite un formulaire de connexion pour éviter que n'importe qui intègre des données. Dans le cadre de cette SAÉ, nous allons omettre cette fonctionnalité.
> Toutefois si vous souhaitez le faire, allez-y.

### Redirection après soumission

Lors de vos tests, vous remarquerez qu'il ne se passe rien lorsque vous soumettrez vos formulaires du point de vue visuel. C'est normal, il manque le comportement du navigateur après la soumission (car les données ont bien été enregistrées). Deux choix s'offrent à vous : 
- Rester sur la page avec les données mises à jour
- Rediriger l'utilisateur vers une autre page

Voici le code pour les deux cas. Ce code est à mettre **après** que les données ont été enregistrées dans la base.

```php
// L'utilisateur reste sur la même page
$pageRedirection = $_SERVER['HTTP_REFERER'];
header("Location: $pageRedirection"); 
```

```php
// L'utilisateur va ailleurs
$pageRedirection = "remplacer-par-url";
header("Location: $pageRedirection"); 
```

# Javascript
Découvert durant ce semestre, cette SAÉ sera l'occasion également d'appliquer vos connaissances en javascript. Elles devront être utilisées :
- Sur la bannière sur la page contact après envoi du message. La bannière devra être disparaître via un bouton présent dans la bannière au clic sur ce bouton
- Dans le backoffice, il faudra utiliser le backoffice pour afficher en temps réel l'image associée au à un article et à un auteur. C'est l'évènement javascript `blur` qu'il faudra utiliser

# Astuces

- **Les fichiers possèdent des commentaires, ne négligez pas leur lecture**, ils sont là pour vous aider
- Vous travaillez en groupe, ayez la même structure de fichiers, ça sera plus simple après pour tout fusionner
  - **Evitez d'avoir les mêmes noms de fichiers**
- Lorsque vous devez ajouter une nouvelle page sur la partie visible. Dupliquez le fichier `squelette.php` à la racine du dossier puis renommez-le
- Lorsque vous devez ajouter une nouvelle partie à l'admnistration. Dupliquez le **dossier** "squelette" contenu dans le dossier `administration/` et renommez-le avec le nom approprié
- Regardez bien et expérimentez ce qu'on a donné avant de vous lancer dans le code, ceci évitera les erreurs
- Pour le backoffice (administration), n'allez pas réinventer la roue, bootstrap propose suffisament de composants pour l'intégrer

# Rendus attendus

- Une archive nommée nom-prénom contenant l'ensemble des fichiers permettant le bon fonctionnement de votre site :
  - Base de données (fichier .sql)
  - HTML/PHP/CSS/javascript...
  - Le fichier "rapport-ressenti.odt" pour chaque membre du groupe et dûment complété
- URL du site en ligne **(facultatif)** Attention, la mise en ligne du site nécessite également la mise en ligne de la base de données
  - Les accès de la base de données sur le serveur sont différents des vôtres en local, faites attention

Votre rendu devra être mis sur Moodle avant la date butoir, **cette date sera donnée ultérieurement.** Un seul rendu est nécessaire par groupe, celui du chef d'équipe.

# Notation
Les critères suivants seront évalués. Une ou les deux parties peuvent être amenée à être évaluée lors d'un oral.
### Intégration Web (HTML/CSS/javascript)

- Qualité du code
  - Pas de classes CSS au nom étrange
  - Réutilisation des classes CSS
    - N'oubliez pas qu'une balise peut avoir plusieurs classes CSS
  - Organisation du code
    - Utiliser la structure déjà présente peut vous aider
  - Sémantique HTML :
    - **Toute utilisation inappropriée de la balise &lt;br> sera sanctionnée**
    
- Accessibilité
  - &lt;img> avec attribut "alt" même vide
  - Valeur de la balise &lt;title> qui change pour chaque page avec la valeur appropriée
  - Fichier(s) javascript sont chargés avant la fermeture de la balise &lt;body>
  - Unité des police d'écriture en rem
    - **Toute utilisation de l'unité px pour la propriété font-size sera sanctionnée, il faut utiliser l'unité rem**
      - Conversion px -> rem : Diviser la valeur en pixels par 16 pour obtenir la valeur en rem
  - [Voir plus de normes d'accessibilité](https://www.accede-web.com/notices/html-et-css/)

### Développement Web (PHP/MySQL)

- Qualité du code
  - Utilisation de la fonction include()
    - Une partie du code fourni nécessite d'être optimisée avec la fonction include()
  - Utilisation de fonctions (quand c'est nécessaire)
  - Lecture et écriture de la base de données
  - Utilisation des paramètres d'url

# Votre liste à faire
- [x] Lire les consignes
- [ ] Importer et connecter la base de données
- [ ] S'approprier le code, bien le regarder (HTML et CSS), faire des tests
- [ ] J'ai réalisé toutes fonctionnalités :
  - [ ] Gestion de l'administration 
    - [ ] Je peux ajouter / éditer :
      - [ ] Un article / auteur
    - [ ] Je peux lister :
      - [ ] Tous les articles / auteurs / messages
    - [ ] J'ai écrit dans le fichier `ressources/includes/menu-lateral.php` la liste des membres de mon groupe
  - [ ] Page avec tous les auteurs
  - [ ] Page "article"
    - [ ] Chaque article (sur la page d'accueil) doit charger un contenu différent
- [ ] Respecter les normes d'accessibilité web (liste non exhaustive)
  - [ ] Mes images possèdent un attribut "alt"
  - [ ] L'unité de la propriété "font-size" est rem
  - [ ] Je n'utilise pas de balises &lt;br> de façon inappropriée
- [ ] Rajouter un favicon (image au choix)
- [ ] Toutes mes pages sont accessibles, je n'ai pas d'erreur 404 (page non trouvée) quand je clique sur un lien
- [ ] Rendre le projet
  - [ ] **Exporter la base de données**
    - [Voir comment exporter une base de données depuis phpmyadmin](https://kb.planethoster.com/guide/astuces-techniques/exporter-une-base-de-donnees-avec-phpmyadmin/)
  - [ ] Créer une archive avec votre nom-prénom qui contient :
    - [ ] Le code
    - [ ] La base de données
    - [ ] Le fichier "rapport-ressenti.odt" **rempli par chaque membre du groupe**
  - [ ] Nommer l'archive avec mon nom-prénom

# Pour aller plus loin

Pour aller plus loin sur le projet, voici une liste (non-exhaustive et non-ordonnée) de fonctionnalités que vous pouvez rajouter pour aller plus loin, vous n'aurez pas plus de points pour autant, mais vous acquirerez de nouvelles connaissances :

- Gérer via la base de données, la liste des SAÉ, celles affichées sur la page "a propos". Pour ce faire, il faudra :
  - Ajouter une nouvelle table et ses champs
  - Ajouter la maintenance de cette nouvelle table dans l'administration pour pouvoir ajouter ces SAÉ
- Gérer une page 404, autrement dit afficher une page spécifique si l'utilisateur essaye d'accéder à une page qui n'existe pas
  - Il vous faudra un fichier .htaccess, vous trouverez comment faire sur le web
- Mettre un système de pagination pour les articles de la page d'accueil
- Écrire **votre CSS** en SCSS ou SASS
  - Cette partie de ce tutoriel sera amplement suffisant 
    - [Tutoriel SASS/SCSS](https://openclassrooms.com/fr/courses/6106181-simplifiez-vous-le-css-avec-sass/6596483-decouvrez-sass-et-sa-syntaxe)
  - [La documentation en anglais](https://sass-lang.com/guide)
  - Il vous faudra un outil pour compiler le SCSS/SASS en CSS
    - [En ligne (déconseillé)](https://jsonformatter.org/scss-to-css)
    - [Avec un plugin VS Code (préférable)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)
- Ajouter des plugins **pertinents** en javascript
- Ajouter une interaction sur la bannière erreur lors de la soumission du message, pour permettre, au clic sur la bannière, d'atteindre le premier champ en erreur 
- Utiliser une Regex ou filtre (côté PHP) pour s'assurer que l'adresse e-mail est valide respectant bien le format `nom@domaine.ext`
- Permettre, à partir d'un article, d'accéder à la page de l'auteur de l'article
  - Cette page auteur contiendra également la liste de tous les articles écrits par l'auteur et il vous faudra faire le design
- Ajouter un "flash message" après création ou édition d'un élément dans le backoffice
  - Il faudra utiliser les sessions en php pour ce faire
- Donner la possibilité de supprimer un message ou article
  - Il faudra utiliser la requête `DELETE FROM ... WHERE`
- Gérer avec une base de données la liste des SAE présentes sur la page "a propos"
- Les champs en erreur sont **clairement** indiqués après soumission du formulaire
    - Note : Les attributs "required" doivent être supprimés
    - A vous de gérer le design, n'hésitez pas à prendre de l'inspiration sur le web
    - La bannière originale doit rester
  - Développement de la cinquième page principale
- Améliorer le code de façon à ce que l'édition et la création d'une entité soit fait sur la même page. Le contenu de la page doit donc s'adapter dépendamment qu'on fasse un édition ou une création d'entité
