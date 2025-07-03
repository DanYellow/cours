// ------------ ETAPE 1 ---------------
// Leaflet (représenté par un L) a besoin d'un élément html pour afficher la carte
// Ici nous avons fait le choix d'utiliser un élément qui a le data-attribute "data-map"
// avec la valeur "etape-1"
// Ensuite [48.974628, 2.376788] désigne le centre par défaut
// et 13 représente le zoom par défaut
const carte1 = L.map(document.querySelector("[data-map='etape-1']")).setView(
    [48.974628, 2.376788],
    13
);
// Le lien passé en paramètre désigne les tuiles qui vont être utilisées
// la communité openstreetmap ont en crée d'autre, vous pouvez également les utiliser
// vous trouverez la liste ici : https://leaflet-extras.github.io/leaflet-providers/preview/
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    minZoom: 10,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(carte1);

// ------------ ETAPE 2 ---------------
// On l'a vu avec Google Maps, l'intérêt de ces cartes interactives
// est de rajouter des points d'intérêts, c'est très utile pour un hypermarché
// d'afficher sur une carte ses magasins au lieu d'une liste d'adresse
// Leaflet permet ceci également. Il nous faut juste une carte et un coordonnée géographique (longitude, lattitude)
const carte2 = L.map(document.querySelector("[data-map='etape-2']")).setView(
    [48.974628, 2.376788],
    13
);

L.tileLayer("https://tile.osm.ch/switzerland/{z}/{x}/{y}.png", {
    maxZoom: 24,
    minZoom: 10,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(carte2);

// Nous définissons notre marqueur avec sa coordonnées ainsi que la carte sur laquelle on va l'afficher
const marker1 = L.marker([48.974628, 2.376788]).addTo(carte2);
// Un marqueur peut également afficher une popup lorsqu'on clique dessus
// Il est possible de l'ouvrir par défaut avec la méthode .openPopup(). Essayez.
marker1.bindPopup("<b>Bonjour !</b><br>Je suis une popup");

// Il est bien évidemment possible d'afficher nos marqueurs grâce à une boucle
// On n'a juste à définir un tableau de données...
const listePoints = [
    {
        coordonnees: [48.9960813, 2.3796245],
        info: "Je suis au centre de Sarcelles",
    },
    {
        coordonnees: [48.99592483476555, 2.376929648640127],
        info: "5 Place du Marché, 95200 Sarcelles",
    },
    {
        coordonnees: [48.9929168248096, 2.383012311049524],
        info: "Lycée de la Tourelle, Sarcelles",
    },
    {
        coordonnees: [49.028866369894786, 2.0504973371222057],
        info: "Ile de Loisirs, Cergy",
    },
    {
        coordonnees: [49.03508909126469, 2.070072048267244],
        info: "CY Tech, Cergy",
    },
    {
        coordonnees: [48.9727965387145, 2.307044900118669],
        info: "Gare d'Enghien-les-Bains",
    },
    {
        coordonnees: [48.963772163121384, 2.437236256733515],
        info: "Aéroport Charles de Gaulle",
    },
];

// ...mais avant nous allons définir un marqueur personnalisé,
// ceci nous permettra de différencier notre marqueur du début avec ceux de la boucle
// Il sera ajouté lors de la création de notre marqueur dans la boucle
const marqueurPerso = L.icon({
    iconUrl: "icon-personnalise.png",
    iconSize: [32, 32],
    popupAnchor: [2, -10],
});

// On peut parcourir ce tableau
listePoints.forEach((item) => {
    const markerBoucle = L.marker(item.coordonnees, {
        icon: marqueurPerso,
    }).addTo(carte2);
    markerBoucle.bindPopup(`<p>${item.info}</p>`);
});

// ------------ ETAPE 3 ---------------
// Ici nous allons utiliser des données graphiques qui sont parfois rapprochées, en terme de lisibilité, ce n'est pas optimal.
// Dans ce cas, nous allons utiliser un cluster (ou groupe) de marqueurs ceci permettant l'augmentation de la lisibilité
const carte3 = L.map(document.querySelector("[data-map='etape-3']")).setView(
    [48.974628, 2.376788],
    13
);

L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    maxZoom: 24,
    minZoom: 10,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(carte3);

// On définit notre cluster
const cluster = new L.MarkerClusterGroup();

const listePointsCluster = [[48.98824217,2.25662443737],[48.9717773111,2.25299514112],[49.0296655684,2.32290103729],[49.0620216513,1.70672153604],[49.0084494157,2.40385604039],[49.0267316203,2.22116067166],[49.0401131567,2.05082123731],[49.00660444,2.51417743519],[48.9884077875,2.30049978342],[48.97016048,2.30485955429],[49.1231107932,2.37799676025],[49.0401131567,2.05082123731],[48.9909940165,2.27800925488],[49.00660444,2.51417743519],[48.9511344629,2.2410409502],[48.9909940165,2.27800925488],[49.0401131567,2.05082123731],[49.00660444,2.51417743519],[48.9884077875,2.30049978342],[48.8984504771,2.25570587289],[48.98824217,2.25662443737],[49.0202164812,2.24676044206],[49.0267316203,2.22116067166],[48.9909940165,2.27800925488],[49.0803858577,2.15488070885],[49.00660444,2.51417743519],[49.1595393224,1.85643409298],[48.9918643363,2.32119797848],[49.1151211125,2.44082640954],[48.9902250437,2.38160272749],[48.9701231267,2.40534038501],[49.1407338587,2.3800597257],[49.0441683455,2.12861303743],[48.97016048,2.30485955429],[48.9689724948,2.28518003438],[49.0401131567,2.05082123731],[49.158617564,1.81039322129],[49.0513737853,2.09487928948],[49.0513737853,2.09487928948],[48.97016048,2.30485955429],[49.0032793478,2.23401999637],[49.0401131567,2.05082123731]];

listePointsCluster.forEach((item, index) => {
    // On ajoute nos marqueurs à notre cluster
    cluster.addLayer(L.marker(item).bindPopup(`<p>${index}</p>`));
});

// Enfin notre cluster est affiché sur la carte
carte3.addLayer(cluster);
