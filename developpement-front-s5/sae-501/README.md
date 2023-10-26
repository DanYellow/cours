# SAÉ 501 - Développer pour le web ou Concevoir un dispositif interactif
_Les consignes pourront être modifiées._

> **IMPORTANT :** Il est préférable d'avoir une version récente de nodejs. Si jamais, pour diverses raisons, vous ne pouvez pas installer la dernière version de nodejs, passez pas un outil comme nvm pour pouvoir utiliser plusieurs versions de nodejs sur votre ordinateur.

## Contexte de la SAÉ
Vu en S1 et S2, le site dédié au BUT Métiers du Multimédia et de l'Internet (MMI) fait son retour. Dans la SAÉ 105, vous aviez pu découvrir le HTML et le CSS, puis en S2 appliquer vos connaissances en PHP/MySQL. CEtte fois-ci en S5, vous allez travailler une nouvelle fois sur ce site, mais avec des technologies bien plus modernes : twig, scss, vite, express... Dans le but de valider les Apprentissages Critiques (AC) suivants : 

**R5.DWeb-DI.06 | Développement back avancé**
- AC34.02 | Développer à l’aide d’un framework de développement côté serveur

**R5.DWeb-DI.05 | Développement front avancé**
- AC34.02 | Développer à l’aide d’un framework de développement côté client

Vu que votre TP est très peu nombreux, ce projet sera à faire en binôme ou en trinôme. Un chef devra être désigné, car un seul rendu de projet est attendu sur l'ENT. 

Vous partirez du code fourni et contenu dans le dossier `"code/"`.

> [Télécharger le code de départ la SAE](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fintegration-web-s2%2Fsae-203)

Le projet se structure de la façon suivante :

```
code/
├── public/
│   ├── fonts/
│   ├── images/
│   └── styles/
├── server/
│   ├── backend-router.js
│   ├── frontend-router.js
│   └── index.js
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

### public/
Le dossier `public/` contient toutes les ressources qui n'ont pas à être gérées par vite, si vous avez un fichier css que vous n'importerez pas dans un fichier javascript, c'est ici qu'il faudra le mettre.

### server/
Jusqu'à présent, vous avez travaillé avec des serveurs Apache et la technologie PHP. Dans cette SAÉ, nous avons décidé de remplacer le PHP par nodejs et la technologie express. express est un framework nodejs permettant de développer en javascript côté serveur.

Dans le dossier `server/`, le fichier `index.js` permet de lancer le serveur et d'injecter des données, vous n'aurez pas besoin d'y toucher. En revanche, les fichiers `backend-router.js` et `frontend-router.js`, vous y toucherez, ils contiennent le routing du projet.

Autrement dit, ces fichiers définissent les fichiers qui doivent être chargés quand on accède à une url spécifique. Par exemple :
```js
// front-end-router.js
router.get("/hello", async (_req, res) => {
  res.render("pages/index.twig");
});
```
Le code ci-dessus indique que lorsqu'on accède à la page `localhost:9500/hello` avec la méthode GET, on charge la page "pages/index.twig". Le système de routing d'express est très puissant, nous aurons l'occasion d'en voir plus plus loin.
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

### src/layouts/
Le dossier `layouts/` est destinés pour les gabarits partagés entre vos pages, il y en a déjà un pour le frontend du site.

### src/pages/
Vous placerez ici les pages qui seront affichées à l'utilisateur final, ce dossier peut avoir des sous-dossiers, il faudra juste faire attention au chemin quand vous ferez votre routing.

### scripts/
Ce dossier contient les points d'entrées de vos bundles, ils seront compilés par vite lors de l'exécution de la commande `npm run build`. Le backend possède l'entrée `main.backend.js` et le frontend l'entrée `main.frontend.js`. Si vous pouvez créer des dossiers et des fichiers dedans, vous ne devez pas modifier le nom des fichiers déjà présents. De plus, vos fichiers javascript crées devront à la fin être importés dans l'un de ces deux fichiers, sinon, ils ne seront pas exécutés.

### styles/
Contient le css et scss du projet. Le projet importe déjà [tailwindcss](https://tailwindcss.com/docs/installation), le fait que nous utilisions nodejs fait que vous avez accès à l'auto-complétion des classes tailwind. Il vous suffit de commencer à écrire le nom d'une classe tailwindcss.

https://github.com/szymmis/vite-express#-transforming-html

https://blog.codeminer42.com/making-a-full-stack-app-with-vue-vite-and-express-that-supports-hot-reload/

https://web.archive.org/web/20200914121442/http://nightlycommit.github.io/twing/intro.html

https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server