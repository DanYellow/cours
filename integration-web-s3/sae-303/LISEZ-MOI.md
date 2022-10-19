# SAÉ 303 - Concevoir des visualisations de données pour le web
_Les consignes pourront être modifiées._

## Contexte de la SAÉ
De nos jours, le mot "data" ou "donnée" se réfèrent à l’information dématérialisée capable de circuler à travers un réseau de télécommunication ou informatique.
Dans un monde où la data se fait de plus en plus présente, l'internaute sollicite des outils et des supports de visualisation qui lui permettent de lire et interpréter correctement des flux d'informations de plus en plus énormes.  
Ces supports peuvent s'exprimer sous la forme d'une infographie ou encore d'un outil interactif, redoutable outil viral.

Cette SAÉ sera l'occasion de valider les apprentissages critiques (AC) suivants : 

- AC21.03 | Traiter des données avec des outils statistiques pour faciliter leur analyse et leur exploitation
- AC23.02 | Définir une iconographie (illustrations, photographies, vidéos)
- AC23.05 | Réaliser, composer et produire pour une communication plurimédia
- AC23.06 | Élaborer et produire des animations, des designs sonores, des effets spéciaux, de la visualisation de données ou de la 3D
- AC24.01 | Produire des pages et applications Web responsives
- AC24.03 | Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs

Et de mettre en application les connaissances vues dans les ressources suivantes : 
- R3.09 | Création et design interactif (UI)
- R3.10 | Culture artistique
- R3.12 | Développement Front et intégration
- R3.15 | Représentation et traitement de l’information

Par groupe au sein du même TP (pour des questions logistique), vous devrez, à partir d'un jeu de données que vous aurez choisi, produire **au choix :**
- Une infographie (plusieurs formats attendus)
- Une application interactive en javascript
  - Nécessite du design pour l'apparence

**Dans tous les cas**, le résultat final devra être accessible sur un **site web développé avec boostrap** (vu en S2 et S3).

> **La date butoir vous sera remise ultérieurement.**

Étant malheureusement très limité par le temps, vous n'aurez pas le travail de nettoyage de données à effectuer, vous avez à votre disposition des jeux de données propres et très limités en contenu. De ce fait, les sujets seront plus ou moins fermés (surtout pour les jeux de données pour le sujet infographie)
Ces jeux de données sont facilement explorables avec excel ou encore LibreOffice Calc.

- [Accéder aux jeux de données](datasets/)
> Les jeux de données sont été partagés en deux groupe : "infographie" et "développement". Ainsi, si vous vous orientez vers le sujet graphique, nous vous invitons fortement à prendre un jeu de données dans le dossier "infographie" et "développement" si vous souhaitez faire le sujet développement.

> Pour télécharger les fichiers .csv, .json ou .xlsx, il vous faudra cliquer sur le bouton "Raw" et ensuite faire `ctrl + s` ou `Clic droit > Enregistrer sous`. **Seul les fichiers .csv et .xslx peuvent être ouverts avec Excel sans problèmes.**

> Les jeux de données préfixés par "geo-" sont des jeux de données qui peuvent être exploités dans le cadre du dévéloppement d'une carte interactive.

> Les jeux de données ont des titres relativement explicites, mais si vous avez un doute n'hésitez pas à demander des informations supplémentaires au référent de la SAE

## Infographie
Si vous faites le choix de l'infographie pour cette SAE, rappelez-vous bien que vous travaillez sur un outil visuel, la mise en page, les couleurs, les images ou encore l'iconographie seront des points cruciaux pour donner envie aux gens de la lire. Rappelez-vous donc bien de vos cours, n'hésitez pas à trouver de l'inspiration en ligne, nous vous avons mis un ensemble de sites où vous pouvez trouver l'inspiration.

> Vous pouvez, si vous le souhaitez réaliser une vidéo en motion design à la place de l'infographie. Toutefois, il faudra prendre également en compte le sound design et libre de droit de préférence.

**Rappelons qu'une infographie n'est pas une data-visualisation.** Une infographie est un ensemble de data-visualisation (ou graphiques) qui peuvent raconter une histoire dans le but de faire parler des données plus facilement.

> Ne mettez pas un graphique seul et rien d'autre dans votre data-viz, votre note risque de ne pas être très élevée.

