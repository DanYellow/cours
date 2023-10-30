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
Vu en S1 et S2, le site dédié au BUT Métiers du Multimédia et de l'Internet (MMI) fait son retour. Dans la SAÉ 105, vous aviez pu découvrir le HTML et le CSS, puis en S2 appliquer vos connaissances en PHP/MySQL. Cette fois-ci en S5, vous allez travailler une nouvelle fois sur ce site, mais avec des technologies bien plus modernes : twig, scss, vite, express... Dans le but de valider les Apprentissages Critiques (AC) suivants : 

**R5.DWeb-DI.06 | Développement back avancé**
- AC34.02 | Développer à l’aide d’un framework de développement côté serveur

**R5.DWeb-DI.05 | Développement front avancé**
- AC34.02 | Développer à l’aide d’un framework de développement côté client

Vu que votre TP est très peu nombreux, ce projet sera à faire en binôme ou en trinôme. Votre rendu devra être mis sur Moodle avant la date butoir, **cette date sera donnée ultérieurement.** Un seul rendu est nécessaire par groupe, celui du chef d'équipe. Des points pourront être retirés ou la note nullifée si le devoir est rendu en retard.

> Vous trouverez plus bas, l'ensemble des commandes présentent sur le projet et leur rôle.

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

La structure est un peu plus complexe que celle avec laquel vous avez travaillé en S2. Le projet se base principalement sur les outils vitejs et express. Néanmoins regardons en détails tout ça.

### database/
Le dossier `database/` contient toutes les ressources qui n'ont pas à être gérées par vite, si vous avez un fichier css que vous n'importerez pas dans un fichier javascript, c'est ici qu'il faudra le mettre.

### public/
Le dossier `public/` contient toutes les ressources qui n'ont pas à être gérées par vite, si vous avez un fichier css que vous n'importerez pas dans un fichier javascript, c'est ici qu'il faudra le mettre. Dans le dossier, on y trouve également le dossier `uploads/`, là où les fichiers uploadés seront placés, **vous ne devez pas le supprimer**.

### server/
Jusqu'à présent, vous avez travaillé avec des serveurs Apache et la technologie PHP. Dans cette SAÉ, nous avons décidé de remplacer le PHP par nodejs et la technologie express. express est un framework nodejs permettant de développer en javascript côté serveur.

Dans le dossier `server/`, le fichier `index.js` permet de lancer le serveur et d'injecter des données, vous n'aurez pas besoin d'y toucher. En revanche, les fichiers `backend-router.js` et `frontend-router.js`, vous y toucherez, ils contiennent le routing du projet.

