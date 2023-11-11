```
███████╗ █████╗ ███████╗    ███████╗ ██████╗  ██╗ Développer pour le web ou Concevoir un dispositif interactif
██╔════╝██╔══██╗██╔════╝    ██╔════╝██╔═████╗███║
███████╗███████║█████╗      ███████╗██║██╔██║╚██║
╚════██║██╔══██║██╔══╝      ╚════██║████╔╝██║ ██║
███████║██║  ██║███████╗    ███████║╚██████╔╝ ██║
╚══════╝╚═╝  ╚═╝╚══════╝    ╚══════╝ ╚═════╝  ╚═╝
```
_Les consignes pourront être modifiées._

> **IMPORTANT :** Il est préférable d'avoir une version récente de nodejs. Si jamais, pour diverses raisons, vous ne pouvez pas installer la dernière version de nodejs, installez par nvm pour pouvoir utiliser plusieurs versions de nodejs sur votre ordinateur.
> - [Accéder à la documentation de nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

## Contexte de la SAÉ
Vu en S1 et S2, le site dédié au BUT Métiers du Multimédia et de l'Internet (MMI) fait son retour. Dans la SAÉ 105, vous aviez pu découvrir le HTML et le CSS, puis en S2 appliquer vos connaissances en PHP/MySQL. Cette fois-ci en S5, vous allez travailler une nouvelle fois sur ce site, mais avec des technologies bien plus modernes : nunjucks, scss, vite, express... Dans le but de valider les Apprentissages Critiques (AC) suivants : 

**R5.DWeb-DI.06 | Développement back avancé**
- AC34.02 | Développer à l’aide d’un framework de développement côté serveur

**R5.DWeb-DI.05 | Développement front avancé**
- AC34.02 | Développer à l’aide d’un framework de développement côté client

> Note : nous avons fait le choix de remplacer twig par nunjucks pour des questions de performances, nunjucks est plus approprié dans un environnement nodejs. Les deux utilisent la même syntaxe à quelques petites différences près. [Accéder à la documentation de nunjucks.](https://mozilla.github.io/nunjucks/fr/templating.html). Ce que vous avez appris avec twig, vous pourrez donc le réutiliser avec nunjucks.
>
> N'oubliez pas d'ajouter les fichiers "nunjucks" au plugin Emmet dans les préférences de VSCode. Pour rappel : `File > Preferences > Settings > Recherchez "Emmet" > Ajoutez "nunjucks" avec la valeur "html" dans la partie "Emmet: Include Languages"`. [Et le plugin Nunjucks ajoutera la coloration syntaxique.](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks)

Vu que vous êtes peu nombreux, ce projet sera à faire en binôme ou en trinôme. Votre rendu devra être mis sur Moodle avant la date butoir, **cette date sera donnée ultérieurement.** Un seul rendu est nécessaire par groupe, celui du chef d'équipe. Des points pourront être retirés ou la note nullifée si le devoir est rendu en retard. **Le rendu se fera sous la forme d'un lien, le lien de votre dépôt git.**

Vous partirez du code fourni et contenu dans le dossier `"code/"`. Vous trouverez plus bas la liste des choses à réaliser. 

> - [Télécharger le code de départ la SAE](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fdeveloppement-front-s5%2Fsae-501)
>
> - [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/95c93a87-3bd9-475d-8adf-6d6937baace9-c09a/)

Le projet se structure de la façon suivante (structure non exhaustive) :

```
code/
├── database/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── styles/
│   └── uploads/
├── server/
│   ├── api-router/
│   ├── back-end-router/
│   ├── front-end-router.js
│   ├── index.js
│   └── uploader.js
└── src/
    ├── components/
    │   ├── front-end/
    │   └── back-end/
    ├── data/
    │   └── menu.json
    ├── layouts/
    │   ├── front-end/
    │   └── back-end/
    ├── pages/
    ├── scripts/
    │   ├── main.backend.js
    │   └── main.frontend.js
    └── styles/
```

La structure est un peu plus complexe que celle avec laquelle vous avez travaillé en S2. Le projet se base principalement sur les outils vitejs et express. Néanmoins regardons en détails tout ça.

### database/
Le dossier `database/` gère la gestion de la base de données NoSQL du projet. Vous trouverez plus de détails sur la technologie NoSQL dans le [fichier MONGODB-NOSQL](./MONGODB-NOSQL.md). Vous aurez besoin de télécharger [MongoDB](https://www.mongodb.com/try/download/community), et pour des questions de conforts [MongoDB Compass](https://www.mongodb.com/try/download/compass), les deux sont gratuits.

### public/
Le dossier `public/` contient toutes les ressources qui n'ont pas à être gérées par vite, si vous avez un fichier css que vous n'importerez pas dans un fichier javascript, c'est ici qu'il faudra le mettre. Le chemin entre vos templates (dossier src/) et le fichier public ne doit pas contenir `public/`, pour rappel. Dans le dossier, on y trouve également le dossier `uploads/`, là où les fichiers uploadés seront placés, **vous ne devez pas le supprimer**. De plus, ce dossier n'est pas commité, les fichiers que vous uploaderez resteront sur votre ordinateur.

### server/
Jusqu'à présent, vous avez travaillé avec des serveurs Apache et la technologie PHP. Dans cette SAÉ, nous avons décidé de remplacer le PHP par nodejs et la technologie express. express est un framework nodejs permettant de développer en javascript côté serveur.

Dans le dossier `server/`, le fichier `index.js` permet de lancer le serveur et d'injecter des données, vous n'aurez pas besoin d'y toucher. En revanche, les fichiers `backend-router.js` et `frontend-router.js`, vous y toucherez, ils contiennent le routing du projet.

Autrement dit, ces fichiers définissent ce qu'il doit se passer quand on accède à une url spécifique, c'est souvent le chargement d'une page web. Par exemple :
```js
// front-end-router.js
router.get("/hello", async (_req, res) => {
  res.render("pages/index.njk", { title: "hello" });
});
```
Le code ci-dessus indique que lorsqu'on accède à l'url `/hello` avec la méthode GET, on charge le template "pages/index.njk" en injectant la variable "title". Le système de routing d'express est très puissant, vous trouverez d'autres exemples dans les fichiers déjà fournis.

Une route peut également prendre également des paramètres, il suffit de préfixer le nom du paramètre par deux-points (:). Exemple :
```js
// front-end-router.js
router.get("/user/:id", async (_req, res) => {
    // On récupère le paramètre id dans l'url.
    const paramId = req.params.id;
    res.render("pages/index.njk", { title: "hello" });
});
```
Une route peut accepter plusieurs paramètres. Il faudra juste penser à la préfixer par deux-points (:).

> [Accéder à la documentation du routing avec express](https://expressjs.com/fr/guide/routing.html)

Retenez deux choses :
- Si vous faites un lien entre des pages du site, il faudra faire le lien vers la route et non vers le fichier html, sinon, vous aurez une erreur 404
- Lorsque vous souhaitez ajouter une nouvelle page, en plus du fichier, il faudra également rajouter la nouvelle route. Aidez-vous des exemples dans les fichiers de routing. Dans le projet, il y a trois types de routes :
    - frontend : partie accessible à tous
    - backend : partie accessible aux administrateurs. **Toutes les routes commencent par "/admin", vous ne devez pas le mettre dans la route vous-même**
    - api : appels permettant de récupérer des données de la base de données. **Toutes les routes commencent par "/api", vous ne devez pas le mettre dans la route vous-même**

## src/
C'est dans ce dossier que vous coderez principalement, la structure ressemble plus ou moins à celle préconisée par vituum, mais, le projet ne l'utilise pas. Il y a donc certaines fonctionnalités vues qui ne seront pas accessibles.

### src/components/
Il contient vos blocs nunjucks réutilisables, pour des questions d'organisation, nous vous conseillons fortement de placer vos blocs dans le bon dossier (front ou back-end).

### src/data/
Ce dossier fonctionne comme ce que vous aviez pu voir en TP, ainsi tout fichier json présent dans le dossier sera automatiquement injecté dans tous les fichiers nunjucks du projet. A l'heure actuelle, il y a un fichier menu.json qui est déjà exploité pour afficher le menu. 

Egalement, il est possible de charger un fichier json propre à un template, il suffit juste qu'il ait le même nom que le template avec l'extension ".json". Exemple : contact.njk -> contact.njk.json.

### src/layouts/
Le dossier `layouts/` est destiné pour les gabarits partagés entre vos pages, il y en a déjà un pour le frontend et backend du site respectivement. Le moteur de template utilisé est nunjucks, les fichiers sont compilés à la volée par le serveur node.

### src/pages/
Vous placerez ici les pages qui seront affichées à l'utilisateur final, ce dossier peut avoir des sous-dossiers, il faudra juste faire attention au chemin quand vous les appelerez dans vos routes.

### scripts/
Ce dossier contient les points d'entrées de vos bundles, ils seront compilés par vite lors de l'exécution de la commande `npm run build`. Le backend possède l'entrée `main.backend.js` et le frontend l'entrée `main.frontend.js`. Si vous pouvez créer des dossiers et des fichiers dedans, vous ne devez pas modifier le nom des fichiers **à la racine** déjà présents. Les fichiers "main.backend.js" et "main.frontend.js" servant de point d'entrée

### styles/
Contient le css et scss du projet. Le projet importe déjà [tailwindcss](https://tailwindcss.com/docs/installation), le fait que nous utilisions avec nodejs fait que vous avez accès à l'auto-complétion des classes tailwind. Il vous suffit de commencer à écrire le nom d'une classe tailwindcss et VSCode fera des propositions. Vous pouvez bien utiliser tailwind pour l'intégration de la partie front et backend du projet. Pas utile d'être 100% iso avec la maquette fournie.


## Mise en place

### Pré-requis
- node >= 18
- mongodb (voir [MONGODB-NOSQL.md](./MONGODB-NOSQL.md) pour l'installation)

### Installation
1. [Récupérer le projet](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fdeveloppement-front-s5%2Fsae-501)
2. Installer les dépendances
   ```sh
   # Dans le dossier code/
   npm install
   ```

### Utilisation - Mode développement
1. Lancez le serveur
   ```sh
   # La commande va lancer les serveurs express et vite
   npm start
   ```
Par défaut, le site tourne sur le port 3000, mais vous pouvez le changer grâce à un fichier .env.dev.local (voir fichier .env.dev.dist pour exemples). Le serveur se relance à chaque modification de fichiers ~~et rafraîchit également le navigateur~~. De plus, le serveur est exposé sur le réseau, vous pouvez donc accéder au projet depuis n'importe quel appareil sur le même réseau, ça sera pratique pour tester le mode responsive. 

### Utilisation - Mode production
1. Compiler les assets gérés par vite
   ```sh
   # La commande va compiler les assets vite dans le dossier dist/
   npm build
   ```
2. Lancer le serveur de production
   ```sh
   npm prod
   ```
> Note : Même s'il y a une tâche de production, vous ne serez pas en capacité d'uploader votre site sur un hébergeur, par défaut, ils ne gèrent pas Node, et le déploiement de projets node nécessitent quelques modifications supplémentaires que nous n'aurons pas l'occasion de voir. Cependant, si vous souhaitez, temporairement, exposer votre site, vous pouvez utiliser un outil gratuit comme [localtunnel](https://localtunnel.github.io/www/)

## Tâches à effectuer

- [x] Lire les consignes
- [ ] Installer des dépendances avec la commande `npm install`
    - **Note : il faut le faire depuis le dossier contenant le fichier "package.json"**
    - [Télécharger le code de départ la SAE](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fdeveloppement-front-s5%2Fsae-501)
- [ ] S'approprier le code, faire des tests comme ajouter de nouvelles routes

### Site BUT et administration
- [ ] Gérer l'erreur 404
    - Il existe moult didacticiels en ligne qui montrent comment gérer ceci avec express
- [ ] Rendre le site responsive (des mixins scss et tailwind sont là pour vous aider)
    - Il n'y a pas de maquette responsive, à vous de vous adapter
- [ ] Mettre un favicon
    - Il n'a pas besoin d'être géré par vite, mettez-le dans le dossier /public
- [ ] Respecter les normes d'accessibilité web
- [ ] Ajouter une validation côté client des formulaires
    - Vous pouvez utiliser un outil comme [validator.js](https://github.com/validatorjs/validator.js) (déjà installé, voir `code/database/models/author.js`)

### Site BUT
- [ ] Compléter l'intégration à partir de la maquette Adobe XD
    - [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/95c93a87-3bd9-475d-8adf-6d6937baace9-c09a/)
    - Vous devez utiliser la puissance de nunjucks, un gabarit (src/layouts/front-end/base.nunjucks) est là pour vous aider
    - La page "a-propos" est déjà faite
    - N'oubliez pas d'ajouter les routes pour accéder à vos pages dans le fichier `server/front-end-router.js` et modifier les liens de navigation dans le fichier src/data/menu.json
        - La valeur de l'attribut "href" doit être le premier paramètre du router. Exemple :
        ```js
            router.get("/formation", async (req, res) => {/* [...] */})
            // Dans le code ci-dessus, on définit une route ayant pour chemin "/formation" pour charger une page.
            // Pour y accéder depuis une balise <a>, il faudra mettre comme valeur "/formation" pour l'attribut "href"
        ```
- [ ] Sur la page contact, vous devez gérer de façon asynchrone l'envoi de message, autrement dit lors de l'envoi, la page ne doit pas se recharger
    - Il faudra utiliser un outil comme axios (déjà installé) ou fetch, api native de javascript
- [ ] Afficher les détails d'un article quand on clique sur un article de la page d'accueil
    - titre, chapo, contenu, image, video youtube
    - Afficher le nom de l'auteur (mettre une valeur par défaut au cas où) avec un lien vers le détail de l'auteur listant tous ses articles
- Permettre, de façon asynchrone, d'ajouter un commentaire à un article et l'afficher
- [ ] Indiquer dans la navigation la page courante et changer la couleur de la bulle en fonction de la page
    - Il faudra utiliser une variable nunjucks
    - Note : Une fonctionnalité semblable est déjà présente dans la partie admin, inspirez-vous en
- [ ] Afficher la liste des articles sur la page d'accueil
    - Pour rappel, vous avez déjà le code pour, les articles sont déjà injectés dans la page d'accueil (src/pages/front-end/index.nunjucks), il faut juste les afficher
- [ ] Mettre en place un système de pagination pour les articles
- [ ] Ajouter une page affichant en détails un auteur
    - Cette page n'existe pas, à vous de faire le design
    - Il y a déjà une url pour récupérer ces informations (voir swagger ou postman)
    - La couleur de la bulle change en fonction de l'auteur (optionnel)
- [ ] Appliquer des meta og sur toutes les pages
    - Il existe des générateurs : [https://metatags.io/](https://metatags.io/)
    - Note : **le lien des images doit être absolu**

### Administration
- [ ] Rendre le site responsive (des mixins scss et tailwind sont là pour vous aider)
    - Il n'y a pas de maquette responsive, à vous de vous adapter
- [ ] Gérer la date des journées portes ouvertes depuis le backoffice qui créera un fichier json
    - Le fichier sera lu côté front-end
    - Le fichier n'existe pas, vous devez le mettre dans le dossier src/data
- [ ] Ajouter une section "Messages" (titre indicatif) sur la page d'accueil de l'administration listant les 5 derniers messages envoyé depuis le formulaire de contact
    - Cette route est gérée dans le fichier `server/back-end-router/index.js`, il fadura la compléter
- [ ] Afficher en "temps réel" le nombre de caractères dans la balise &lt;textarea>
    - Lors de l'édition d'une SAE, il y a une limite de caractères, indiquez à l'utilisateur le nombre de caractères déjà présents
- [ ] Gérer "proprement" les messages d'erreur
    - Présentement, certains messages d'erreurs sont dupliqués, proposez une solution plus maintenable
    - Les messages d'erreurs sont dans les dossiers "server" et "database"
- [ ] Permettre à l'utilisateur mobile de changer de page grâce à la liste déroulante présente pour la pagination
    - **Les** listes déroulantes sont déjà présentes, il ne manque plus que la fonctionnalité
- [ ] Affichez les messages envoyés depuis le formulaire de contact
    - Il n'y a pas de schéma pour les messages, vous devez le réaliser
        - L'administration ne doit permettre que de lister les messages (GET) et le site front juste d'envoyer un message (POST)
    - Vous devez créer les api pour (POST et GET)
    - N'oubliez pas d'ajouter les routes pour accéder aux messages depuis l'administration dans le dossier `server-back-end-router/` 
- [ ] Permettre de créer, éditer un article
    - Toutes les routes sont déjà prêtes pour manipuler la base de données. Il faut créer le formulaire
    - Le champ permettant l'upload d'images doit impérativement s'appeller "image", sinon ça ne fonctionnera pas
    - La suppression et le listage sont déjà gérés
    - Inspirez-vous de ce qui a déjà été fait pour la partie SAE, partie qui est complète
- [ ] Permettre de créer, éditer, supprimer un auteur et lister les auteurs
    - Toutes les routes sont déjà prêtes pour manipuler la base de données. Il faut créer la partie front
    - Le champ permettant l'upload d'images doit impérativement s'appeller "image", sinon ça ne fonctionnera pas
    - Inspirez-vous de ce qui a déjà été fait pour la partie SAE, partie qui est complète
- [ ] Ajouter une validation côté client des formulaires (SAE, Auteur et Article)
    - Vous pouvez utiliser un outil comme [validator.js](https://github.com/validatorjs/validator.js) (déjà installé, voir `code/database/models/author.js`)
    - Dépendamment de l'outil, **vous devrez écouter un évènement pour la validation du formulaire**

# FAQ - Foire Aux Questions
- **Est-il possible d'utiliser tailwindcss également sur le front-office ?**

  Oui, vous avez tout à fait le droit. A noter que tailwind modifiera un peu l'apparence initiale du site, mais ce n'est pas grave.

- **Puis-je mettre sur github ce projet ?**

Oui. De toute façon, c'est obligatoire car vous devrez rendre le lien du dépôt git.

- **Où puis-je trouver de l'inspiration pour le design de mes pages ?**

Vous pouvez utiliser votre expérience. Si vous utilisez tailwind, vous avez le site [tailwindtoolbox](https://www.tailwindtoolbox.com/starter-components)

- **Comment je peux tester la version mobile ?**

Vous pouvez utiliser le mode responsive de votre navigateur ou votre propre smartphone. Il faut que votre ordinateur et votre smartphone soient sur le même réseau. Ensuite, il faut accéder à l'adresse ip de votre serveur (ça doit commencer par 192.168...) suivi du port. En tous les cas, votre adresse ip sur le réseau s'affiche dans la console node. 

- **Après l'ajout des API pour requêter les commentaires, est-ce que je dois mettre à jour le swagger ou Postman ?**

Non, mais il reste préférable de faire l'un ou l'autre, ceci va permettre aux membres de votre groupe de comprendre comment tout ceci fonctionne dans une moindre mesure mais aussi de tester rapidement.