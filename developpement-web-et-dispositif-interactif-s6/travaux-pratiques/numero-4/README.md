<link
    rel="stylesheet"
    href="https://danyellow.net/cours-mmi/consignes.css"
/>

# Devoir noté - Développement Web et dispositif interactif
_Les consignes pourront être modifiées._

## Contexte du projet
Suite au projet abordé durant le cours de CI/CD, vous allez devoir mettre en application les nombreux acquis obtenus durant ce cursus. En effet, le but de ce travail en groupe (3-4 membres / groupe) est d'améliorer le projet dans différents domaines :
- Front-end
- ~~Back-end~~
- DevOps

Le projet se trouve toujours au même endroit :
- [Télécharger le projet](https://github.com/DanYellow/cours/raw/refs/heads/main/developpement-web-et-dispositif-interactif-s6/travaux-pratiques/numero-3/developpement-web-et-dispositif-interactif-s6_travaux-pratiques_numero-4.ressources.zip)

## Rendus attendus
- Lien de votre projet sur github

## Notation
Les critères suivants seront évalués.

- Qualité du code et accessibilité
- Affichage dans le navigateur
- Bon fonctionnement des fonctionnalités attendues

## Votre liste à faire
- [x] Lire les consignes
- [ ] Mettre le projet sur github et ajouter vos collaborateurs
- [ ] Générer un token pour l'API github
  - [Didacticiel sur la création de token github](https://docs.github.com/fr/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
  > - Note : Chaque membre peut créer son propre token et l'utiliser en local, toutefois un seul d'entre-eux sera utilisé sur les serveurs
  > - Note 2 : **Ce token est une donnée sensible, elle ne doit pas être dans votre dépôt**
  > <p class="note-importante">Note 3 : Si, le token est commité, github refusera votre push. Et vous devrez modifier votre commit, ou l'annuler. Faites très attention</p>

### Front-end
- [ ] Charger les données du Pokédex lié au Pokémon affiché
  - Exemple : Vous chargez le Pokémon 245, par défaut sa génération n'est pas chargée ce qui fait qu'on ne peut pas voir le Pokémon suivant et précédent
- [ ] Faire défiler la page jusqu'au Pokémon présentement affiché dans la modale
- [ ] Afficher le nom étranger des Pokémon
- [ ] Afficher les numéros du Pokémon en fonction des régions
  - En fonction des jeux, les Pokémon n'ont pas forcément le même numéro, c'est ces numéros dont on parle
- [ ] Changer la couleur de la balise meta "theme-color" en fonction du premier type du Pokémon affiché dans la modale
  - Les couleurs liés aux types sont gérées dans la configuration tailwind
  - Note : Ceci ne peut se voir que sur un smartphone ou un simulateur
- [ ] En utilisant l'API "tcgdex.net", affichez les cartes **françaises** relatives au Pokémon affiché dans la modale
  - [Accéder à l'API tcgdex](https://tcgdex.dev)
  - **La réponse d'API doit être mise en cache**. Si on réaffiche le Pokémon, la requête vers tcgdex ne doit pas être réeffectuée
  - Optionnel : Au clic sur une carte, vous devez afficher ses détails
- [ ] Grâce au module wavesurfer.js, afficher le spectre sonore du cri du Pokémon affiché
  - On doit pouvoir rejouer le cri
- [ ] Avec l'aide de l'API github, lister les membres du groupe
  - Pour chaque contributeur, vous devez afficher (au moins) :
    - Nom + prénom (pas forcément présents), pseudonyme le tout devant rediriger vers le compte du membre au clic
  - [Documentation de l'API "Collaborators"](https://docs.github.com/fr/rest/collaborators/collaborators?apiVersion=2022-11-28#list-repository-collaborators)
  - [Documentation de l'API "Users"](https://docs.github.com/fr/rest/users/users?apiVersion=2022-11-28#get-a-user)
  > Notes :
  > - Pour éviter d'exposer votre token d'API Github. Deux solutions sont envisageables :
  >     1. Passer par un langage serveur (PHP, Python...) pour effectuer la requête et renvoyer le résultat au front-end (asynchrone ou non)
  >     2. Injecter, via vite, ces données dans votre fichier html (ou autre) :
  >         - Grâce aux vos requêtes que vous effecturez depuis le fichier de configuration de vite
  >         - ou via un fichier env que vous générez via la CI / CD
  > - Pensez à utiliser des fichiers d'env pour stocker votre token d'API, token qui ne doit pas être commité. Pour rappel, vous avez le site [singleuse.link](https://singleuse.link/create) pour envoyer des données de façon sécurisée et temporaire entre-vous

> Le site est reponsive et doit le rester. Les styles sont gérés via tailwindcss.

### CI/CD
- [ ] Mettre en place **pour la branche "main"**, une pipeline qui
  - [ ] Déploie le projet en production
  - [ ] Exécute les tests e2e de façon optimale
  - [ ] Exécute les tests unitaires
  - [ ] ~~Migre la base de données~~
  - [ ] Rendre inaccessible les fichiers .env au public
    - Autrement dit, on ne doit pas pouvoir accéder aux fichiers en écrivant mon.url/.env
    - Passez par un fichier .htaccess pour bloquer l'accès au fichier .env, ce fichier peut être crée durant la pipeline avec le code suivant, il peut être exécuté directement depuis le fichier yaml ou depuis un fichier .sh :
    ```sh
    cat > .htaccess << EOF
    # Contenu du fichier .htaccess
    EOF
    ```

> La pipeline de la branche main doit être automatique et se lancer quand on fusionne la branche (évènement "push"). Et toute branche qui va être fusionnée (évènement "merge_request") doit être testée par la pipeline.

- [ ] Mettre en place **pour la branche "develop"**, une pipeline qui
  - [ ] Déploie le projet dans un dossier "develop"
    - Note : Le dossier doit être crée par la CI/CD. Ainsi, vous pouvez créer des dossiers de "stage" à la volée en fonction de la branche
    - Note 2 : Si vous souhaitez utiliser un serveur chacun pour la phase de dev, vous pouvez utiliser des inputs de type "environnement" et ainsi configurer vos accès SSH et autres en fonction. Comme tout _input_, ça ne fonctionne qu'avec des pipelines manuelles
  - [ ] Exécute les tests e2e de façon optimale
  - [ ] Exécute les tests unitaires
  - [ ] ~~Migre la base de données~~
  - [ ] Affiche la branche déployée sur le site

> Le nom de la branche se trouve dans la variable "github.ref_name". Cette pipeline peut être manuelle ou automatique.