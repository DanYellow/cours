const getVersionForName = {
    black: "Noire",
    white: "Blanche",
    "ultra-moon": "Ultra-Lune",
    "ultra-sun": "Ultra-Soleil",
    red: "Rouge",
    blue: "Bleue",
    yellow: "Jaune",
    silver: "Argent",
    gold: "Or",
    crystal: "Crystal",
    ruby: "Rubis",
    sapphire: "Saphir",
    emerald: "Émeraude",
    firered: "Rouge feu",
    leafgreen: "Vert feuille",
    diamond: "Diamant",
    pearl: "Perle",
    platinum: "Platine",
    heartgold: "Or HeartGold",
    soulsilver: "Argent SoulSilver",
    "black-2": "Noire 2",
    "white-2": "Blanche 2",
    x: "X",
    y: "Y",
    "omega-ruby": "Rubis Oméga",
    "alpha-sapphire": "Saphir Alpha",
    sword: "Épée",
    shield: "Bouclier",
    sun: "Soleil",
    moon: "Lune",
    "lets-go-eevee": "Let's Go, Évoli",
    "lets-go-pikachu": "Let's Go, Pikachu",
    "legends-arceus": "Légendes Pokémon : Arceus",
    violet: "Violet",
    scarlet: "Écarlate",
};

const cleanString = (string) =>
    string
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

const clearTagContent = (tag) => {
    while (tag.firstChild) {
        tag.removeChild(tag.firstChild);
    }
};

export { getVersionForName, cleanString, clearTagContent };