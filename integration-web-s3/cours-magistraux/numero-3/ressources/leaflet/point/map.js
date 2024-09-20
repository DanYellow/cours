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

L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
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
