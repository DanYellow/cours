<link
    rel="stylesheet"
    href="https://danyellow.net/cours-mmi/consignes.css"
/>

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
Suite au projet abordé durant le cours de CI/CD, vous allez devoir mettre en application les nombreux acquis obtenus durant ce cours (et le cursus MMI en général). Le but de ce travail en groupe (3-4 membres / groupe) est d'améliorer le projet de la partie 3 du cours de CI/CD dans différents domaines :
- Front-end
- Back-end
- DevOps

Le projet se trouve toujours au même endroit :
- [Télécharger le projet](https://github.com/DanYellow/cours/raw/refs/heads/main/developpement-web-et-dispositif-interactif-s6/travaux-pratiques/numero-4/developpement-web-et-dispositif-interactif-s6_travaux-pratiques_numero-4.ressources.zip)

## Rendus attendus
- Lien de votre projet sur GitHub - Un seul rendu attendu par groupe

<p class="note-attention">Note : La version finale de votre projet doit être tagguée. Le plus simple est de la tagguer en version 1.0.0 pour respecter la norme semantic version, le fichier CHANGELOG.md n'est pas obligatoire. Néanmoins rien ne vous empêche d'ajouter des fonctionnalités et corriger des bugs après cette version 1.0.0. Pour rappel, vous avez le node module "release-it", ou vous pouvez faire le tag manuellement grâce à la commande <code>git tag</code>. Exemple : <code>git tag 1.0.10</code>.</p>

- [Voir documentation git tag](https://git-scm.com/docs/git-tag/fr)

## Notation
Les critères suivants seront évalués :

- Qualité du code et accessibilité
- Affichage dans le navigateur
- Bon fonctionnement des fonctionnalités attendues

## Votre liste à faire
- [x] Lire les consignes
- [ ] Mettre le projet sur GitHub et ajouter vos collaborateurs
  - N'oubliez pas de mettre le fichier .gitignore du projet fourni
- [ ] Générer un token pour l'API GitHub
  - [Didacticiel sur la création de token GitHub](https://docs.github.com/fr/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
  > - Note : Chaque membre peut créer son propre token et l'utiliser en local, toutefois un seul d'entre-eux sera utilisé sur les serveurs de production
  > - Note 2 : **Ce token est une donnée sensible, il ne doit pas être dans votre dépôt.** Passez par les secrets et variables d'environnement
  > <p class="note-importante">Note 3 : Si, le token est commité, GitHub refusera votre push. Et vous devrez modifier votre commit, ou l'annuler. Faites très attention</p>

### Front-end
- [ ] Charger les données du Pokédex lié au Pokémon affiché
  - Exemple : Vous chargez le Pokémon 245, par défaut sa génération n'est pas chargée ce qui fait qu'on ne peut pas voir le Pokémon suivant et précédent
- [ ] Faire défiler la page jusqu'au Pokémon présentement affiché dans la modale
- [ ] Afficher les noms étrangers des Pokémon
- [ ] Proposer un lien vers la fiche du Pokémon sur le site poképedia.fr depuis la modale
- [ ] En mode liste uniquement, afficher les types du Pokémon
  - Pour ce faire, vous devrez utiliser les containers queries
    - [Voir documentation CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
    - [Voir documentation plugin tailwind CSS container queries](https://github.com/tailwindlabs/tailwindcss-container-queries)
- [ ] Afficher les numéros du Pokémon en fonction des régions
  - En fonction des jeux, les Pokémon n'ont pas forcément le même numéro dans le Pokédex, c'est ces numéros dont on parle
- [ ] Changer la couleur de la balise meta "theme-color" en fonction du premier type du Pokémon affiché dans la modale
  - Les couleurs liés aux types sont gérées dans la configuration tailwind
  - Note : Ceci ne peut se voir que sur un smartphone ou un simulateur de smartphone, pas le mode responsive du navigateur
- [ ] En utilisant l'API "tcgdex.net", affichez les cartes **françaises** relatives au Pokémon affiché dans la modale. L'affichage devra se faire de la façon la plus adaptée possible, en sachant que le site est responsive
  - [Accéder à l'API tcgdex](https://tcgdex.dev)
  - **La réponse d'API doit être mise en cache**. Si on réaffiche le Pokémon, la requête vers tcgdex ne doit pas être réeffectuée. Un système de cache est déjà présent, servez-vous en
  - Si un Pokémon n'a pas de carte, et que vous utilisez la balise &lt;details>, cette dernière doit être désactivée
  - Optionnel : Au clic sur une carte, vous devez afficher ses détails
- [ ] Grâce au module wavesurfer.js, laissez paraître le spectre sonore du cri du Pokémon sélectionné
  - On doit pouvoir rejouer le cri
- [ ] Avec l'aide de l'API GitHub, lister les membres du groupe
  - Pour chaque contributeur, vous devez afficher (au moins) :
    - Nom + prénom (pas forcément présents), pseudonyme le tout devant rediriger vers le compte du membre au clic
  - [Documentation de l'API "Collaborators"](https://docs.github.com/fr/rest/collaborators/collaborators?apiVersion=2022-11-28#list-repository-collaborators)
  - [Documentation de l'API "Users"](https://docs.github.com/fr/rest/users/users?apiVersion=2022-11-28#get-a-user)
  > Notes :
  > - Pour éviter d'exposer votre token d'API Github. Deux solutions sont envisageables :
  >     1. Passer par un langage serveur (PHP, Python...) pour effectuer la requête et renvoyer le résultat au front-end (asynchrone ou non)
  >     2. Injecter, via vite, ces données dans le projet (moteur de template - nunjucks ou autre - ou javascript) :
  >         - Grâce aux requêtes que vous effecturez depuis le fichier de configuration de vite
  >         - ou via un fichier env que vous générez via la CI / CD
  > - Pensez à utiliser des fichiers d'env pour stocker votre token d'API, token qui ne doit pas être commité. Pour rappel, vous avez le site [singleuse.link](https://singleuse.link/create) pour envoyer des données de façon sécurisée et temporaire entre-vous

> Le site est reponsive et doit le rester. Les styles sont gérés via tailwindcss.

### Back-end / Administration
_Le langage de programmation est à votre convenance et ce n'est pas obligatoire de mettre en place un système d'authentification_

- [ ] Créer un formulaire permettant d'uploader les jaquettes de jeux
  - Lors de l'upload d'une jaquette, proposez une liste déroulante listant tous les jeux disponibles (src/utils.js) pour sélectionner le jeu dont on veut uploader la jaquette
- [ ] Avec une API, mettre en place un système d'upload des jaquettes de jeux (fournies avec l'exercice)
  - [Télécharger les jaquettes](https://github.com/DanYellow/cours/blob/main/developpement-web-et-dispositif-interactif-s6/developpement-web-et-dispositif-interactif-s6.exercice.zip)
- [ ] Renvoyer toutes les jaquettes de jeux via une API (sans authentification) qui sera consommée par le front-end pour les afficher dans la modale partie "Apparitions"
    - Note : L'api "pokeapi" retourne la présence d'un Pokémon dans un jeu de la façon suivante :
        ```json
        [{"game_index":9,"version":{"name":"red","url":"https://pokeapi.co/api/v2/version/1/"}},{"game_index":9,"version":{"name":"blue","url":"https://pokeapi.co/api/v2/version/2/"}},{"game_index":9,"version":{"name":"yellow","url":"https://pokeapi.co/api/v2/version/3/"}},{"game_index":2,"version":{"name":"gold","url":"https://pokeapi.co/api/v2/version/4/"}}]
        ```
        Le mieux est donc d'associer l'image à la même valeur que la clé "name" que pokeapi pour afficher plus facilement la bonne jaquette, le plus simple étant d'utiliser une base de données.

### CI/CD
- [ ] Mettre en place **pour la branche "main"**, une pipeline qui
  - [ ] Déploie le projet en production
  - [ ] Exécute les tests e2e de façon optimale
  - [ ] Exécute les tests unitaires
  - [ ] Migre la base de données (si besoin)
  - [ ] Rendre inaccessible les fichiers .env au public
    - Autrement dit, on ne doit pas pouvoir accéder aux fichiers en écrivant mon.url/.env
    - Deux solutions possibles :
      - Passer par un fichier .htaccess pour bloquer l'accès au fichier .env, ce fichier peut être crée durant la pipeline avec le code suivant, il peut être exécuté directement depuis le fichier yaml ou depuis un fichier .sh :
      ```sh
      cat > .htaccess << EOF
      # Contenu du fichier .htaccess
      EOF
      ```
      - Ne pas mettre les fichier .env à la racine du projet, ils sont ainsi plus compliqués à trouver (il faudra penser à modifier votre config vite)
mysqldump -u YourUser -p YourDatabaseName > wantedsqlfile.sql
> La pipeline de la branche main doit être automatique et se lancer quand on fusionne la branche (évènement "push"). Et toute branche qui va être fusionnée (évènement "merge_request") doit être testée par la pipeline.

- [ ] Mettre en place **pour la branche "develop"**, une pipeline qui
  - [ ] Déploie le projet dans un dossier "develop"
      - Note : Le dossier doit être crée par la CI/CD sur le serveur. Ainsi, vous pouvez créer des dossiers de "stage" à la volée en fonction de la branche
      - Note 2 : Si vous souhaitez utiliser un serveur chacun pour la phase de dev, vous pouvez utiliser des inputs de type "environnement" et ainsi configurer vos accès SSH et autres en fonction. Comme tout _input_, ça ne fonctionne qu'avec des pipelines manuelles
        - [En savoir plus sur les environnements](https://docs.github.com/fr/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment#creating-an-environment)
      - Note 3 : Le nom "develop" est un nom exemple, elle n'est pas vraiment une branche intermédiaire, c'est plutôt une branche que vous créez à la volée pour ensuite être fusionnée avec la branche main
  - [ ] Exécute les tests e2e de façon optimale
  - [ ] Exécute les tests unitaires
  - [ ] Migre la base de données (si besoin)
  - [ ] Affiche la branche déployée sur le site

> Le nom de la branche se trouve dans la variable "github.ref_name". Cette pipeline peut être manuelle ou automatique.

- [ ] Génèrer un artifact contenant uniquement le rapport HTML de playwright si et seulement si les tests échouent
  - A l'heure actuelle, playwright est configuré pour générer un rapport en annotations en mode CI/CD et en html en local


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
> Note 2 : Par défaut, la commande "mysqldump" ajoute dans le fichier de dump la commande MySQL "CREATE DATABASE [...]", dépendamment de votre hébergeur de base de données, cette commande sera refusée (car vous ne pouvez pas créer une autre base de données). Pour éviter ceci, ajoutez le paramètre "--no-create-db".

### Importer base de données
_On part du principe que vous avez injecté les secrets via la clé ENV sous forme de json depuis votre pipeline grâce à la fonction toJson()_
```yml
# pipeline.yml
[...]
env:
    SECRETS_CONTEXT: ${{ toJson(secrets) }}
```

```sh
# bash
MYSQL_USER=$(echo $SECRETS_CONTEXT | jq '.MYSQL_USER');
MYSQL_PASSWORD=$(echo $SECRETS_CONTEXT | jq '.MYSQL_PASSWORD');
MYSQL_SERVER=$(echo $SECRETS_CONTEXT | jq '.MYSQL_SERVER');
MYSQL_DATABASE=$(echo $SECRETS_CONTEXT | jq '.MYSQL_DATABASE');

mysql -u {$MYSQL_USER} -p{$MYSQL_PASSWORD} -h {$MYSQL_SERVER} {$MYSQL_DATABASE} < dump-file.sql
```

Si la méthode ci-dessus fonctionne (tout comme celle du mysqldump), elle n'est pas top niveau sécurité, dans les détails du job, vous devriez voir :
> Warning: Using a password on the command line interface can be insecure.

On évite en général de mettre dans la ligne de commandes un mot de passe, on peut être épié. Dans le contexte de GitHub Actions, c'est 100% sécurisé grâce au système de secrets, mais voyons une autre méthode qui vous sera utile dans un autre contexte.

```bash
# bash
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
En plus d'augmenter la sécurité, cette méthode vous dispense de mettre le mot de passe, l'utilisateur, le serveur et le nom de base de données à chaque fois (chacun des paramètres pouvant être omis du fichier de configuration et mis dans la commande). A noter également que vous pouvez exécuter des commandes comme un `INSERT` en ligne de commandes de la façon suivante :

```sh
mysql --defaults-extra-file=.my.cnf --execute="SHOW TABLES;"
```

## Notes
- Le projet repose sur les API suivantes :
  - [https://tyradex.vercel.app/](https://tyradex.vercel.app/)
  - [https://pokeapi.co/docs/v2/](https://pokeapi.co/)
- Bien que vous allez devoir rajouter une nouvelle page pour gérér les jaquettes, il n'est pas obligatoire de gérer les tests e2e et unitaires, c'est à votre convenance de les réaliser. Pour rappel, les tests unitaires utilisent vitest et non jest
  - [Voir documentation de vitest](https://vitest.dev/guide/)
- Vous devez respecter l'accessibilité et les différentes règles d'ergonomie


## Pour aller plus loin

### Front-end
- Mettre en place un système de comparaison de fiche entre deux Pokémon

### Back-office / Administration
- Générer une image non-retina d'une image uploadée et afficher l'image en fonction de sa résolution grâce à l'attribut `srcset` de la balise `img`

### CI/CD
- Afficher le lien de téléchargement de l'artifact du rapport Playwright dans une annotation
