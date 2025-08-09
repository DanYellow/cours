// ------------ ETAPE 1 ---------------
(async () => {
    // On récupère nos données. On utilise une url externe pour nous permettre de charger le fichier sans utiliser un serveur
    // Ce même fichier est dans cette ressource sous le nom "regions.geojson"
    const reponse = await fetch(
        "https://france-geojson.gregoiredavid.fr/repo/regions.geojson"
    );
    const zones = await reponse.json();

    const carte1 = L.map(
        document.querySelector("[data-map='etape-1']")
    ).setView([48.974628, 2.376788], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 3,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(carte1);

    // On charge le contenu de notre geoJSON dans la carte
    // la méthode geoJSON prend en deuxième argument un objet permettant de personnaliser
    // nos zones aussi bien en terme d'interaction ou de style
    L.geoJSON(zones).addTo(carte1);
})();

// ------------ ETAPE 2 ---------------
(async () => {
    const reponse = await fetch(
        "https://france-geojson.gregoiredavid.fr/repo/regions.geojson"
    );
    const zones = await reponse.json();

    const carte = L.map(document.querySelector("[data-map='etape-2']")).setView(
        [48.974628, 2.376788],
        6
    );

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 3,
        ext: 'png',
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(carte);

    // La fonction définit comment chaque zone, définie par la clé "feature" dans un geojson, lors d'évènements
    const onEachFeature = (feature, layer) => {
        // feature : représente les données de la zone dans le geojson. On peut donc accéder à la clé "properties"
        // layer : représente le calque du la zone
        layer.on({
            click: (e) => {
                // Ici on définit qu'au clic, on va zoomer sur la zone cliquée
                carte.fitBounds(e.target.getBounds());
            },
        });

        // Et afficher une popup avec le nom de la région
        // Remarquez que nous sommes à l'extérieur de l'évènement "click" de l'objet layer
        const popupContenu = `<p>${feature.properties.code} | ${feature.properties.nom}</p>`;
        layer.bindPopup(popupContenu);
    };

    // On ajoute une fonction "onEachFeature" qui sera appelée quand on interagit avec une zone
    L.geoJSON(zones, {
        onEachFeature: onEachFeature,
    }).addTo(carte);
})();

// ------------ ETAPE 3 ---------------
(async () => {
    const reponse = await fetch(
        "https://france-geojson.gregoiredavid.fr/repo/regions.geojson"
    );
    const zones = await reponse.json();

    const carte = L.map(document.querySelector("[data-map='etape-3']")).setView(
        [48.974628, 2.376788],
        6
    );

    L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
    }).addTo(carte);

    // Au survol de la zone, on change son style. Style qui sera retiré quand on ne la survolera plus
    const survolZone = (e) => {
        const calque = e.target;

        calque.setStyle({
            weight: 5,
            color: "#ffb27f",
            fillOpacity: 0.3,
        });

        calque.bringToFront();
    };

    const reinitaliserZone = (e) => {
        calqueGeoJSON.resetStyle(e.target);
    };

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: survolZone,
            mouseout: reinitaliserZone,
        });
    };

    const calqueGeoJSON = L.geoJSON(zones, {
        onEachFeature: onEachFeature,
    }).addTo(carte);
})();

// ------------ ETAPE 4 ---------------
(async () => {
    const reponse = await fetch(
        "https://france-geojson.gregoiredavid.fr/repo/regions.geojson"
    );
    const zones = await reponse.json();

    const carte = L.map(document.querySelector("[data-map='etape-4']")).setView(
        [48.974628, 2.376788],
        6
    );

    L.tileLayer("https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png", {
        maxZoom: 19,
        minZoom: 3,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
    }).addTo(carte);

    // On définit notre élément de contrôle ainsi que ses comportements :
    // - onAdd : quand il est ajouté
    // - onUpdate : quand il reçoit de nouvelles données
    const info = L.control();
    info.onAdd = function () {
        // Notre élément de contrôle sera une div avec la classe "conteneur-informations"
        this._div = L.DomUtil.create("div", "conteneur-informations");
        this.update();

        return this._div;
    };

    info.update = function (properties) {
        this._div.innerHTML = `
            <p>Région</p>
            ${properties ? properties.nom : ""}
        `;
    };
    // On ajoute notre élément sur la carte
    info.addTo(carte);

    // Au survol de la zone, on change son style. Style qui sera retiré quand on ne la survolera plus
    const survolZone = (e) => {
        const calque = e.target;
        const calqueListProprietes = e.sourceTarget.feature.properties;
        info.update(calqueListProprietes);

        calque.setStyle({
            weight: 5,
            color: "#ffb27f",
            fillOpacity: 0.3,
        });

        calque.bringToFront();
    };

    const reinitaliserZone = (e) => {
        info.update()
        calqueGeoJSON.resetStyle(e.target);
    };

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: survolZone,
            mouseout: reinitaliserZone,
        });
    };

    const selectionCouleurZone = (nomRegion) => {
        if (nomRegion.toLowerCase() === "corse") {
            return "#FC4E2A";
        }

        if (nomRegion.toLowerCase() === "hauts-de-france") {
            return "#EB4E85";
        }

        if (nomRegion.toLowerCase() === "normandie") {
            return "#FC47FC";
        }

        if (nomRegion.toLowerCase() === "bourgogne-franche-comté") {

            return "#0FF";
        }

        if (nomRegion.toLowerCase() === "pays de la loire") {
            return "#FCEF9C";
        }
        // [...]
    };

    const calqueGeoJSON = L.geoJSON(zones, {
        style: (feature) => {
            return {
                // On sélectionne une couleur en fonction du nom de la région
                fillColor: selectionCouleurZone(feature.properties.nom),
            };
        },
        onEachFeature: onEachFeature,
    }).addTo(carte);
})();
