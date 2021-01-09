# Architecture front-end

De nos jours, rares sont les projets web où les développeurs écrivent directement du HTML/CSS. Malgré leur universalité ces langages souffrent de beaucoup de problèmes, notamment la répétivité du code HTML. Alors, les développeurs web passent par des langages intermédiaires, il en existe de multitudes, chacun ayant leurs avantages et inconvénients. Dans le cadre de cette architecture, nous allons utiliser [nunjunks](https://mozilla.github.io/nunjucks/) pour le HTML et [sc|ass](https://sass-lang.com/) pour le CSS. Quelque soit le langage intermédiaire utilisé, ils ne peuvent pas être lus directement par le navigateur, ils doivent être compilés que l'intermédiaire d'un serveur javascript, un serveur Node.

## Prérequis

### Logiciels
- Téléchargez et installer Nodejs sur le site officiel de nodejs. [Accéder au site officiel de nodejs](https://nodejs.org/en/)
  Sélectionnez la version LTS (il est possible que le numéro de version diffère par rapport à la capture). Laissez les options par défaut lors de l'inscription

- Téléchargez et installez [cmder](https://cmder.net/) (Windows), télécharger la version "complète (full)"
- Validez l'installation de nodejs
  - Ouvrez cmder
  - Entrez "node -v"
  - Vous devriez voir la chose suivante
  ![](_sources-LISEZ-MOI/cmder.jpg)

### Fichiers
- Téléchargez le dossier du projet https://downgit.github.io/#/home
- Décompressez l'archive (et placez le dossier où vous voulez travailler)
- Avec cmder, écrivez `cd ` (l'espace est très important)
- Glissez le dossier fraîchement récupéré dans cmder
- Appuyer sur Entrée

Si tout s'est bien passé la console devrait afficher quelque chose comme ceci :
![](_sources-LISEZ-MOI/chemin-change.png)
Ceci indique que nous sommes dans le dossier "outils"

## Installation
1. Installation des dépendances. Ecrire la commande suivante dans la racine de votre dossier de travail
  ```sh
   npm install
  ```

## Lancement du projet
1. Entrer la commande suivante à la racine de votre dossier de travail
  ```sh
    npm start
  ```
  Note : sans `npm install` la commande précédente ne fonctionnera pas
2. Attendre le lancement du projet. Votre navigateur web défini par défaut va s'ouvrir

## Structure des dossiers (simplifiée)
* [dist/](.\archi-fe\dist) (Dossier crée après le premier `npm start`. **Ne jamais éditer ce dossier manuellement**, les modifications seront écrasées par les modifications faites dans le dossier `src/`)
* * [build/](.\archi-fe\build) (Dossier crée après `npm run build`. **Ne jamais éditer ce dossier manuellement**, les modifications seront écrasées par les modifications faites dans le dossier `src/`) Version de production du site
* [node_modules/](.\archi-fe\node_modules) (Contient les dépendances, ne **jamais** copier ce dossier, `npm install` sert à ça)
* [src/](.\archi-fe\src) (Dossier dans lequel vous travaillerez)
  * [assets/](.\archi-fe\src\assets) (Ouvrir pour regarder plus en détails)
  * [views/](.\archi-fe\src\views) (Ouvrir pour regarder plus en détails, c'est ici que vous devez définir vos fichiers HTML)
* [gulpfile.js](.\archi-fe\gulpfile.js) (Fichier définissant l'architecture du projet)
* [package-lock.json](.\archi-fe\package-lock.json) (Fichier définissant la version exacte des dépendances)
* [package.json](.\archi-fe\package.json) (Fichier définissant les dépendances du projet et la liste des commandes `npm run ...`)

## Outils utilisés
Le but de cette partie est de définir très brièvement leur fonctionnement. Je vous invite donc à regarder la documentation officiels (et autres didacticiels) pour en savoir plus.

### Nunjucks
L'un des gros problèmes du HTML est le fait qu'on doive répéter le code à plusieurs reprises, ainsi s'il y a une partie commune à plusieurs pages, il faut la reporter sur chacune des pages. Ca peut créer des erreurs, et surtout rend le travail redondant. Il existe une multitude de templates HTML. Dans le cadre du projet, c'est nunjucks qui est utilisé. Sa syntaxe est très proche du HTML et surtout de Jinja et de Twig, moteurs de templating HTML utilisés pour Django (Python) et Symfony (PHP).
* [Voir documentation de Nunjucks](https://mozilla.github.io/nunjucks/)

### SASS/SCSS
Permet de contrevenir à certaines limites du CSS en ajoutant des fonctionnalités non-négligeables les fonctions, des mixins, l'import, un héritage comme dans les langages de programmation comme le C++ ou le Javascript. A noter que le SASS/SCSS proposent également des variables, toutefois, contrairement aux variables CSS, les variables SCSS/SASS sont compilées.
Notez également que l'architecture du projet permet de gérer le SASS et le SCSS, toutefois, il est préférable de choisir un des deux langages.
* [Voir documentation de SASS/SCSS](https://sass-lang.com/)

### Gulpjs
Gulpjs est un outil permettant de définir des tâches qui se réaliseront sous des conditions définies. Ces tâches s'articulent autour de plugins qui sont installées via npm, le gestionnaire de dépendances du langage javascript. Dans le fichier ./gulpfile.js, vous trouverez  sont définies dans le fichier gulpfile.js présent à la racine du projet. Vous n'avez pas besoin d'éditer le fichier, mais pourquoi pas essayer de rajouter une nouvelle tâche :
* [gulp-zip](https://github.com/sindresorhus/gulp-zip) : zipper le dossier build
* [gulp-inject](https://www.npmjs.com/package/gulp-inject) : injecter automatiquement les fichiers CSS

Dans le projet, il y a deux tâches majeures :
* gulp build : permet de générer un dossier pour la production (`npm run build`)
* gulp serve : permet de démarrer l'environnement de travail (`npm run start`)

### BrowserSync
Outil permettant de synchroniser vos navigateurs. Grâce à l'utilisation d'un serveur node pour faire tourner le site local, il est maintenant possible d'accéder au site depuis n'importe quel appareil sur le réseau local, idéal pour tester sur smartphone. Si vous voulez tester avec votre smartphone, il vous suffit d'accéder sur son navigateur, à votre adresse ip suivi du port de votre serveur. Vous pouvez obtenir ces informations en accédant à l'url : http://localhost:3002
