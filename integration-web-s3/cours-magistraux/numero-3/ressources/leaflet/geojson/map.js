// ------------ ETAPE 1 ---------------
(async () => {
    // On récupère nos données. On utilise une url externe pour nous permettre de charger le fichier sans utiliser un serveur
    const reponse = await fetch(
        "https://france-geojson.gregoiredavid.fr/repo/regions.geojson"
    );
    const zones = await reponse.json();

    const carte1 = L.map(
        document.querySelector("[data-map='etape-1']")
    ).setView([48.974628, 2.376788], 6);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 3,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(carte1);

    L.geoJSON(zones).addTo(carte1);
})();
