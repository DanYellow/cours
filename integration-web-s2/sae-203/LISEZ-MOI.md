# SAÉ 203 - Concevoir un site web avec une source de données
_Les consignes pourront être modifiées._

> **IMPORTANT :** Votre version de PHP doit être supérieure ou égale à la version 7.0.0. **Si ce n'est pas le site ne fonctionnera pas.** Vous aurez une page blanche avec un message d'erreur. Assurez-vous d'avoir une version supérieure ou égale à la version 7.0.0.

> **IMPORTANT :** Cette SAE n'a aucun rapport avec la SAE 202, celle où il vous est demandé de réaliser un site WordPress.


- [SAÉ 203 - Concevoir un site web avec une source de données](#saé-203---concevoir-un-site-web-avec-une-source-de-données)
  - [Didacticiels](#didacticiels)
  - [Contexte de la SAÉ](#contexte-de-la-saé)
- [Base de données](#base-de-données)
- [Images et base de données](#images-et-base-de-données)
- [Police d'écriture](#police-décriture)
- [Fichiers .env](#fichiers-env)
- [Administration (appelé également backoffice)](#administration-appelé-également-backoffice)
    - [Redirection après soumission (Administration)](#redirection-après-soumission-administration)
- [Mise en production](#mise-en-production)
- [Astuces](#astuces)
- [Rendus attendus](#rendus-attendus)
- [Notation](#notation)
    - [Intégration Web (HTML/CSS)](#intégration-web-htmlcss)
    - [Développement Web (PHP/MySQL)](#développement-web-phpmysql)
- [Votre liste à faire](#votre-liste-à-faire)
- [FAQ - Foire Aux Questions](#faq---foire-aux-questions)
- [Pour aller plus loin](#pour-aller-plus-loin)


## Didacticiels
- [Importer une base de données dans phpmyadmin](LISEZ-MOI-IMPORT-SQL.md)
- [Mémo sur les requêtes SQL](LISEZ-MOI-REQUETES-SQL.md)
- [Travailler à plusieurs sur le même serveur php](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/PARTAGE-SERVEUR.md)
- [Travailler avec l'extension VS Code liveshare](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/LIVESHARE.md)

## Contexte de la SAÉ
CY Cergy Paris Université vous confie la réalisation d'un site web dédié au BUT Métiers du Multimédia et de l'Internet (MMI). Et pas n'importe lequel puisqu'il s'agit du site sur lequel vous avez travaillé durant la SAÉ 105 dans le but de valider les Apprentissages Critiques (AC) suivants :

**R212 – Intégration**
- AC4102 : Produire des pages Web statiques et fluides utilisant un balisage sémantique efficace

**R213 – Développement Web**
- AC4103 : Générer des pages Web ou vues à partir de données structurées incluant des interactions simples
- AC4106 : Utiliser et adapter un modèle d’accès aux données

**R213 – Développement Web & R215 – Hébergement**
- AC4104 : Mettre en ligne une application Web en utilisant une solution d’hébergement standard

**R214 – Système d’information**
- AC4105 : Modéliser les données et les traitements d’une application Web

Comme la SAÉ 105, ceci est un projet de groupe, groupe de 3 à 6 personnes **au sein du même TP/TD.** Un chef devra encore une fois être désigné, car un seul rendu de projet est attendu sur l'ENT.

Vous partirez du code fourni et contenu dans le dossier `"code/"`. Ce code sert plus ou moins de correction à la SAE 105. Entre-temps des petits changements ont été opérés par rapport à la maquette originale. N'hésitez pas à regarder le code.

- [Télécharger le code de départ la SAE](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fintegration-web-s2%2Fsae-203)

Il y a des dossiers `"ne-pas-modifier/"`, **merci de ne pas toucher à leur contenu,** toutefois vous pouvez copier un sélecteur CSS présent dans le code de ces dossiers pour le surcharger dans vos fichiers si besoin est.

Notez également qu'il y a deux dossiers `ressources/`, un à la racine du projet et un autre dans le dossier `administration/`. Ainsi, si vous devez éditer le site principal (celui de la SAE 105), éditez le dossier `ressources/` à la racine du projet, si vous devez éditer l'administration, travaillez dans le dossier `administration/ressources/`.

- [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/95c93a87-3bd9-475d-8adf-6d6937baace9-c09a/)


Nous vous remettons le lien vers la maquette Adobe XD, **toutefois vous n'en aurez pas vraiment besoin,** en effet, votre travail sur cette SAÉ sera de développer de nouvelles pages, dont le contenu textuel et les chemins des images (les cas échéants) seront chargés depuis une base de données.
Les deux pages à réaliser sont :

- article : lorsqu'on clique sur un article sur la **page d'accueil**, on doit accéder à son contenu. Il y a déjà un fichier `article.php`, **il doit être complété.**

    Un article doit contenir :
    - Son titre
    - Son chapô + contenu (dans cet ordre)
    - Son image
    - Sa date de création. L'affichage de l'heure est optionnelle
    - Son auteur
        - Mettre une valeur par défaut s'il n'y a pas d'auteur
    - Sa vidéo youtube (si l'article en a une)
        - **Le lecteur Youtube doit s'afficher sur la page de votre site**
        - Pour garder le ratio de 16/9 de la vidéo, tailwind nous propose des classes. Exemple :
        ```html
        <iframe class="w-full aspect-video [...]"></iframe>
        ```
        - [Pour en savoir plus](https://tailwindcss.com/docs/aspect-ratio)
  > Note : Cette page possède un bug concernant le chargement du bon article, à vous de le corriger
- La liste des auteurs du site ("équipe de rédaction")
  - Le lien pour y accéder est déjà dans la navigation mais le fichier php n'existe pas
  - Afficher pour chaque auteur :
    - Image
    - Prénom
    - Nom
    - Lien vers le compte Twitter
      - **Facultatif à l'affichage**
    - Optionnel : Le nombre d'articles écrits

> **Sur ces deux pages, le contenu doit provenir de la base de données.** Vous ne devez pas lister manuellement la liste des auteurs (page équipe de rédaction) ou faire autant de pages qu'il y a d'articles.

Parallèlement, ça sera à vous de réaliser le design de ces pages. Il faudra prendre soin à ce qu'elles contiennent au moins :
- Le haut de page (header) (`<?php require_once('./ressources/includes/header.php'); ?>`)
- Le pied de page (footer) (`<?php require_once('./ressources/includes/footer.php'); ?>`)

La présence des bulles (`<?php require_once('./ressources/includes/bulle.php'); ?>`) est **facultative dans ces deux nouvelles pages.**

Pour vous aider à créer de nouvelles pages pour le front-office, il y a un fichier `squelette.php`. Dupliquez puis renommez-le pour travailler dedans.

Notez qu'il y a été mis une classe "conteneur-1280" pour avoir un conteneur possédant une largeur de 1280px. Ainsi, si vous ajoutez une balise à l'extérieur d'une balise ayant la classe "conteneur-1280", elle occupera toute la largeur de la fenêtre. Idéal pour afficher des images en plein écran.

Nous vous demandons aussi d'apporter des améliorations aux pages existantes. Dans l'accueil, nous souhaitons que vous appliquiez des transitions CSS lors du survol/focus clavier des articles (carré composé : image + texte). Vous avez la liberté de choisir un état de survol (:hover) et focus clavier (:focus) qui vous semble adapté. Par exemple : transformation de l'échelle de l'image, application du fond au texte, ajout d'un élément graphique...

N'hésitez pas à appliquer ce que nous avons vu, et allons voir durant ce semestre :
- Positionnement CSS
- CSS Transform
- CSS Transition
- tailwindcss
- Pseudo-éléments ::before / ::after
- ~~Langage de programmation javascript~~
- MySQL
- PHP
- ...

Vous allez devoir également réaliser le back-office du site, vous trouverez plus d'informations dans la partie [administration](#Administration-appelé-également-backoffice).
# Base de données

Comme le nom de la SAE l'indique, elle sera l'occasion d'utiliser les bases de données. Celle du projet ressemble à ceci :

![](captures-ecran/schema-bdd.png "Schéma de la base de données")
<p style="text-align: center">Schéma de la base de données</p>

Cette base de données est composée de trois tables dont une relation One-to-Many. Ainsi un auteur peut avoir rédigé plusieurs articles, mais un article ne peut avoir qu'un **seul et unique auteur.** De ce fait, on retrouve dans la table "article", la clé étrangère "auteur_id", cette clef peut être nulle, un article peut donc avoir aucun auteur.

Toujours à propos de la table article, la colonne "date_creation" n'est mise à jour **que** lors de la création d'un article (`INSERT INTO`). Pour la gestion de la date, il faudra vous inspirer de ce qui a été fait dans le fichier `contact.php`.

Enfin, la connexion à la base de données est déjà faite, elle se trouve dans le fichier `ressources/includes/connexion-bdd.php`, **il faudra toutefois modifier les paramètres pour que la connexion fonctionne.** Pour ce faire, vous devrez éditer le fichier ".env.dev" à la racine du dossier "code/". [Vous trouverez plus d'informations dans la partie dédiée](#fichiers-env).

Par ailleurs, il faudra également importer le contenu du fichier `base-de-donnees.sql` dans phpmyadmin pour générer la base de données du projet.

[Script SQL pour créer la base de données MySQL (cliquez sur le bouton "raw" puis faites clic droit > Enregistrer sous)](base-de-donnees.sql).
**Le contenu du fichier devra être exécuté dans PhpMyAdmin, onglet "SQL".**

> Si l'utilisation du script dans l'onglet ne fonctionne pas sous phpmyadmin. Pensez à décocher "Activer la vérification des clés étrangères".

Si vous utilisez alwaysdata, il y a un didacticiel expliquant comme créer une base de données et exploiter les donées. Ce didacticiel est polyvalent, il peut être utilisé avec un autre projet.
- [Accéder au didacticiel sur les bases de données dans l'interface alwaysdata](LISEZ-MOI-CREATION-BDD-ALWAYS-DATA.md)

# Images et base de données
Dans les tables "article" et "auteur" sont gérés des images, ces dernières devront **être gérées par des liens, vous n'avez pas à gérer un système d'upload de fichiers.** Vous devrez proposer à l'utilisateur de mettre un lien (absolu) vers l'image.

# Police d'écriture
Pour rappel, la maquette utilise la police d'écriture "Open Sans", elle n'est pas présente par défaut sur votre ordinateur, de ce fait, le projet utilise la règle @font-face pour charger la police, vous pourrez le voir en détails dans le fichier "ressources/css/npm-fonts.css".

Quoiqu'il en soit sachez que la police "Open Sans" est nommée "Open Sans" dans le projet, ainsi si vous souhaitez appliquer la police sur un élément, il faudra écrire la chose suivante :
```css
  mon-selecteur {
    font-family: "Open Sans", sans-serif;
  }
```
Néanmoins, la police étant déjà chargée au global, vous ne devriez pas avoir besoin d'écrire le code ci-dessus. En revanche, pour gérer les différentes graisses, il faudra jouer sur la propriété CSS "font-weight" et les valeurs suivantes :
- pas de gras : normal
- semi-gras : 600
- gras : bold

Leur utilisation est indiqué dans la maquette Adobe XD.

# Fichiers .env
A la racine du projet, vous trouverez deux fichiers commençant par ".env", un de développement (.env.dev) et un autre de production (.env.prod). Ils vous permettront de manipuler sans trop de problèmes certaines configurations concernant la base de données et votre dossier de travail. Les deux fichiers possèdent les mêmes variables, leurs valeurs changeront en fonction de l'environnement. Voici une description des différentes variables de ces fichiers .env.
```bash
# Contient le dossier qui contient votre projet. Par exemple si votre projet (le contenu du dossier code) est dans un dossier nommé "toto", il faudra mettre comme valeur "toto/".
# Dans le fichier .env.prod, la valeur est inexistante car on part du principe que le contenu du dossier "code/" sera à la racine du serveur. Mais si c'est dans un autre dossier, il faudra mettre une valeur. Pensez bien à mettre la barre oblique à la fin (/) ceci est très important.
CHEMIN_BASE=

# Nom de la base de données. Normalement, cette valeur ne change pas
NOM_BDD=sae_203_db
# Nom du serveur de base de données. En local, ça doit être quelque chose comme localhost:NOM-DU-PORT
SERVEUR_BDD=
# A modifier en fonction. Par défaut (en local donc), les valeurs sont "" et "root" pour le mot de passe et le nom d'utilisateur.
UTILISATEUR_BDD=
MDP_BDD=
```

# Administration (appelé également backoffice)

Grosse partie de cette SAE, elle sera l'occasion de mettre en application les connaissances vues sur tailwindcss et en base de données. Dans le dossier `administration/`, vous trouverez une base de site sous tailwindcss, il faudra compléter le tout de façon à avoir les pages et les fonctionnalités suivantes :
- Articles
  - Création d'article
    - On doit pouvoir associer un auteur à un article
  - Édition d'article
  - Liste d'articles
    - Afficher le nombre total d'articles
- Auteur
  - Création d'auteur
  - Édition d'auteur
  - Liste d'auteurs
- Message
  - Liste des messages reçus (depuis le formulaire du site)

> Le contenu des articles est à votre convenance. Bien évidemment ne rédigez pas du contenu offensant ou illégal.

Vu que vous débutez en php/mysql, la plupart des requêtes sont déjà présentes, il faudra toutefois les éditer en fonction de vos besoins. **Nous vous invitons à regarder les commentaires ainsi que le fichier [LISEZ-MOI-REQUETES-SQL.md](./LISEZ-MOI-REQUETES-SQL.md) pour mieux comprendre ces requêtes.**

> N'hésitez pas à tester vos requêtes dans phpmyadmin avant de les insérer dans votre code

La partie "Auteur" est presque complète, et vous servira d'exemple, il faudra remplacer quelques valeurs dans les requêtes pour que les bonnes données soient enregistrées dans la base de données. **Commencez par cette partie.**

> En temps normal, une interface d'administration nécessite un formulaire de connexion pour éviter que n'importe qui intègre des données. Dans le cadre de cette SAÉ, nous allons omettre cette fonctionnalité.
> Toutefois si vous souhaitez la réaliser, allez-y.

Comme pour le front-office, nous avons mis à disposition un squelette de fichiers pour vous aider. Il vous suffira de dupliquer et le renommer en fonction de vos besoins.

### Redirection après soumission (Administration)

Lors de vos tests, vous remarquerez qu'il ne se passe rien lorsque vous soumettrez vos formulaires du point de vue visuel. C'est normal, il manque le comportement du navigateur après la soumission (car les données ont bien été enregistrées - sauf erreur -). Deux choix s'offrent à vous :
- Rester sur la page avec les données mises à jour
- Rediriger l'utilisateur vers une autre page

Voici le code pour les deux cas. Ce code est à mettre **après que** les données ont été enregistrées dans la base. Donc dans le if qui suit l'instruction `$resultat_brut = mysqli_query($mysqli_link, $requete_brute);`, dans le cas où tout se passe bien.

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

# Mise en production
Lorsque vous mettrez votre site en ligne. Assurez-vous bien d'exporter la base de données (avec création de table). De plus, pensez à éditer le fichier `.env.prod` avec les valeurs permettant de vous connecter au serveur MySQL de production.
Petit conseil : si vous avez mis localhost pour la valeur de `SERVEUR_BDD`, vous avez fait une erreur à coup sûr.

# Astuces

- **Les fichiers possèdent des commentaires, ne négligez pas leur lecture**, ils sont là pour vous aider
- Vous travaillez en groupe :
  - Ayez la même structure de fichiers, ça sera plus simple après pour tout fusionner
    - **Evitez d'avoir les mêmes noms de fichiers**
  - Rien ne vous empêche de travailler à deux sur les mêmes fonctionnalités et le même ordinateur
  - Il existe l'extension liveshare pour travailler à plusieurs et vous pouvez partager votre serveur WAMP, XAMP... :
    - [Travailler à plusieurs sur le même serveur php](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/PARTAGE-SERVEUR.md)
    - [Travailler avec l'extension VS Code liveshare](https://github.com/DanYellow/cours/blob/main/didacticiels-generaux/LIVESHARE.md)
- Vous avez appris à utiliser git, n'hésitez pas à l'utiliser pour travailler en équipe et garder un historique de votre travail. Pour vous aider, il y a [un mémo sur git qui résume les commandes de base](LISEZ-MOI-GIT.md)
  - Il est préférable de mettre tout le contenu du dossier code/ à la racine du dépôt
- Pour le backoffice (administration), n'allez pas réinventer la roue, tailwindcss propose suffisament de classes pour vous éviter d'en créer de nouvelles.

# Rendus attendus
Etant donné que l'outil git a été abordé durant le semestre, nous vous proposons **deux** façons de rendre votre projet sur l'ENT :
  - Une archive avec le nom-prénom du chef de projet
  - Un fichier texte contenant le lien vers le dépôt git **public**
    - **Note : Il faut faire un seul et unique dépôt git par groupe**
    - **Note 2 : Il ne faut pas mettre vos mots de passe dans le fichier ".env.prod" (ou ".env.dev"), Sinon vous exposez à tout le monde votre mot de passe, c'est une faille critique de sécurité**

Dans les deux cas, archive ou dépôt git, ceci devra contenir :
  - Le code source du projet
  - La base de données (si vous avez modifié la structure : nouvelles tables, champs)
    - [Voir comment exporter une base de données depuis phpmyadmin](https://kb.planethoster.com/guide/astuces-techniques/exporter-une-base-de-donnees-avec-phpmyadmin/)
  - URL vers le site
    - **Attention :** la mise en ligne du site nécessite également la mise en ligne de la base de données, il faudra penser à l'exporter et la réimporter ensuite dans le phpmyadmin de votre hébergeur
    - Les accès de la base de données sur le serveur sont différents des vôtres en local, faites attention. Il faudra changer les valeurs dans le fichier ".env.prod"

> Pensez bien à tester votre site avant de le rendre. Durant la SAE 105, certains ont rendu leur site avec des bugs facilement repérables avec des simples tests.

Votre rendu devra être mis sur Moodle avant la date butoir, **cette date sera donnée ultérieurement.** Un seul rendu est nécessaire par groupe, celui du chef d'équipe. Des points pourront être retirés ou la note nullifée si le devoir est rendu en retard.

# Notation
Les critères suivants seront évalués. Une ou les deux parties (intégration et développement web) peuvent être amenées à être évaluées lors d'un oral dans lequel vous sera demandé de justifier vos choix techniques notamment.

### Intégration Web (HTML/CSS)
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
  - Unité des polices d'écriture en rem
    - **Toute utilisation de l'unité px pour la propriété font-size sera sanctionnée, il faut utiliser l'unité rem**
      - Conversion px -> rem : Diviser la valeur en pixels par 16 pour obtenir la valeur en rem
  - [Voir plus de normes d'accessibilité](https://www.accede-web.com/notices/html-et-css/)
  - Vous pouvez utiliser le site [accessibilitychecker](https://www.accessibilitychecker.org/) pour tester l'accessibilité, une fois le site en ligne
- L'aspect final du site, comment il s'affiche dans un navigateur
  - Le site sera testé sur Firefox et/ou Chrome

### Développement Web (PHP/MySQL)
- Qualité du code
  - Utilisation de la fonction PHP `require_once()`
  - Utilisation de fonctions (quand c'est nécessaire)
  - Lecture et écriture de la base de données
  - Utilisation des paramètres d'url

# Votre liste à faire
- [x] Lire les consignes
- [ ] Importer et connecter la base de données
- [ ] S'approprier le code, bien le regarder (HTML et CSS), faire des tests pour mieux comprendre le code
- [ ] Mettre des transitions CSS
- [ ] Compléter l'administration
    - [ ] Je peux ajouter / éditer :
      - [ ] Un article / auteur
    - [ ] Je peux lister :
      - [ ] Tous les articles / auteurs
    - [ ] Mettre à jour la liste des entrées du menu dans l'administration avec les membres de mon équipe
    - Edition à réaliser dans le fichier `administration/ressources/includes/global-footer.php`
    - Je vérifie que toutes les données requises (à vous de les définir) sont présentes
      - Afficher un message d'erreur (comme pour le formulaire de contact) s'il y a un problème
      - S'il est à vous de définir les champs obligatoires, il ne doit pas être possible d'enregister des données vides
- [ ] Intégration de la page "équipe de rédaction"
  - **La page affiche les données en provenance de la base de données**
- [ ] Complétion de la page "article"
  - [ ] Chaque article (sur la page d'accueil) doit charger un contenu différent
- [ ] Respecter les normes d'accessibilité web (liste non exhaustive)
  - [ ] Mes images possèdent un attribut "alt" (même vide)
  - [ ] L'unité de la propriété "font-size" est rem
  - [ ] Je n'utilise pas de balises &lt;br> de façon inappropriée
  - [ ] Les éléments de formulaire ont bien un libellé qui leur est rattaché avec les bons attributs ("for" et "id")
  - Vous pouvez utiliser le site [accessibilitychecker](https://www.accessibilitychecker.org/) pour tester l'accessibilité, une fois le site en ligne
- [ ] Rajouter un favicon (image au choix)
- [ ] Toutes mes pages sont accessibles, je n'ai pas d'erreur 404 (page non trouvée) quand je clique sur un lien
- [ ] Rendre le projet
  - Voir section [Rendus Attendus](#rendus-attendus) pour plus d'informations


# FAQ - Foire Aux Questions
- **Est-il possible d'utiliser tailwindcss également sur le front-office ?**

  Oui, vous avez tout à fait le droit. A noter que tailwind modifiera un peu l'apparence initiale du site, mais ce n'est pas grave.

- **Est-il possible d'ajouter de nouvelles tables à la base de données ?**

  Si vous estimez que de nouvelles tables ou même colonnes sont nécéssaires, n'hésitez pas. Cependant, vous prendrez soin d'exporter votre base de données lors du rendu de votre travail.

- **Devons-nous changer le contenu des balises &lt;title> ?**

  Oui, pour rappel, la balise &lt;title> est très importante pour le référencement et l'accessibilité. Assurez-vous d'avoir des valeurs claires et uniques pour cette balise.

- **Pouvons-nous nous passer de tailwindcss pour l'administration (back-office) ?**

  Vous pouvez, mais nous vous le déconseillons très fortement car vous allez perdre la cohérence visuelle avec le reste du site. Quant au front-office (partie SAE 105), vous êtes libres de l'utiliser pour les nouvelles pages que vous devez rajouter.

- **Mon site ne charge pas le CSS. Pourquoi ?**

  Vous n'avez pas modifié la clé `CHEMIN_BASE` du fichier `.env.dev` (ou `.env.prod`). Pour rappel, sa valeur doit être égale au chemin dans lequel est contenu votre projet. Par exemple, si pour accéder à votre projet (sur localhost ou en ligne), il faut aller sur `localhost/monprojet/sae203`, il faudra écrire dans le fichier `.env.dev` la chose suivante.
  ```bash
  CHEMIN_BASE=monprojet/sae203/
  # [...] Reste du fichier
  ```
- **Mon site affiche "Erreur : SQLSTATE[HY000] [1049] Base 'sae_203_db' inconnue" (ou semblable)**

    Ceci signifie que vous n'avez pas importé la base de données. Regardez le fichier [LISEZ-MOI-IMPORT-SQL](LISEZ-MOI-IMPORT-SQL.md) pour voir comment importer la base.

- **Après avoir uploadé mes modifications, je ne vois aucune modifications dans mon navigateur**

    Deux possibilités :

    - Vous ne modifiez pas les bons fichiers. Vous avez, par exemple, le projet copié ailleurs sur votre ordinateur ou une clé usb et vous modifiez cette version, version qui n'est pas affichée dans le navigateur
    -  Votre serveur affiche la version en cache de votre site. Pour vider le cache plusieurs solutions :
        - Raccourci `Ctrl/cmd + maj + suppr` : Vous cochez "cache" et vous validez l'action
        - **En ayant la console ouverte**, vous maintenez le clic sur le bouton d'actualisation de page, ça va ouvrir un menu et vous sélectionnez "Actualisation forcée". **Ceci ne fonctionne que sous Chrome.**
        - Raccourci `Ctrl/cmd + F5` ou `Ctrl/cmd + maj + R`
    > Normalement, lorsque la console est ouverte, le cache est désactivé si vous avez coché l'option "Disable cache" dans l'onglet "Network" de la console du navigateur (F12 / Clic droit > Inspecter).

- **Dans l'administration, certains éléments se déplacent d'une page à l'autre. Pourquoi ?**

    C'est dû à l'utilisation de l'API CSS @view-transition, elle permet d'effectuer des transitions entre deux pages web. Ainsi, au lieu d'avoir un changement "brut" de contenu entre deux pages, il est désormais possible une expérience de navigation plus fluide.

    D'ailleurs, l'utilisation de cette nouvelle API est une tâche **optionnelle** listée dans le fichier [POUR-ALLER-PLUS-LOIN.md](POUR-ALLER-PLUS-LOIN.md).

    > Note : @view-transition ne fonctionne pas sous Firefox à l'heure actuelle (04/2025).


# Pour aller plus loin
[Voir la liste des ajouts possibles au projet pour aller plus loin](POUR-ALLER-PLUS-LOIN.md)
