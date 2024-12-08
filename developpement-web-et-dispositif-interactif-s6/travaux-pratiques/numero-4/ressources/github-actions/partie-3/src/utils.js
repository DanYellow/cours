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

const aRem = 16;
const convertTailwindRemToPx = (val) => Number(val.replace("rem", "")) * aRem;

const replaceImage = (img, heavyImagePath) => {
    const newImg = new Image();
    newImg.onload = () => {
        img.src = newImg.src; 
    }
    newImg.src = heavyImagePath;    
}

const delegateEventHandler = (el, evt, sel, handler) => {
    el.addEventListener(evt, function (event) {
        let t = event.target;
        while (t && t !== this) {
            if (t.matches(sel)) {
                handler.call(t, event);
            }
            t = t.parentNode;
        }
    });
};

const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= -1 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export { getVersionForName, cleanString, clearTagContent, convertTailwindRemToPx, aRem, replaceImage, delegateEventHandler, isElementInViewport };