Pensez également à aggrémenter votre travail de quelques textes servant de présentation et/ou de commentaires, ils serviront à mieux amener votre histoire et mieux contextualiser vos données. L'émission le dessous des cartes ou encore DataGueule le font très bien.
- [Voir émission _Le Dessous des cartes_ sur Youtube](https://www.youtube.com/c/LeDessousdesCartesARTE)
- [Voir émission _Le chiffroscope_ sur Youtube](https://www.youtube.com/playlist?list=PLTWD_IG2XnYtps4vw7RmOAttFlMm2qlcv)
- [Voir émission _DataGueule_ sur Youtube](https://www.youtube.com/user/datagueule)

**Rappelez-vous également qu'un graphique sans légendes n'a aucun intérêt et peut plus semer la confusion qu'autre chose et faites également attention au choix des graphiques.**

Il n'y a pas réellement de format attendu pour cette infographie, elle devra quand même respecter les règles suivantes :
- Indiquer vos sources 
  - Carton final si en vidéo motion design
- Mettre les auteurs de l'infographie, le logo de l'université ainsi que l'année de réalisation
- Formats print et instagram :
  - Print : A3 minimum (29,7cm x 42cm) - Portrait ou Paysage
  - Instagram : Format carré (possibilité d'avoir plusieurs images)
- Taille de texte minimum : 12px
  - ça peut être plus petit pour vos sources et les auteurs
- Et bien évidemment le contenu
  - Vous vous adressez à des francophones, si votre jeu de données est dans une langue étrangère, il faudra le traduire
### Conseils - Infographie
N'hésitez pas à vous inspirer du web pour trouver une mise en page ou un design. Vous pourrez trouver des inspirations ici :
- [Voir subreddit Infographics](https://www.reddit.com/r/Infographics/)
- [Voir subreddit dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/)
- [Voir histoire de l'iPhone (2007-2012)](https://www.pinterest.fr/pin/91479436152166905/)
- [Voir infographie sur l'usage des sacs au Royaume-Uni (anglais)](https://www.informationisbeautifulawards.com/showcase/3906-breaking-bag-habits)
- [Voir exemples d'infographies réalisées avec tableau.com](https://public.tableau.com/app/discover/viz-of-the-day)
- [Voir curation d'infographies](http://visdata.mit.edu/explore.html)

## Application interactive en javascript 

Autre proposition de rendu, l'application interactive en javascript sera l'occasion d'approfondir vos connaissances dans ce langage. Une application interactive utilisant de la donnée peut être un outil redoutable pour communiquer, engager l'internaute. L'engagement a tendance à encore plus fonctionner des une carte, car tous les utilisateurs peuvent s'y trouver.

Si vous souhaitez réaliser une carte interactive, vous pouvez utiliser Google Maps (freemium) ou encore leaflet + OpenStreetMap (gratuit).

Votre jeu de données devra impérativement être chargé, il faudra donc utiliser l'API `fetch` ([Voir documentation de fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)) pour charger votre jeu de données. Pensez bien donc à une stratégie pour indiquer à l'utilisateur que les données chargent.

> Javascript ne sait pas changer naturellement un fichier .csv, il faudra donc utiliser l'équivalent au format .json (si le jeu de données que vous voulez utiliser n'existe pas au format .json, demandez-moi, je le convertirai pour vous)

Pour manipuler les données, les transformer dans le but de les rendre utilisables par [chart.js](https://www.chartjs.org/), vous pouvez utiliser la librairie javascript [lodash](https://lodash.com/docs/4.17.15).

> Vous avez appris à utiliser git. Pensez-y pour garder une trace de votre travail et travailler à plusieurs.

### Conseils - Application interactive
N'hésitez pas à vous inspirer du web pour trouver une mise en page ou un design. Vous pourrez trouver des inspirations ici :
- [Voir carte sur les notes d'hygiène des restaurants de New-York (anglais)](http://archive.nytimes.com/www.nytimes.com/interactive/dining/new-york-health-department-restaurant-ratings-map.html)
- [Popularité des prénoms](https://dataaddict.fr/prenoms/)
- [Assiduité des députés Français à l'Assemblée Nationale](https://www.nosdeputes.fr/)

# Votre liste à faire
  - [x] Lire les consignes
  - [ ] Trouver votre jeu de données et votre axe de travail (développement ou design)
  - [ ] Respecter les attentes
  - [ ] Générer une archive contenant :
    - [ ] Votre site web (développé avec bootstrap)
    - [ ] Un fichier texte contenant les membres du groupe
    - [ ] Votre réalisation (app interactive ou infographie ou vidéo motion)
