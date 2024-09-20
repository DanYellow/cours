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
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMapzz</a>',
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
    maxZoom: 19,
    minZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMapzz</a>',
}).addTo(carte2);

// Nous définissons notre marqueur avec sa coordonnées ainsi que la carte sur laquelle on va l'afficher
const marker1 = L.marker([48.974628, 2.376788]).addTo(carte2);
// Un marqueur peut également afficher une popup lorsqu'on clique dessus
// Il est possible de l'ouvrir par défaut avec la méthode .openPopup(). Essayez.
marker1.bindPopup("<b>Bonjour !</b><br>Je suis une popup")

// Il est bien évidemment possible d'afficher nos marqueurs grâce à une boucle
