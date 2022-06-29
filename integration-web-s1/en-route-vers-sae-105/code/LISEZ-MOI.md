# Préparons la SAÉ 105 - Produire un site web

Au lieu de vous faire coder des morceaux de code par-ci par-là pour apprendre le HTML et le CSS, nous avons décidé de vous faire pratiquer sur un site sur lequel vous utiliserez les notions abordées en cours.

> Pensez bien à ramener votre projet (et son avancement) à chaque cours pour avancer en fonction du thème abordé

Ce travail est noté, vous pouvez travailler en binôme (**à condition que vous soyez dans le même TP**). 

> Si vous êtes en binôme, pensez à expérimenter la programmation pair-à-pair. Ceci consiste, notamment, à développer à deux sur le même ordinateur.

A partir du code donné, vous allez devoir compléter le site de façon à ce qu'il ressemble le plus possible au projet Adobe XD (voir lien plus bas) mais surtout l'agrémenter des fonctionnalités vues en cours tout au long du semestre.

Vous partirez d'une base de code assez minimaliste, nous vous invitons à le regarder (notamment en utilisant la console du navigateur), faire des tests avant de vous lancer à corps perdu dans le développement. **Vous ne devez en aucun cas modifier les fichiers contenus dans le dossier "ne-pas-modifier" ou préfixé de "npm-",** c'est à vous de rajouter de nouveaux fichiers CSS pour compléter l'intégration.

- [Accéder à la maquette Adobe XD](https://xd.adobe.com/view/0fba5fee-dd79-4d0e-b45a-9f15d3fe18d2-5ae9/)

Vous ne serez pas forcément apte dès le début du semestre à intégrer le site, toutefois au fur et à mesure des cours votre site ressemblera de plus en plus au design attendu. 

> En plus de l'intégration du site, vous devrez rajouter un encart (ou une nouvelle page) concernant une brève biographie de votre personne accompagnée d'images. C'est votre encart, exprimez-vous en terme de design / mise en page.

Vous verrez donc durant ce semestre :

## Notions

### Integration Web
- Balises HTML
  - Sémantique
- Langage CSS
- Formulaires
- Mise en page flexbox
- Liens (balise &lt;a>)
- Formattage du texte
- Modèle de boite
  - propriétés margin / padding / border...
- Accessibilité Web
- ...

# Astuces
- Vous ne pouvez pas être pixel perfect. N'essayez pas d'être iso avec la maquette, le moteur de rendu de votre navigateur et d'Adobe XD sont différents, des différences **mineures** appraîtront, c'est normal
- Inutile d'aller modifier le code CSS fourni, créer vos propres fichiers CSS pour limiter les effets de bords et altérer le code CSS fourni
- Evitez de copier tout le code CSS fourni par Adobe XD, ça peut être tentant, mais il est malheureusement de très mauvaise qualité et va vous poser plus de problèmes qu'autres choses. Vous pouvez récupérer les propriétés CSS suivantes :
  - font-size (**A CONVERTIR EN REM IMPÉRATIVEMENT**)
  - width (dans une moindre mesure)
  - height (dans une moindre mesure)
  - les couleurs
  - font-weight
- Pensez bien à lire les notes présentes sur la maquette Adobe, elles apportent des éclaircissements. Par ailleurs, assurez-vous bien que le commentaire est bien associé à la page en question

# Rendus attendus
- Une archive nommée nom-prénom contenant l'ensemble des fichiers permettant le bon fonctionnement de votre site :
  - HTML/CSS...
  - Un fichier texte avec les membres du binôme

Votre rendu devra être mis sur Moodle avant la date butoir, cette date ainsi que le lien du dépôt seront donnés ultérieurement.

# Notation
Les critères suivants seront évalués 
### Intégration Web (HTML/CSS/javascript)

- Qualité du code
  - Pas de classes au nom étrange
  - Limitation du nombre de classes CSS
  - Réutilisation des classes CSS
    - N'oubliez pas qu'une balise peut avoir plusieurs classes CSS
  - Organisation du code
    - Utiliser la structure déjà présente peut vous aider
  - Sémantique HTML :
    - Toute utilisation inappropriée de la balise &lt;br> sera sanctionnée
    
- Accessibilité
  - &lt;img> avec attribut "alt" même vide
  - Valeur de la balise &lt;title> qui change pour chaque page avec la valeur appropriée
  - [Voir plus de normes d'accessibilité](https://www.accede-web.com/notices/html-et-css/)
  - Unité des police d'écriture en rem
    - Toute utilisation de l'unité px pour la propriété font-size sera sanctionnée, il faut utiliser l'unité rem.
      - Il faut diviser la valeur par 16 pour obtenir la font-size en rem
- Présence des fonctionnalités / qualité de l'intégration (voir Adobe XD - lien plus haut -)


# Votre liste à faire
- [x] Lire les consignes
- [ ] Respecter les normes d'accessibilité web (liste non exhaustive)
  - [ ] Mes images possèdent un attribut "alt"
  - [ ] L'unité de la propriété "font-size" est rem
  - [ ] Je n'utilise pas de balises &lt;br> de façon inappropriée
- [ ] Rendre le projet
  - [ ] Créer une archive avec votre nom-prénom qui contient :
    - [ ] Le code
  - [ ] Nommer l'archive avec mon nom-prénom

# Pour aller plus loin
Pour aller plus loin sur le projet, voici une liste (non-exhaustive) de fonctionnalités que vous pouvez rajouter pour aller plus loin, vous n'aurez pas plus de points pour autant :
- Rajouter un favicon (image au choix)
- Rajouter de nouvelles pages
  - Ne pas oublier de le faire correspondre au design
  - Ne pas oublier de les rendre accessibles, de les lier aux autres pages


