# SAÉ 203 - Site web et Base de données (BDD)
_Les consignes pourront être modifiées._

> **IMPORTANT :** Votre version de PHP doit être supérieure ou égale à la version 7.0.0. **Si ce n'est pas le site ne fonctionnera pas.** Vous aurez une page blanche avec un message d'erreur. 

## Didacticiels
- [Importer une base de données dans phpmyadmin](LISEZ-MOI-IMPORT-SQL.md)
- [Mémo sur les requêtes SQL](LISEZ-MOI-REQUETES-SQL.md)
- [Travailler à plusieurs sur le même serveur php](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/PARTAGE-SERVEUR.md)
- [Travailler avec l'extension VS Code liveshare](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/LIVESHARE.md)

## Contexte de la SAÉ
CY Cergy Paris Université nous confie la réalisation d'un site web dédié au BUT Métiers du Multimédia et de l'Internet (MMI). Et pas n'importe lequel puisqu'il s'agit du site sur lequel vous avez travaillé durant la SAÉ 105 dans le but de valider les Apprentissages Critiques (AC) suivants : 

**R212 – Intégration**
- AC4102 : Produire des pages Web statiques et fluides utilisant un balisage sémantique efficace

**R213 – Développement Web**
- AC4103 : Générer des pages Web ou vues à partir de données structurées incluant des interactions simples
- AC4106 : Utiliser et adapter un modèle d’accès aux données

**R213 – Développement Web & R215 – Hébergement**
- AC4104 : Mettre en ligne une application Web en utilisant une solution d’hébergement standard

**R214 – Système d’information**
- AC4105 : Modéliser les données et les traitements d’une application Web 

Comme la SAÉ 105, ceci est un projet de groupe, groupe de 4 à 5 personnes, les membres peuvent être transverses aux TD/TP de la promotion. Toutefois, il est préférable que deux membres au minimum soient dans le même TP, ceci pour éviter qu'un membre se retrouve seul à travailler lors d'un cours. Un chef devra encore une fois être désigné, car un seul rendu de projet est attendu sur l'ENT. 

Vous partirez de la correction du projet (dossier `"code/"`). Cette correction contient près de 75% du projet final, une très grande partie du projet a été produite. Des petits changements ont été opérés par rapport à la maquette originale dans le code fourni.

Notez qu'il y a un dossier `"ressources/css/ne-pas-modifier"`, **merci de ne pas y toucher,** il contient le strict nécessaire pour avoir le squelette d'une page, toutefois vous pouvez copier un sélecteur CSS présent dans le code de base pour le surcharger dans vos fichiers si besoin est.

Notez également qu'il y a deux dossiers "ressources", un à la racine du projet et un autre dans le dossier "administration". Ainsi, si vous avez à éditer le site principal il est préférable d'éditer le dossier "ressources" à la racine du projet, si vous avez à éditer l'administration, il faudra travailler dans le dossier administration/ressources.

- [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/9db2b308-f3b3-40d2-9372-2b43c83a277f-c8e1/screen/b2376c6c-7c7d-4071-a7f0-e32f20ac85aa/)


Nous vous remettons le lien vers la maquette Adobe XD, **toutefois vous n'en aurez pas trop besoin,** en effet, votre travail sur cette SAÉ sera de développer de nouvelles pages, dont le contenu textuel et les chemins des images (les cas échéants) seront chargés dans une base de données.
Le deux pages à réaliser sont : 

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
- La liste des auteurs du site ("équipe de rédaction")
  - L'entrée pour y accéder est déjà dans la navigation mais pas le fichier php
  - Afficher pour chaque auteur : 
    - Image
    - Prénom
    - Nom
    - Lien vers le compte twitter
      - Facultatif
      - Mettez le lien vers le compte twitter de l'université :
        - https://twitter.com/UniversiteCergy

Pour ces deux pages, c'est à vous de réaliser le design. Il faudra prendre soin à ce qu'elles contiennent au moins :
- Le haut de page (header) (`<?php require_once('./ressources/includes/header.php'); ?>`)
- Le pied de page (footer) (`<?php require_once('./ressources/includes/footer.php'); ?>`)

La présence des bulles (`<?php require_once('./ressources/includes/bulle.php'); ?>`) est **facultative dans ces deux nouvelles pages.**

Notez qu'il y a été mis une classe "conteneur-1280" pour avoir un conteneur possédant une largeur de 1280px. Ainsi, si vous ajoutez une balise à l'extérieur d'une balise ayant la classe "conteneur-1280", elle occupera toute la largeur de la fenêtre. Idéal pour afficher des images en plein écran.

Nous vous demandons aussi d'apporter des améliorations aux éléments du site qui sont déjà existants.
À cet effet, dans la "home page" (accueil) nous souhaitons que vous appliquiez des transitions CSS lors du survol des articles (carré composé : image + texte). Vous avez la liberté de choisir un état de survol (:hover) qui vous semble adapté. Par exemple : transformation de l'échelle de l'image, application du fond au texte, ajout d'un élément graphique...

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

Enfin, la connexion à la base de données est déjà faite, elle se trouve dans le fichier `ressources/includes/connexion-bdd.php`, **il faudra toutefois modifier les paramètres pour que la connexion fonctionne.** Pour ce faire, vous devrez éditer le fichier ".env.dev" à la racine du dossier "code/". Vous devrez remplacer la valeur des variables.

Par ailleurs, il faudra également utiliser le contenu du fichier `base-de-donnees.sql` dans phpmyadmin pour générer la base de données de travail.

[Script SQL pour créer la base de données MySQL (cliquez sur le bouton "raw" puis faites clic droit > Enregistrer sous)](base-de-donnees.sql).
Le contenu du fichier devra être exécuté dans PhpMyAdmin, onglet "SQL".

> Si l'utilisation du script dans l'onglet ne fonctionne pas sous phpmyadmin. Pensez à décocher "Activer la vérification des clés étrangères".

## Images et base de données
Dans les tables "article" et "auteur" sont gérés des images, ces dernières devront **être gérées par des liens, vous n'avez pas à gérer un système d'upload.** Vous devrez proposer à l'utilisateur de mettre un lien (absolu) vers l'image.

# Fichiers .env
A la racine du projet, vous trouverez deux fichiers commençant par ".env", un de développement (.env.dev) et un autre de production (.env.prod). Ils vous permettront de manipuler sans trop de problèmes certaines configurations concernant la base de données et votre dossier de travail. Les deux fichiers possèdent les mêmes variables, leurs valeurs changera en fonction de l'environnement. Voici une petite description des différentes variables de ces fichiers .env.
```
# Contient le dossier qui contient votre projet. Par exemple si votre projet (le contenu du dossier code) est dans un dossier nommé "toto", il faudra mettre comme valeur "toto/".
Dans le fichier .env.prod, la valeur est inexistante car on part du principe que le contenu du dossier "code/" sera à la racine du projet. Mais si c'est dans un autre dossier, il faudra mettre une valeur. Pensez bien à mettre la barre oblique à la fin (/) ceci est très important. 
CHEMIN_BASE= 

# Nom de la base de données. Normalement, cette valeur n'a pas à changer
NOM_BDD=sae_203_db
# Nom du serveur de base de données. En local, ça doit être quelque chose comme localhost:NOM-DU-PORT
SERVEUR_BDD=
# A modifier en fonction. Par défaut (en local donc), les valeurs sont "root" et "root" pour le mot de passe et le nom d'utilisateur.
UTILISATEUR_BDD=
MDP_BDD=
```

# Administration (appelé également backoffice)

Grosse partie de cette SAE, elle sera l'occasion de mettre en application les connaissances vues sur bootstrap et en base de données. Dans le dossier `/administration`, vous trouverez un gabarit de site sous bootstrap, il faudra compléter le tout de façon à avoir les pages et les fonctionnalités suivantes :
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

> N'hésitez pas à tester vos requêtes dans phpmyadmin avant de les insérer dans votre code

La partie "Auteur" est presque complète, et vous servira d'exemple, il faudra remplacer quelques valeurs dans les requêtes pour que les bonnes données soit enregistrées.

> En temps normal, une interface d'administration nécessite un formulaire de connexion pour éviter que n'importe qui intègre des données. Dans le cadre de cette SAÉ, nous allons omettre cette fonctionnalité.
> Toutefois si vous souhaitez le faire, allez-y.

### Redirection après soumission (Administration)

Lors de vos tests, vous remarquerez qu'il ne se passe rien lorsque vous soumettrez vos formulaires du point de vue visuel. C'est normal, il manque le comportement du navigateur après la soumission (car les données ont bien été enregistrées). Deux choix s'offrent à vous : 
- Rester sur la page avec les données mises à jour
- Rediriger l'utilisateur vers une autre page

Voici le code pour les deux cas. Ce code est à mettre **après** que les données ont été enregistrées dans la base. Donc après l'appel de la méthode `execute()`.

```php
// L'utilisateur reste sur la même page
$pageRedirection = $_SERVER['HTTP_REFERER'];
header("Location: $pageRedirection"); 
```

```php
// L'utilisateur retourne à la liste des éléments.
// Par exemple : 
// Je crée un article. Je soumets le formulaire. Je suis redirigé vers la liste d'articles grâce au code suivant.
$racineURL = pathinfo($_SERVER['REQUEST_URI']);
$pageRedirection = $racineURL['dirname'];
header("Location: $pageRedirection");
```

# Javascript
Découvert durant ce semestre, cette SAÉ sera l'occasion également d'appliquer vos connaissances en javascript. Le javascript devra **impérativement** être utilisé pour :
- Sur la bannière sur la page contact après envoi du message. La bannière devra être disparaître via un bouton présent dans la bannière au clic sur ce bouton
- Dans le backoffice, il faudra utiliser le backoffice pour afficher **en temps réel** l'image associée à un article et à un auteur. Ainsi, si on change de lien d'image dans le champ, l'image doit changer. C'est l'évènement javascript `blur` qu'il faudra utiliser. Par exemple : 
```js
  // Lorsqu'on sort le focus du champ, alors on appelle la fonction "maFonction"
  // Code à adapter
  const monInput = document.querySelector('[data-mon-champ]')
  monInput.addEventListener("blur", maFonction)
```
Les deux fonctionnalités seront dévelopées et expliquées durant un cours dédié.

# Mise en production
Lorsque vous mettrez votre site en ligne. Assurez-vous bien d'exporter la base de données (avec création de table). De plus pensez à éditer le fichier `.env.prod` avec les valeurs permettant de vous connecter au serveur MySQL de production.
Petit conseil : si vous avez mis localhost pour la valeur de `SERVEUR_BDD`, vous avez fait une erreur à coup sûr.

# Astuces

- **Les fichiers possèdent des commentaires, ne négligez pas leur lecture**, ils sont là pour vous aider
- Vous travaillez en groupe :
  - Ayez la même structure de fichiers, ça sera plus simple après pour tout fusionner
    - **Evitez d'avoir les mêmes noms de fichiers**
  - Rien ne vous empêche de travailler à deux sur les mêmes fonctionnalités et le même ordinateur
  - Il existe l'extension liveshare pour travailler à plusieurs et vous pouvez partager votre serveur :
    - [Travailler à plusieurs sur le même serveur php](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/PARTAGE-SERVEUR.md)
    - [Travailler avec l'extension VS Code liveshare](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/LIVESHARE.md)
- Lorsque vous devez ajouter une nouvelle page sur la partie visible. Dupliquez le fichier `squelette.php` à la racine du dossier puis renommez-le
- Lorsque vous devez ajouter une nouvelle partie à l'admnistration. Dupliquez le **dossier** "squelette" contenu dans le dossier `administration/` et renommez-le avec le nom approprié
  - Par exemple, si vous travaillez sur les articles, renommez le dossier "articles"
- Regardez bien et expérimentez ce qu'on a donné avant de vous lancer dans le code, ceci évitera les erreurs
- Pour le backoffice (administration), n'allez pas réinventer la roue, bootstrap propose suffisament de composants pour l'intégrer

# Rendus attendus

- Une archive nommée nom-prénom du chef de groupe contenant l'ensemble des fichiers permettant le bon fonctionnement de votre site :
  - Base de données (fichier .sql)
  - HTML/PHP/CSS/javascript...
  - Le fichier "rapport-ressenti.odt" **pour chaque membre du groupe et dûment complété**
- URL du site en ligne
  - Attention, la mise en ligne du site nécessite également la mise en ligne de la base de données, il faudra penser à l'exporter
  - Les accès de la base de données sur le serveur sont différents des vôtres en local, faites attention. Il faudra changer les valeurs dans le fichier "code/ressources/includes/connexion-bdd.php"

Votre rendu devra être mis sur Moodle avant la date butoir, **cette date sera donnée ultérieurement.** Un seul rendu est nécessaire par groupe, celui du chef d'équipe.

# Notation
Les critères suivants seront évalués. Une ou les deux parties peuvent être amenées à être évaluées lors d'un oral dans lequel vous sera demandé de justifier vos choix techniques notamment.

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
- L'aspect final du site, comment il s'affiche dans un navigateur
  - Le site sera testé sur Firefox et/ou Chrome

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
- [ ] Mettre des CSS transitions
- [ ] J'ai réalisé toutes fonctionnalités :
  - [ ] Gestion de l'administration 
    - [ ] Je peux ajouter / éditer :
      - [ ] Un article / auteur
    - [ ] Je peux lister :
      - [ ] Tous les articles / auteurs / ~~messages~~
  - [ ] Complétion de la page "équipe de rédaction"
  - [ ] Complétion de la page "article"
    - [ ] Chaque article (sur la page d'accueil) doit charger un contenu différent
  - [ ] Mettre à jour la liste des entrées du menu dans l'administration avec les membres de mon équipe
    - Edition à réaliser dans le fichier `administration/ressources/includes/menu-lateral-footer.php`
- [ ] Respecter les normes d'accessibilité web (liste non exhaustive)
  - [ ] Mes images possèdent un attribut "alt"
  - [ ] L'unité de la propriété "font-size" est rem
  - [ ] Je n'utilise pas de balises &lt;br> de façon inappropriée
- [ ] Rajouter un favicon (image au choix)
- [ ] Toutes mes pages sont accessibles, je n'ai pas d'erreur 404 (page non trouvée) quand je clique sur un lien
- [ ] Rendre le projet 
  - [ ] **Exporter la base de données**
    - [Voir comment exporter une base de données depuis phpmyadmin](https://kb.planethoster.com/guide/astuces-techniques/exporter-une-base-de-donnees-avec-phpmyadmin/)
  - [ ] Créer une archive avec le nom-prénom du chef de projet qui contient :
    - [ ] Le code
    - [ ] La base de données
    - [ ] Le fichier "rapport-ressenti.odt" **rempli par chaque membre du groupe**
    - [ ] URL vers le site
      - **Facultatif**

# Pour aller plus loin

Pour aller plus loin sur le projet, voici une liste (non-exhaustive et non-ordonnée) de fonctionnalités que vous pouvez rajouter pour aller plus loin, vous n'aurez pas plus de points pour autant, mais vous acquirerez de nouvelles connaissances, ceci permettra de valoriser votre CV pour vos stages et emplois futurs :

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
- Améliorer le code de façon à ce que l'édition et la création d'une entité soient faits sur la même page. Le contenu de la page doit donc s'adapter dépendamment qu'on fasse une édition ou une création d'entité

> C'est votre projet, n'hésitez pas à vous concerter pour penser, ajouter de nouvelles fonctionnalités