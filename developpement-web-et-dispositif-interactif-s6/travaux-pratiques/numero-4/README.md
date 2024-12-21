# Devoir noté - Développement Web et dispositif interactif
_Les consignes pourront être modifiées._

## Contexte du projet
Suite au projet abordé durant le cours de CI/CD, vous allez devoir mettre en application les nombreux acquis obtenus durant ce cursus. En effet, le but de ce travail en groupe (3-4 membres / groupe) est d'améliorer le projet dans différents domaines :
- Front-end
- Back-end
- DevOps

## Rendus attendus
- Lien de votre projet sur github

## Votre liste à faire
- [x] Lire les consignes
- [ ] Mettre le projet sur github et ajouter vos collaborateurs
### Front-end
- [ ] Charger les données du Pokédex lié au Pokémon affiché
  - Exemple : Vous chargez le Pokémon 145, par défaut son Pokédex n'est pas chargé ce qui fait qu'on ne peut pas voir le Pokémon suivant et précédent
- [ ] Faire défiler la page jusqu'au Pokémon présentement affiché dans la modale
- [ ] Afficher le nom étranger des Pokémon
- [ ] Afficher les numéros du Pokémon en fonction des régions
- [ ] En utilisant l'API "tcgdex.net", affichez les cartes relatives au Pokémon affiché dans la modale
  - https://tcgdex.dev/rest/filtering-sorting-pagination
  - Au clic sur une carte, vous devez afficher les détails de la carte
- [ ] Grâce au module wavesurfer.js, afficher le spectre sonore du cri du Pokémon affiché
  - On doit pouvoir rejouer le cri
- [ ] Avec l'aide de l'API github, lister les membres du groupe
  - Pour chaque contributeur, vous devez afficher (au moins) : 
    - Nom, prénom, pseudonyme le tout devant rediriger vers 
  - [Documentation de l'API "Collaborators"](https://docs.github.com/fr/rest/collaborators/collaborators?apiVersion=2022-11-28#list-repository-collaborators)
  - [Documentation de l'API "Users"](https://docs.github.com/fr/rest/users/users?apiVersion=2022-11-28#get-a-user)
  > Notes :
  > - Il est préférable d'utiliser php et envoyer du json au front-end pour réaliser cette tâche, ainsi vous évitez d'exposer votre token d'API. Pour rappel, vous avez le site [singleuse.link](https://singleuse.link/create) pour envoyer des données de façon sécurisée et temporaire. 
  > - Pensez à utiliser des fichiers d'env pour stocker votre token d'API, token qui ne doit pas être commité
  > - Pour lire un fichier 

### CI/CD
- [ ] Mettre en place **pour la branche "main"**, une pipeline qui
  - [ ] Déploie le projet en production
  - [ ] Exécute les tests e2e de façon optimale
  - [ ] Exécute les tests unitaires
  - [ ] Migre la base de données

> La pipeline de la branche main doit être automatique et se lancer quand on fusionne la branche (évènement "push"). Et toute branche qui va être fusionnée (merge request) doit être testée par la pipeline (évènement "merge_request").

- [ ] Mettre en place **pour la branche "develop"**, une pipeline qui
  - [ ] Déploie le projet dans un dossier "develop"
    - Note : Le dossier doit être crée par la CI/CD. Ainsi, vous pouvez créer des dossiers de "stage" à la volée en fonction de la branche
  - [ ] Exécute les tests e2e de façon optimale
  - [ ] Exécute les tests unitaires
  - [ ] Migre la base de données
  - [ ] Affiche la branche déployée sur le site

> Le nom de la branche se trouve dans la variable "github.ref_name". Cette pipeline peut être manuelle ou automatique.