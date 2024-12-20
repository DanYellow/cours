# Devoir noté - Développement Web et dispositif interactif
_Les consignes pourront être modifiées._

## Contexte du projet
Suite au projet abordé durant le cours de CI/CD, vous allez devoir mettre en application les nombreux acquis obtenus durant ce cursus. En effet, le but de ce travail en groupe (3-4 membres / groupe) est d'améliorer le projet dans différents domaines :
- Front-end
- Back-end
- DevOps

## Tâches à effectuer

### CI/CD
- Mettre en place **pour la branche "main"**, une pipeline qui
  - Déploie le projet en production
  - Exécute les tests e2e de façon optimale
  - Exécute les tests unitaires
  - Migre la base de données
- Mettre en place **pour la branche "develop"**, une pipeline qui
  - Déploie le projet dans un dossier de "develop"
    - Note : Le dossier doit être crée par la CI/CD. Ainsi, vous pouvez créer des dossiers en fonction de la branche
  - Exécute les tests e2e de façon optimale
  - Exécute les tests unitaires
  - Migre la base de données
  - 

### Front-end
- Charger les données du Pokédex lié au Pokémon affiché
  - Exemple : Vous chargez le Pokémon 145, par défaut son Pokédex n'est pas chargé ce qui fait qu'on ne peut pas voir le Pokémon suivant et précédent
- Faire défiler la page jusqu'au Pokémon présentement affiché dans la modale
- Afficher le nom étranger des Pokémon
- Afficher les numéros du Pokémon en fonction des régions
- En utilisant l'API "tcgdex.net", affichez les cartes relatives au Pokémon affiché dans la modale
  - https://tcgdex.dev/rest/filtering-sorting-pagination
  - Au clic sur une carte, vous devez afficher les détails de la carte
- Grâce au module wavesurfer.js, afficher le spectre sonore du cri du Pokémon courant
  - On doit pouvoir rejouer le cri

## Rendus attendus
- Lien de votre projet sur github

## Votre liste à faire
- [x] Lire les consignes