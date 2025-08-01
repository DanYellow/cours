# Devoir noté - Développement Web et dispositif interactif
_Les consignes pourront être modifiées._

- [Devoir noté - Développement Web et dispositif interactif](#devoir-noté---développement-web-et-dispositif-interactif)
  - [Contexte du projet](#contexte-du-projet)
  - [Rendus attendus](#rendus-attendus)
  - [Notation](#notation)
  - [Votre liste à faire](#votre-liste-à-faire)
    - [Front-end](#front-end)
    - [Back-end / Administration](#back-end--administration)
    - [CI/CD](#cicd)
  - [Migration base de données (MySQL)](#migration-base-de-données-mysql)
    - [Exporter base de données](#exporter-base-de-données)
    - [Importer base de données](#importer-base-de-données)
  - [Notes](#notes)
  - [Pour aller plus loin](#pour-aller-plus-loin)
    - [Front-end](#front-end-1)
    - [Back-office / Administration](#back-office--administration)
    - [CI/CD](#cicd-1)


## Contexte du projet
Suite au projet abordé durant le cours de CI/CD (Continous Integration / Continuous Delivery), vous allez devoir mettre en application les nombreux acquis obtenus durant ce cours (et le cursus MMI en général). Le but de ce travail en groupe (3-4 membres / groupe) est d'améliorer le projet de la partie 3 du cours de CI/CD dans différents domaines :
- Front-end
- Back-end
- DevOps

Le projet se trouve toujours au même endroit :
- [Télécharger le projet (dossier partie 3)](https://github.com/DanYellow/cours/raw/refs/heads/main/developpement-web-et-dispositif-interactif-s6/travaux-pratiques/numero-4/developpement-web-et-dispositif-interactif-s6_travaux-pratiques_numero-4.ressources.zip)

> Même si vous avez récupéré le projet durant le TP, il est préférable de récupérer la dernière version, des modifications ont pu avoir lieu entre-temps.

## Rendus attendus
- Lien de votre projet sur GitHub - Un seul rendu attendu par groupe

> Note : **La version finale de votre projet doit être tagguée.** Le plus simple est de la tagguer en version 1.0.0 pour respecter la norme semantic version, le fichier CHANGELOG.md n'est pas obligatoire. Néanmoins rien ne vous empêche d'ajouter des fonctionnalités et corriger des bugs après cette version 1.0.0. Pour rappel, vous avez le node module "release-it", ou vous pouvez faire le tag manuellement grâce à la commande <code>git tag</code>. Exemple : <code>git tag 1.0.10</code>. Par ailleurs, n'oubliez pas le paramètre <code>fetch-depth: 0</code> à l'action "actions/checkout@v4", si vous souhaitez générer proprement un CHANGELOG.md (voir les instructions du TP sur la CI/CD).
>
> **C'est la version la plus haute de votre projet qui sera testée, pas une branche.**

- [Voir documentation git tag](https://git-scm.com/docs/git-tag/fr)
- [Voir node module release-it](https://www.npmjs.com/package/release-it)

## Notation
Les critères suivants seront évalués :

- Qualité du code et accessibilité
- Affichage dans le navigateur
- Bon fonctionnement des fonctionnalités attendues
  - Chaque partie sera notée indépendamment, vous aurez donc trois notes

## Votre liste à faire
- [x] Lire les consignes
- [ ] Mettre le projet sur GitHub et ajouter vos collaborateurs
  - N'oubliez pas de mettre le fichier .gitignore du projet fourni
  - [Accéder documentation collaborators de GitHub](https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28)
- [ ] Générer un token pour l'API GitHub
  - [Didacticiel sur la création de token GitHub](https://docs.github.com/fr/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
  > - Note : Chaque membre peut créer son propre token et l'utiliser en local, toutefois un seul d'entre-eux sera utilisé sur les serveurs de production
  > - Note 2 : **Ce token est une donnée sensible, il ne doit pas être dans votre dépôt.** Passez par les secrets et variables d'environnement. Pour rappel, vite importe automatiquement le contenu de vos fichiers env, si les deux conditions suivantes sont respectées :
  >   - Chaque variable doit commencer par "VITE_"
  >   - Le nom du fichier d'environnement doit s'appeler ".env" ou contenir le nom de l'environnement dans son nom. Ex : ".env.development". A noter qu'il est possible de rajouter l'extension ".local" pour ne pas commiter le fichier
  > - **Note 3 : Si, le token est commité, GitHub refusera votre push. Et vous devrez modifier votre commit, ou l'annuler. Faites très attention**
- [ ] Remettre un fichier texte contenant :
  - L'URL du projet sur GitHub
  - L'URL du site déployé

> Pensez à expliquer comment la mise en place de votre projet : outils à installer, schéma de base de données, template de fichiers d'env, etc. **Via un fichier README.md à la racine du projet.**

### Front-end
- [ ] Charger les données du Pokédex lié au Pokémon affiché
  - Exemple : Vous chargez directement le Pokémon 245, par défaut sa génération n'est pas chargée ce qui fait qu'on ne peut pas voir le Pokémon suivant et précédent
  - Optionnel : Afficher le nom du dex en français. Par exemple la région d'Unys est appelée "Unova" en anglais
- [ ] Afficher les noms étrangers des Pokémon (anglais et japonais suffisent) dans la modale
- [ ] Proposer un lien vers la fiche du Pokémon sur le site poképedia.fr depuis la modale
- [ ] Changer le favicon pour le sprite du Pokémon affiché
  - Ne pas oublier de réinitaliser le favicon quand on revient sur le Pokédex
- [ ] **En mode liste uniquement,** afficher les types du Pokémon
  - Pour ce faire, vous devrez utiliser les containers queries (**pas de javascript**)
    - [Voir documentation CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- [ ] Afficher les numéros du Pokémon en fonction des régions
  - En fonction des jeux, les Pokémon n'ont pas forcément le même numéro dans le Pokédex, ce sont ces numéros dont on parle
  - L'API Pokeapi retournant le nom des régions en anglais, il y a une constante "POKEDEX" qui contient un dictionnaire faisant la relation entre l'API et les noms en français
- [ ] Corriger les tests unitaires
  - Note : Supprimer les tests qui échouent, ce n'est pas corriger les tests
- [ ] Changer la couleur de la balise meta "theme-color" en fonction du premier type du Pokémon affiché dans la modale
  - Les couleurs liées aux types sont gérées dans le fichier main.css
  - **Note : Ceci ne peut se voir que sur un smartphone ou un simulateur de smartphone, pas le mode responsive du navigateur**
- [ ] En utilisant l'API "tcgdex.net", affichez les cartes **françaises** relatives au Pokémon affiché dans la modale. L'affichage devra se faire de la façon la plus adaptée possible, en sachant que le site est responsive
  - [Accéder à l'API tcgdex](https://tcgdex.dev/rest/filtering-sorting-pagination)
  - **La réponse d'API doit être mise en cache**. Si on réaffiche le Pokémon, la requête vers tcgdex ne doit pas être réeffectuée. Un système de cache est déjà présent, servez-vous en
  - Si un Pokémon n'a pas de carte, et que vous utilisez la balise &lt;details>, cette dernière doit être désactivée
  - Optionnel : Au clic sur une carte, vous devez afficher ses détails
- [ ] Grâce au module wavesurfer.js, laissez paraître le spectre sonore du cri du Pokémon sélectionné
  - [Voir documentation de wavesurfer.js](https://www.npmjs.com/package/wavesurfer.js)
  - On doit pouvoir rejouer le cri
  - Le cri du Pokémon est retourné par l'API pokeapi
- [ ] Créditer les ressources externes utilisées :
  - **API**
    - https://tyradex.vercel.app/
    - https://pokeapi.co/
    - https://tcgdex.dev/
  - **Icônes**
    - https://github.com/partywhale/pokemon-type-icons
  > Vous prendrez également soin d'afficher le logo de l'université et l'année universitaire
  > - [Accéder aux logos de l'université](https://github.com/DanYellow/cours/tree/main/logos)
- [ ] Avec l'aide de l'API GitHub, lister les membres du groupe
  - Pour chaque contributeur, vous devez afficher (au moins) :
    - Nom + prénom (pas forcément présents), pseudonyme le tout devant rediriger vers le compte du membre au clic
  - [Documentation de l'API "Collaborators"](https://docs.github.com/fr/rest/collaborators/collaborators?apiVersion=2022-11-28#list-repository-collaborators)
  - [Documentation de l'API "Users"](https://docs.github.com/fr/rest/users/users?apiVersion=2022-11-28#get-a-user)
  > Notes :
  > - Pour éviter d'exposer votre token d'API GitHub. Deux solutions sont envisageables :
  >     1. Passer par un langage serveur (PHP, Python...) pour effectuer la requête et renvoyer le résultat au front-end (asynchrone ou non)
  >     2. Injecter, via vite, ces données dans le projet (moteur de template - nunjucks ou autre - ou javascript) :
  >         - Grâce aux requêtes que vous effecturez depuis le fichier de configuration de vite
  >         - ou via un fichier env que vous générez via la CI / CD
  > - Pensez à utiliser des fichiers d'env pour stocker votre token d'API, token qui ne doit pas être commité. Pour rappel, vous avez le site [singleuse.link](https://singleuse.link/create) pour envoyer des données de façon sécurisée et temporaire entre-vous

> Le site est reponsive et doit le rester. Les styles sont gérés via tailwindcss en majorité.
> **C'est la version 4 de tailwind qui est utilisée.** Si vous souhaitez savoir les nouveautés, [ça se passe ici - vidéo en français moins de 20 minutes](https://grafikart.fr/tutoriels/tailwindcss-v4-2265)

### Back-end / Administration
_Le langage de programmation est à votre convenance et ce n'est pas obligatoire de mettre en place un système d'authentification_

- [ ] Créer un formulaire permettant d'uploader les jaquettes de jeux
  - Lors de l'upload d'une jaquette, proposez une liste déroulante listant tous les jeux disponibles (src/utils.js) pour sélectionner le jeu dont on veut uploader la jaquette
  - Les images doivent être renommées de façon "sanitized". Les accents et autres espaces doivent être remplacés tout comme la casse doit passer en minuscules
    - Ex : Let's_Go Évoli.jpg -> let-s-go-evoli.jpg (vous pouvez nommer le fichier d'une autre façon, mais le nom doit être _sanitized_)
    - [Télécharger les jaquettes](https://github.com/DanYellow/cours/raw/refs/heads/main/developpement-web-et-dispositif-interactif-s6/developpement-web-et-dispositif-interactif-s6.exercice.zip)
- [ ] Afficher toutes les jaquettes de jeux dans la modale partie "Apparitions"
    - Note : L'api "pokeapi" retourne la présence d'un Pokémon dans un jeu de la façon suivante :
        ```json
        [{"game_index":9,"version":{"name":"red","url":"https://pokeapi.co/api/v2/version/1/"}},{"game_index":9,"version":{"name":"blue","url":"https://pokeapi.co/api/v2/version/2/"}},{"game_index":9,"version":{"name":"yellow","url":"https://pokeapi.co/api/v2/version/3/"}},{"game_index":2,"version":{"name":"gold","url":"https://pokeapi.co/api/v2/version/4/"}}]
        ```
        Le mieux est donc d'associer l'image à la même valeur que la clé "name" que pokeapi pour afficher plus facilement la bonne jaquette.
        Vous pouvez faire ça via une base de données où tout simplement en lisant le contenu du dossier où se trouve les jaquettes uploadées

### CI/CD

> **Pour rappel, vos actions doivent être dans un dossier ".github/workflows". Sans ça, votre pipeline ne sera jamais détectée par GitHub.**

- [ ] Mettre en place **pour la branche "main"**, une pipeline qui
  - [ ] Déploie le projet en production
  - [ ] Exécute les tests e2e de façon optimale
  - [ ] Lint le code avec eslint
  - [ ] Exécute les tests unitaires
  - [ ] Migre la base de données (si applicable)
  - [ ] Rendre inaccessible les fichiers .env au public (si applicable)
    - Autrement dit, on ne doit pas pouvoir accéder aux fichiers en écrivant mon.url/.env
    - Deux solutions possibles :
      - Passer par un fichier .htaccess pour bloquer l'accès au fichier .env, ce fichier peut être crée durant la pipeline avec le code suivant, il peut être exécuté directement depuis le fichier yaml ou depuis un fichier .sh :
      ```sh
      cat > .htaccess << EOF
      # Contenu du fichier .htaccess
      EOF
      ```
      - Ne pas mettre les fichiers .env à la racine du projet, ils sont ainsi plus compliqués à trouver (il faudra penser à modifier votre config vite)
  - [ ] Affiche le nom de la dernière personne qui a déployé avec l'heure et la date
    - Le nom de l'auteur se trouve dans l'objet "github"
      -  [Accéder à la documentation](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#github-context)


> La pipeline de la branche main doit être automatique et se lancer quand on effectue une pull_request dessus. Et toute branche qui va être fusionnée (évènement "merge_request") doit être testée par la pipeline.
> - [En savoir plus sur l'évènement pull_request](https://frontside.com/blog/2020-05-26-github-actions-pull_request/)

Pour la pipeline, vous pouvez utiliser la correction de la partie 3 du TP de CI/CD et adapter en fonction des besoins du devoir.
  - [Voir correction](https://github.com/DanYellow/cours/blob/main/developpement-web-et-dispositif-interactif-s6/travaux-pratiques/numero-4/ressources/github-actions/correction/partie-3/.github/workflows/release.yml)

## Migration base de données (MySQL)
La migration de base de données peut également se faire via la pipeline CI/CD. Si vous utilisez MySQL, il faudra faire un export de la base de données (appelé aussi "dump") puis l'importer.

### Exporter base de données
```bash
# bash
mysqldump -u {USER} -p{PASSWORD} {DATABASE} > dump-file.sql
# Note : si vous n'avez pas de mot de passe, omettez la partie "-pPASSWORD"
# Note 2 : -p et {PASSWORD} sont collés, c'est étrange, mais c'est comme ça
```
Il faudra commiter le fichier de dump.

> Note : Si vous ajoutez le paramètre "--no-data", nous n'exporterez que le schéma de base de données
>
> Note 2 : Par défaut, la commande "mysqldump" ajoute dans le fichier de dump la commande MySQL "CREATE DATABASE [...]", dépendamment de votre hébergeur de base de données, cette commande sera refusée (car vous ne pouvez pas créer une autre base de données). Pour éviter ceci, ajoutez le paramètre "--no-create-db".

### Importer base de données
_On part du principe que vous avez injecté les secrets via la clé ENV sous forme de json depuis votre pipeline grâce à la fonction toJson() comme ci-dessous_
```yml
# pipeline.yml
[...]
env:
    SECRETS_CONTEXT: ${{ toJson(secrets) }}
```

```sh
# (fichier) bash
MYSQL_USER=$(echo $SECRETS_CONTEXT | jq '.MYSQL_USER');
MYSQL_PASSWORD=$(echo $SECRETS_CONTEXT | jq '.MYSQL_PASSWORD');
MYSQL_SERVER=$(echo $SECRETS_CONTEXT | jq '.MYSQL_SERVER');
MYSQL_DATABASE=$(echo $SECRETS_CONTEXT | jq '.MYSQL_DATABASE');

mysql -u {$MYSQL_USER} -p{$MYSQL_PASSWORD} -h {$MYSQL_SERVER} {$MYSQL_DATABASE} < dump-file.sql
```
> Note : Le contenu du script bash peut également être mis directement dans la pipeline. A votre convenance.

Si la méthode ci-dessus fonctionne (tout comme celle du mysqldump), elle n'est pas top niveau sécurité, dans les détails du job, vous devriez voir :
> Warning: Using a password on the command line interface can be insecure.

On évite en général de mettre dans la ligne de commandes un mot de passe, on peut être épié. Dans le contexte de GitHub Actions, c'est 100% sécurisé grâce au système de secrets, mais voyons une autre méthode qui vous sera utile dans un autre contexte.

```bash
# (fichier) bash
MYSQL_USER=$(echo $SECRETS_CONTEXT | jq '.MYSQL_USER');
MYSQL_PASSWORD=$(echo $SECRETS_CONTEXT | jq '.MYSQL_PASSWORD');
MYSQL_SERVER=$(echo $SECRETS_CONTEXT | jq '.MYSQL_SERVER');
MYSQL_DATABASE=$(echo $SECRETS_CONTEXT | jq '.MYSQL_DATABASE');

cat > .my.cnf << EOF
[client]
user=$MYSQL_USER
password=$MYSQL_PASSWORD
database=$MYSQL_DATABASE
host=$MYSQL_SERVER
EOF

# Rend le fichier lisible que par l'utilisateur qui l'a crée
chmod 400 .my.cnf

mysql --defaults-extra-file=.my.cnf < database.sql
```
En plus d'augmenter la sécurité, l'utilisation d'un fichier .cnf vous dispense de mettre le mot de passe, l'utilisateur, le serveur et le nom de base de données à chaque fois, chacun des paramètres pouvant être omis du fichier de configuration (.cnf) et mis dans la commande. A noter également que vous pouvez exécuter des commandes comme un `INSERT` en ligne de commandes de la façon suivante :

```sh
mysql --defaults-extra-file=.my.cnf --execute="SHOW TABLES;"
```

## Notes
- Le code existant repose sur les API suivantes :
  - [https://tyradex.vercel.app/](https://tyradex.vercel.app/)
  - [https://pokeapi.co/docs/v2/](https://pokeapi.co/)
- Bien que vous allez devoir rajouter une nouvelle page pour gérér les jaquettes, il n'est pas obligatoire de gérer les tests e2e et unitaires, c'est à votre convenance de les réaliser. Pour rappel, les tests unitaires utilisent vitest et non jest
  - [Voir documentation de vitest](https://vitest.dev/guide/)
- Vous devez respecter l'accessibilité et les différentes règles d'ergonomie
- Vous pouvez utiliser [commitizen](https://commitizen-tools.github.io/commitizen/) pour vous aider à créer des commits correctement labellisés
- **L'accès SSH à votre serveur, le token GitHub ou les accès MySQL sont des données sensibles, elles doivent être gérées par un secret**
  - [Didacticiel sur les GitHub Secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- Si vous souhaitez charger des fichiers .env en PHP, vous pouvez utiliser le code suivant (à adapter) :
    ```php
    // Source : https://stackoverflow.com/questions/67963371/load-a-env-file-with-php#answer-77305725
    $env = file_get_contents("/path/.env");
    $lines = explode("\n", $env);

    foreach ($lines as $line) {
        preg_match("/([^#]+)\=(.*)/", $line, $matches);
        if (isset($matches[2])) {
            putenv(trim($line));
        }
    }

    // Exemple d'utilisation
    echo getenv('MY_KEY');
    ```

## Pour aller plus loin

### Front-end
- Mettre en place un système de comparaison de fiche entre deux Pokémon
- Grâce à [l'API `Navigation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigation), proposer un historique des fiches détails précemment affichées, permettant à l'utilisateur de les réafficher plus rapidement
  - Note : A ce jour (01/2025), [l'API `Navigation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigation) ne fonctionne pas sur Firefox et Safari
- Ajouter un mode sombre

### Back-office / Administration
- Générer une image non-retina d'une image uploadée et afficher l'image en fonction de sa résolution grâce à l'attribut `srcset` de la balise `img`

### CI/CD
- Génèrer un artefact contenant uniquement le rapport HTML de playwright si et seulement si les tests échouent
  - A l'heure actuelle, playwright est configuré pour générer un rapport en annotations en mode CI/CD et en html en local
  - [Voir exemple de configuration](https://playwright.dev/docs/ci#on-pushpull_request)
- Générer un artefact contenant uniquement le rapport HTML de vitest (si erreur ou non)
  - Vous devrez modifier la configuration de vitest (fichier vite.config.js - clé "test") en vous aidant de la documentation
    - [Voir documentation du html reporter pour vitest](https://vitest.dev/guide/reporters#html-reporter)
> Le rapport HTML ne doit pas être commité, pensez bien à l'ajouter au fichier .gitignore
