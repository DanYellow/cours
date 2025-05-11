# SAÉ 303 - Concevoir des visualisations de données pour le web
_Les consignes pourront être modifiées._

- [SAÉ 303 - Concevoir des visualisations de données pour le web](#saé-303---concevoir-des-visualisations-de-données-pour-le-web)
  - [Contexte de la SAÉ](#contexte-de-la-saé)
  - [Infographie](#infographie)
    - [Conseils - Infographie](#conseils---infographie)
  - [Application interactive en javascript](#application-interactive-en-javascript)
    - [Conseils - Application interactive](#conseils---application-interactive)
  - [Logos](#logos)
  - [Votre liste à faire](#votre-liste-à-faire)
  - [FAQ - Foire Aux Questions](#faq---foire-aux-questions)


## Contexte de la SAÉ
De nos jours, les mots "data" ou "donnée" se réfèrent à l’information dématérialisée capable de circuler à travers un réseau de télécommunication ou informatique.
Dans un monde où la data se fait de plus en plus présente, l'internaute sollicite des outils et des supports de visualisation qui lui permettent de lire et interpréter correctement des flux d'informations de plus en plus énormes.

Ces supports peuvent s'exprimer sous la forme d'une infographie ou encore d'un outil interactif, redoutable outil viral. Ainsi, cette SAE est l'occasion de _données_ vie (et envie) à un jeu de données que vous aurez choisi, parmi ceux triés par nos soins [(voir plus bas)](#datasets).

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

Par groupe de 3-4, au sein du même TP (pour des questions logistique), vous devrez, à partir d'un jeu de données que vous aurez choisi, produire **au choix :**
- Une production graphique (infographie - plusieurs formats attendus ou vidéo en motion design)
- Une application interactive en javascript
  - Nécessite du design pour l'apparence. Vous pouvez bien évidemment utiliser tailwindcss

> **La date butoir vous sera remise ultérieurement.**

Étant malheureusement très limité par le temps, vous n'aurez pas le travail de nettoyage de données à effectuer, vous avez à votre disposition des jeux de données propres et très limités en contenu. De ce fait, les sujets seront plus ou moins fermés (surtout pour les jeux de données pour le sujet infographie).
Ces jeux de données sont facilement explorables avec Excel ou encore LibreOffice Calc (gratuit).

- <a id="datasets" href="datasets/">Accéder aux jeux de données proposés</a>
  - <a href="integration-web-s3_sae-303.datasets.zip">Télécharger tous les jeux de données (cliquez sur "view raw" ou la flèche qui va vers le bas à droite)</a>
> Vous devrez impérativement mettre vos sources dans vos réalisations, **si cette règle n'est pas respectée votre note sera diminuée d'un tiers**

Les jeux de données sont été partagés en deux dossiers : "crea" et "dev". Ainsi, si vous vous orientez vers le sujet graphique, nous vous invitons fortement à prendre un jeu de données dans le dossier "crea" et "dev" si vous souhaitez développer un outil autour de la data. La différence entre les deux types de jeux de données résident dans la quantité de données. Les jeux de données "créa", possédant moins de contenu, sont donc plus faciles à mettre en page.

> Note : Vous pouvez tout à fait ajouter des jeux de données externes (et **sourcés**) pour appuyer votre création. N'hésitez pas !

> Pour télécharger les fichiers .csv, .json ou .xlsx, il vous faudra cliquer sur le bouton "Raw" et ensuite faire `ctrl + s` ou `Clic droit > Enregistrer sous`. **Seuls les fichiers .csv et .xslx peuvent être ouverts avec Excel sans problèmes.**

> Les jeux de données préfixés par "geo-" sont des jeux de données qui peuvent être exploités dans le cadre du dévéloppement d'une carte interactive. Certains fichiers n'ont pour données géographiques que des points (lattitude et longitude), d'autres possèdent des formes géographiques. Ces derniers sont au format "geojson" qui est un format de données pensé pour les données géographiques. Bien que le nom diffère, un fichier geojson se charge comme un fichier json. Pensez bien à regarder le contenu de ses fichiers pour savoir quelles méthodes utiliser pour afficher les données sur la carte

> Les jeux de données ont des titres ainsi que des colonnes/clés relativement explicites, mais si vous avez un doute, n'hésitez pas à demander des informations supplémentaires au référent de la SAE.

## Infographie
Si vous faites le choix de l'infographie pour cette SAE, rappelez-vous bien que vous travaillez sur un outil visuel, la mise en page, les couleurs, les images ou encore l'iconographie seront des points cruciaux pour donner envie aux gens de la lire. Souvenez-vous de vos cours liés à ces domaines, n'hésitez pas à trouver de l'inspiration en ligne, nous vous avons mis un ensemble de sites où vous pouvez trouver l'inspiration.

> Si vous le souhaitez, vous pouvez réaliser une vidéo en motion design à la place de l'infographie. Toutefois, il faudra prendre également en compte le sound design.

Infographie ou motion design, vous prendrez soin à **préférer** du contenu libre de droits.

**Rappelons qu'une infographie n'est pas une data-visualisation.** Une infographie est un ensemble de data-visualisations (ou graphiques) qui peuvent raconter une histoire dans le but de faire parler des données plus facilement. N'oubliez pas également que chaque graphique a un rôle très particulier, choississez-les judicieusement. N'allez pas utiliser un diagramme circulaire pour afficher 42 catégories, ça sera illisible. [Il y a le cours dédié aux graphiques pour vous rafraîchir la mémoire](cours-magistraux/numero-1/presentation.pdf).

> Ne mettez pas un graphique seul et rien d'autre dans votre data-viz, votre note risque de ne pas être très élevée. Tout comme assurez-vous de respecter les contrastes et autres règles de mise en page.

Ne négligez pas la présence de textes servant de présentation et/ou de commentaires, ils peuvent servir à mieux amener votre histoire et mieux contextualiser vos données. Les émissions "Le dessous des cartes" ou encore "DataGueule" le font très bien.
- [Voir émission _Le Dessous des cartes_ sur Youtube](https://www.youtube.com/c/LeDessousdesCartesARTE)
- [Voir émission _Le chiffroscope_ sur Youtube](https://www.youtube.com/playlist?list=PLTWD_IG2XnYtps4vw7RmOAttFlMm2qlcv)
- [Voir émission _DataGueule_ sur Youtube](https://www.youtube.com/user/datagueule)

> **Souvenez-vous également qu'un graphique sans légendes n'a aucun intérêt et peut plus semer la confusion qu'autre chose, faites également attention au choix des graphiques.**

Votre infographie devra être présentée sur un site web, une seule page suffit. Cette page devra contenir :
- Un paragraphe présentant de votre réalisation
- La réalisation (instagram ou print ou vidéo)
  - La vidéo peut être hébergée sur Youtube en privé ou autre
- Logo de l'université
  - [Accéder aux logos](#logos)
- Année universitaire + promotion
- Membres du groupe
- Sources (en plus de celles présentent sur l'infographie / vidéo)

N'oubliez pas l'accessibilité sur ce site et l'utilisation de bonnes balises HTML. Vous pouvez utiliser [tailwindcss](https://tailwindcss.com/). Vous n'avez pas besoin d'utiliser Wordpress, ça rendra votre développement plus complexe pour un gain très faible, seuls les langages HTML et CSS vous serviront.

L'infographie devra respecter les règles suivantes :
- La présence des sources
  - Carton final si en vidéo motion design (possible à chaque "plan" de la vidéo)
- Mettre les auteurs de l'infographie, le logo de l'université ainsi que l'année de réalisation
- Formats print et instagram :
  - Print : A3 minimum (29,7cm x 42cm) - Portrait ou Paysage. Le format peut être plus long que large ou l'inverse. L'idée, c'est d'avoir un grand document print
  - Instagram : Format carré (possibilité d'avoir plusieurs images)
- Taille de texte minimum : 14px
  - Peut être plus petit pour vos sources et les auteurs
- Et bien évidemment le contenu
  - Vous vous adressez à des francophones, si votre jeu de données est dans une langue étrangère, il faudra le traduire

### Conseils - Infographie
N'hésitez pas à vous inspirer du web pour trouver une mise en page ou un design. Vous pourrez trouver des inspirations ici :
- [Voir subreddit Infographics](https://www.reddit.com/r/Infographics/top/?t=all)
- [Voir subreddit dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/top/?t=all)
- [Voir histoire de l'iPhone (2007-2012)](https://www.pinterest.fr/pin/91479436152166905/)
- [Voir infographie sur l'usage des sacs au Royaume-Uni (anglais)](https://www.informationisbeautifulawards.com/showcase/3906-breaking-bag-habits)
- [Voir exemples d'infographies réalisées avec tableau.com](https://public.tableau.com/app/discover/viz-of-the-day)
- [Voir curation d'infographies](http://visdata.mit.edu/explore.html)


## Application interactive en javascript

Autre proposition de rendu : l'application interactive en javascript, elle sera l'occasion d'approfondir vos connaissances dans ce langage. Une application interactive utilisant de la donnée peut être un outil redoutable pour communiquer, engager l'internaute. L'engagement a tendance à encore plus fonctionner avec une carte, car tous les utilisateurs peuvent s'y trouver géographiquement (dépendamment du jeu de données).

Si vous souhaitez réaliser une carte interactive, vous pouvez utiliser Google Maps (freemium) ou encore leaflet + OpenStreetMap (gratuit).
- [Voir tutoriel sur Google Maps](https://developers.google.com/maps/documentation/javascript/overview)
  - Pensez bien à sélectionner l'onglet "Javascript" pour le code
- [Voir cours sur Leaflet](https://github.com/DanYellow/cours/blob/main/integration-web-s3/cours-magistraux/numero-3/presentation.pdf)

**Votre jeu de données devra impérativement être chargé,** il faudra donc utiliser l'API `fetch` ([Voir documentation de fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)) pour charger votre jeu de données. Si vous avez le temps, indiquez à l'utilisateur que les données chargent via un message ou une icône.

> Javascript ne sait pas charger naturellement un fichier .xlsx ou .csv, il faudra donc utiliser l'équivalent au format .json (si le jeu de données que vous voulez utiliser n'existe pas au format .json, faites-en la demande, nous ferons la conversion pour vous). Par ailleurs pour vous permettre une meilleure visualisation, certains fichiers .json ont leur équivalent .xlsx, toutefois la structure de données peut être différente entre les deux.

Pour manipuler les données ou les transformer dans le but de les rendre utilisables par [chart.js](https://www.chartjs.org/), vous pouvez utiliser la librairie javascript [lodash](https://lodash.com/docs/4.17.15).

> Vous avez appris à utiliser git. C'est un standard dans le monde du travail, **vous devrez impérativement l'utiliser.**

Votre application javascript devra respecter les règles suivantes :
- Utilisation de git
- Respecter les règles d'accessibilité (contrastes, taille de texte...)
- Sur le site web contenant votre application :
  - Lister les sources
  - Présenter votre application
  - Le logo de l'université
    - [Accéder aux logos](#logos)
  - Année universitaire + promotion
  - Membres du groupe

### Conseils - Application interactive
N'hésitez pas à vous inspirer du web pour trouver une mise en page ou un design. Vous pourrez trouver des inspirations ici :
- [Voir carte sur les notes d'hygiène des restaurants de New-York (anglais)](http://archive.nytimes.com/www.nytimes.com/interactive/dining/new-york-health-department-restaurant-ratings-map.html)
- [Popularité des prénoms](https://dataaddict.fr/prenoms/)
- [Assiduité des députés Français à l'Assemblée Nationale](https://www.nosdeputes.fr/)
- [Statistiques des formations sur Parcoursup](https://beta.suptracker.org/)

L'application peut prendre également la forme d'un jeu, par exemple, comparer deux produits et demander à l'utilisateur lequel des deux est le plus cher (ou autre).

> Pensez bien à soigner le design de votre application en n'omettant pas l'accessibilité ou la mise en page. Un outil comme [tailwindcss](https://tailwindcss.com/) vous aidera.

## <a name="#logos"></a>Logos
Comme annoncé dans la consigne, vous devez afficher les logos de l'université (IUT et Université) dans vos réalisations, et ce, quelque soit le thème utilisé.
- [Accéder aux logos de l'université](../../logos/)


## Votre liste à faire
  - [x] Lire les consignes
  - [ ] Trouver votre jeu de données et votre axe de travail (développement ou création numérique)
    - [ ] **Lisez bien le nom du document ainsi que les fichiers d'aides (s'il y en a), une confusion est si vite arrivée**
  - [ ] Respecter les attentes
  - [ ] **Mettre vos sources dans le résultat final**
      - **La note finale se verra ôtée d'un tiers si ce n'est pas fait**
      - Les sources des jeux de données proposés sont dans le fichier datasets/_liste-sources.ods
  - [ ] Générer une archive contenant :
    - [ ] Votre site et votre réalisation (sujet infographie)
    - [ ] Lien vers le dépôt sur github (sujet développement)

## FAQ - Foire Aux Questions
- **J'ai utilisé un jeu de données proposé par la SAE, où trouver les sources ?**

  A la racine du dossier des jeux de données, il y a un fichier [_liste-sources.ods](./datasets/_liste-sources.ods) qui liste les sources associées à chaque jeu de données. Tous les jeux de données ont une source.
  > Attention : Il y a deux onglets (crea et dev) dans le fichier. **Et en cas d'absence de sources, un tiers de la note finale sera retiré.**
- **Est-ce que je peux utiliser des jeux de données additionnels ?**

  Oui, vous pouvez. Toutefois **pensez bien à sourcer ces jeux additionnels.**

- **Est-ce que je peux limiter le jeu de données ?**

  Il est possible d'omettre des données (colonnes et lignes). Néanmoins faites attention à ne pas dénaturer le message que vous réalisez en supprimant des données.
- **Lors d'autres cours, nous avons eu des devoirs en rapport avec la donnée. Ces devoirs entrent-ils dans la notation de cette SAE ?**

  Non. Les devoirs que vous avez faits dans d'autres matières concernant la donnée ne sont pas associés à la notation de la SAE. **Ces cours ainsi que ces devoirs sont là pour vous aider à réaliser cette SAE.**
- **Est-il possible de réaliser ce travail seul(e) ?**

  Il est possible réaliser cette SAE en solitaire. Cependant, nous vous déconseillons de le faire car en cas d'imprévus qui vous empêchent de travailler dans de saines conditions, il sera très compliqué pour nous de vous noter. A l'inverse être trop nombreux dans un groupe risque de créer trop de flottements dans les tâches à réaliser. Car vous risquez de penser qu'une tierce personne va réaliser une tâche, et à la fin, il n'y aura pas grand-chose.
- **Dans le sujet de graphisme, il est demandé un format A3 et un autre pour instagram. Doivent-ils être les mêmes images mais de tailles différentes ?**

  Pas forcément. Si vous devez bel et bien fournir plusieurs formats, vous avez le droit de proposer des contenus différents pour chacun de ces médias, mais pensez bien à respecter la même Direction Artistique (DA) entre ces médias
- **Puis-je effectuer plusieurs images pour Instagram ?**

  Oui, vous pouvez. Pensez bien à indiquer l'ordre des images. Vous pouvez le faire dans le nom de l'image, par exemple : image_1, image_2...

- **Est-ce que le choix de l'axe (créa ou dev) est conditionné par notre parcours ?**

  Non. Vous pouvez être en parcours Créa et réaliser une application en javascript si vous le souhaitez.

- **Dois-je impérativement utiliser git pour le projet ?**

  Si vous avez choisi le projet développement, **c'est obligatoire,** ceci fait partie de la notation finale. Quant à son utilisation pour le sujet créa, elle est facultative, mais nous vous conseillons pour garder un historique de votre projet.

- **Mon site web doit-il être responsive ?**

  Ce n'est pas obligatoire, néanmoins, ça reste préférable de rendre votre site web responsive.

- **Est-il possible d'utiliser [tailwindcss](https://tailwindcss.com/) ?**

  Oui, vous avez tout à fait le droit.

- **Devons-nous apporter une analyse sur nos réalisations ?**

    Non. Le but de cette SAE est de réaliser un rendu créatif ou de développement définit par les consignes plus haut. Après, si vous le souhaitez, pourquoi pas.

- **Est-il obligatoire d'utiliser du contenu libre de droits ?**

    Non. Toutefois, ça reste préférable. Ne serait-ce que pour prendre une bonne habitude en prévision de votre entrée dans le monde du travail.