Autrement dit, ces fichiers définissent ce qu'il doit se passer quand on accède à une url spécifique, c'est souvent le chargement d'une page web. Par exemple :
```js
// front-end-router.js
router.get("/hello", async (_req, res) => {
  res.render("pages/index.twig");
});
```
Le code ci-dessus indique que lorsqu'on accède à la page `localhost:9500/hello` avec la méthode GET, on charge la page "pages/index.twig". Le système de routing d'express est très puissant, vous trouverez d'autres exemples dans les fichiers déjà fournis.
> [Accéder à la documentation du routing avec express](https://expressjs.com/fr/guide/routing.html)

Retenez deux choses :
- Si vous faites un lien entre des pages du site, il faudra faire le lien vers la route et non vers le fichier html, sinon, vous aurez une erreur 404
- Lorsque vous souhaitez ajouter une nouvelle page, en plus du fichier, il faudra également rajouter ue nouvelle route. Aidez-vous des exemples dans les fichiers de routing. Dans le projet, il y a trois types de routes :
    - frontend : partie accessible à tous
    - backend : partie accessible aux administrateurs. **Toutes les routes commencent par "/admin", vous ne devez pas le mettre dans la route vous-même**
    - api : appels permettant de récupérer des données de la base de données. **Toutes les routes commencent par "/api", vous ne devez pas le mettre dans la route vous-même**

## src/
C'est dans ce dossier que vous coderez principalement, la structure ressemble plus ou moins à celle préconisée par vituum, mais, le projet ne l'utilise pas. Il y a donc certaines fonctionnalités vues qui ne seront pas accessibles.

### src/components/
C'est dans ce fichier que vous mettre vos blocs twig réutilisables, pour des questions d'organisation, nous vous conseillons fortement de placer vos blocs dans le bon dossier.

### src/data/
Ce dossier fonctionne comme ce que vous aviez pu voir en TP, ainsi tout fichier json présent dans le dossier sera automatiquement injecté dans tous les fichiers twig du projet. A l'heure actuelle, il y a un fichier menu.json qui est déjà exploité pour afficher le menu. 

Egalement, il est possible de charger un fichier json propre à un template, il suffit juste qu'il ait le même nom que le template avec l'extension ".json". Exemple : contact.twig -> contact.twig.json.

### src/layouts/
Le dossier `layouts/` est destinés pour les gabarits partagés entre vos pages, il y en a déjà un pour le frontend du site. Le moteur de template utilisé est twig, les fichiers sont compilés à la volée par le serveur node.

### src/pages/
Vous placerez ici les pages qui seront affichées à l'utilisateur final, ce dossier peut avoir des sous-dossiers, il faudra juste faire attention au chemin quand vous ferez votre routing.

### scripts/
Ce dossier contient les points d'entrées de vos bundles, ils seront compilés par vite lors de l'exécution de la commande `npm run build`. Le backend possède l'entrée `main.backend.js` et le frontend l'entrée `main.frontend.js`. Si vous pouvez créer des dossiers et des fichiers dedans, vous ne devez pas modifier le nom des fichiers déjà présents. De plus, vos fichiers javascript crées devront à la fin être importés dans l'un de ces deux fichiers, sinon, ils ne seront pas exécutés.

### styles/
Contient le css et scss du projet. Le projet importe déjà [tailwindcss](https://tailwindcss.com/docs/installation), le fait que nous utilisions avec nodejs fait que vous avez accès à l'auto-complétion des classes tailwind. Il vous suffit de commencer à écrire le nom d'une classe tailwindcss. Vous pouvez bien évidemment utiliser tailwind pour l'intégration de la partie front et backend du projet. Pas utile d'être 100% iso avec la maquette fournie.


## Mise en place

### Pré-requis
- node >= 18 

### Installation
1. [Récupérez le projet]()
2. Installez les dépendances
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
Par défaut, le site tourne sur le port 3000, mais vous pouvez le changer grâce à un fichier .env.dev.local (voir fichier .env.dev.dist pour exemples). Le serveur se relance à chaque modification de fichiers et rafraîchit également le navigateur. De plus, le serveur est exposé sur le réseau, vous pouvez donc accéder au projet depuis n'importe quel appareil sur le même réseau, ça sera pratique pour tester le mode responsive. 

### Utilisation - Mode production
1. Compilez les assets gérés par vite
   ```sh
   # La commande va compiler les assets vite dans le dossier dist/
   npm build
   ```
2. Lancez le serveur de production
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
    - Vous pouvez utiliser un outil comme validator.js. [Voir exemples](https://github.com/jaywcjlove/validator.js)

### Site BUT
- [ ] Compléter l'intégration à partir de la maquette Adobe XD
    - [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/95c93a87-3bd9-475d-8adf-6d6937baace9-c09a/)
    - Vous devez utiliser la puissance de twig, un gabarit (src/layouts/back-end/base.twig) est là pour vous aider
    - La page "a-propos" est déjà faite
    - N'oubliez pas d'ajouter les routes pour accéder à vos pages dans le fichier server/`front-end-router.js` et modifier les liens de navigation dans le fichier src/data/menu.json
- [ ] Sur la page contact, vous devez gérer de façon asynchrone l'envoi de message, autrement dit lors de l'envoi, la page ne doit pas se recharger
    - Il faudra utiliser un outil comme axios (déjà installé) ou fetch, api native de javascript
- [ ] Afficher les détails d'un article et permettre, de façon asynchrone, d'envoyer un message lié à un article et l'afficher
    - Quand on clique sur un article de la page d'accueil, on le voit en détails
- [ ] Indiquer dans la navigation la page courante et changer la couleur de la bulle en fonction de la page
    - Il faudra utiliser une variable twig
    - Note : Une fonctionnalité semblable est déjà présente dans la partie admin, inspirez-vous en
- [ ] Afficher la liste des articles sur la page d'accueil
    - Pour rappel, vous avez déjà le code pour, les articles sont déjà injectés dans la page d'accueil (src/pages/front-end/index.twig), il faut juste les afficher
- [ ] Mettre en place un système de pagination pour les articles
- [ ] Appliquer des meta og sur toutes les pages
    - Il existe des générateurs : [https://metatags.io/](https://metatags.io/)
    - Note : **le lien des images doit être absolu**

### Administration
- [ ] Rendre le site responsive (des mixins scss et tailwind sont là pour vous aider)
    - Il n'y a pas de maquette responsive, à vous de vous adapter
- [ ] Gérer la date des journées portes ouvertes depuis le backoffice qui créera un fichier json
    - Le fichier sera lu côté front-end
    - Le fichier n'existe pas, vous devez le mettre dans le dossier src/data
- [ ] Afficher en "temps réel" le nombre de caractères dans la balise &lt;textarea>
    - Lors de l'édition d'une SAE, il y a une limite de caractères, indiquez à l'utilisateur le nombre de caractères déjà présents
- [ ] Gérer "proprement" les messages d'erreur
    - Présentement, certains messages d'erreurs sont dupliqués, proposez une solution plus maintenable
    - Les messages d'erreurs sont dans les dossiers "server" et "database"
- [ ] Permettre à l'utilisateur mobile de changer de page grâce à la liste déroulante présente pour la pagination
    - **Les** listes déroulantes sont déjà présentes, il ne manque plus que la fonctionnalité
- [ ] Affichez les messages envoyés depuis le formulaire de contact
    - Il n'y a pas de schéma pour les messages, vous devez le réaliser et créer les api pour (POST et GET)
    - N'oubliez pas d'ajouter les routes pour accéder aux messages dans le fichier server/`back-end-router.js` 
- [ ] Permettre d'ajouter, éditer un article
    - Toutes les routes sont déjà prêtes pour manipuler la base de données
    - Le champ permettant l'upload d'image doit impérativement d'appeller "image", sinon ça ne fonctionnera pas
    - La suppression est déjà gérée
    - Inspirez-vous de ce qui a déjà été fait pour la partie SAE, partie qui est complète
- [ ] Ajouter une validation côté client des formulaires
    - Vous pouvez utiliser un outil comme validator.js. [Voir exemples](https://github.com/jaywcjlove/validator.js)

# FAQ - Foire Aux Questions
- **Est-il possible d'utiliser tailwindcss également sur le front-office ?**

  Oui, vous avez tout à fait le droit. A noter que tailwind modifiera un peu l'apparence initiale du site, mais ce n'est pas grave.

- **Puis-je mettre sur github ce projet ?**

Oui, bien sûr, on vous encourage même à le faire. Le projet est prêt à être géré par git grâce à au fichier .gitignore. Il vous suffit juste créer un nouveau projet sur votre compte github puis le cloner et mettre le contenu du dossier code/ dans votre projet fraîchement cloné.
