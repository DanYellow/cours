# Devoir noté - Développement Web et dispositif interactif
_Les consignes pourront être modifiées._

## Contexte du projet
Suite au projet abordé durant le cours de CI/CD, vous allez devoir mettre en application les nombreux acquis obtenus durant ce cursus. En effet, le but de ce travail en groupe (3-4 membres / groupe) est d'améliorer le projet dans différents domaines :
- Front-end
- Back-end
- DevOps

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
  - [Didacticiel sur la création de token](https://docs.github.com/fr/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
  > Note : Chaque membre peut créer son propre token et l'utiliser en local, toutefois un seul d'entre-eux sera utilisé sur les serveurs
  > Note 2 : **Ce token est une donnée sensible, elle ne doit pas être dans votre dépôt**

### Front-end
- [ ] Charger les données du Pokédex lié au Pokémon affiché
  - Exemple : Vous chargez le Pokémon 245, par défaut sa génération n'est pas chargée ce qui fait qu'on ne peut pas voir le Pokémon suivant et précédent
- [ ] Faire défiler la page jusqu'au Pokémon présentement affiché dans la modale
- [ ] Afficher le nom étranger des Pokémon
- [ ] Afficher les numéros du Pokémon en fonction des régions
- [ ] En utilisant l'API "tcgdex.net", affichez les cartes relatives au Pokémon affiché dans la modale
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
  >     1. Passer par un langage serveur (PHP, Python...) pour effectuer la requête et renvoyer le résultat au front-end
  >     2. Injecter, via vite, ces données dans votre fichier html (ou autre) grâce aux vos requêtes que vous effecturez depuis le fichier de configuration de vite 
  > - Pensez à utiliser des fichiers d'env pour stocker votre token d'API, token qui ne doit pas être commité. Pour rappel, vous avez le site [singleuse.link](https://singleuse.link/create) pour envoyer des données de façon sécurisée et temporaire. 

> Le site est reponsive et doit le rester. Les styles sont gérés via tailwindcss.

### CI/CD
- [ ] Mettre en place **pour la branche "main"**, une pipeline qui
  - [ ] Déploie le projet en production
  - [ ] Exécute les tests e2e de façon optimale
  - [ ] Exécute les tests unitaires
  - [ ] ~~Migre la base de données~~

> La pipeline de la branche main doit être automatique et se lancer quand on fusionne la branche (évènement "push"). Et toute branche qui va être fusionnée (merge request) doit être testée par la pipeline (évènement "merge_request").

- [ ] Mettre en place **pour la branche "develop"**, une pipeline qui
  - [ ] Déploie le projet dans un dossier "develop"
    - Note : Le dossier doit être crée par la CI/CD. Ainsi, vous pouvez créer des dossiers de "stage" à la volée en fonction de la branche
  - [ ] Exécute les tests e2e de façon optimale
  - [ ] Exécute les tests unitaires
  - [ ] ~~Migre la base de données~~
  - [ ] Affiche la branche déployée sur le site

> Le nom de la branche se trouve dans la variable "github.ref_name". Cette pipeline peut être manuelle ou automatique.