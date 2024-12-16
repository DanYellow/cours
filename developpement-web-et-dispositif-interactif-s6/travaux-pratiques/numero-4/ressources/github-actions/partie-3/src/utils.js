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

const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const getPkmnIdFromURL = (url) => {
    return url.split("/").filter(Boolean).at(-1)
}

const getEvolutionChain = (data, evolutionLineTranslated, listPokemon, listTypes) => {
    let res = [];

    let evolutionLine = Object.values(evolutionLineTranslated).filter(Boolean).flat()
    // evolutionLine = evolutionLine.map((item, idx) => ({
    //     ...item,
    //     condition: evolutionLine[idx - 1]?.condition || item.condition,
    // }))
    
    const listPokemonComputed = listPokemon.map((item) => ({ name: item?.name.fr, pokedex_id: item?.pokedex_id }))
    const pokedexId = getPkmnIdFromURL(data.chain.species.url);
    const firstEvolution = {
        ...evolutionLine.find((item) => Number(item.pokedex_id) === Number(pokedexId)),
        sprite: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${getPkmnIdFromURL(data.chain.species.url)}/regular.png`
    };

    res.push([firstEvolution]);

    const getNextEvolutions = (listEvolutions) => {
        const evolutionLevel = []
        listEvolutions.forEach((item) => {
            const pkmnId = getPkmnIdFromURL(item.species.url)

            evolutionLevel.push(
                {
                    name: capitalizeFirstLetter(item.species.name),
                    pokedex_id: pkmnId,
                    ...evolutionLine.find((item)  => Number(item.pokedex_id) === Number(pkmnId)),
                    sprite: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${pkmnId}/regular.png`
                }
            )
            res.push(evolutionLevel);
            if(item.evolves_to.length > 0) {
                getNextEvolutions(item.evolves_to)
            }
        })
    }

    getNextEvolutions(data.chain.evolves_to);

    let payload = Array.from(new Set(res.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item));
    payload = payload.map((item) => {
        return item.map((subItem) => ({
            ...subItem,
            ...(listPokemonComputed.find((item) => Number(item?.pokedex_id) === Number(subItem.pokedex_id)) || { lang: "en" })
        }))
    })

    return payload;
}

const statistics = {
    "hp": {
        name: "PV",
        color: "rgb(132 204 22)",
    },
    "attack": {
        name: "Attaque",
        color: "rgb(45 212 191)",
    },
    "defense": {
        name: "Défense",
        color: "rgb(96 165 250)",
    },
    "special-attack": {
        name: "Attaque Spéciale",
        color: "rgb(251 146 60)",
    },
    "special-defense": {
        name: "Défense Spéciale",
        color: "rgb(250 204 21)",
    },
    "speed": {
        name: "Vitesse",
        color: "rgb(192 132 252)",
    }
}

export const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
        callback(...args);
        }, wait);
    };
}


export { getVersionForName, cleanString, clearTagContent, convertTailwindRemToPx, aRem, replaceImage, delegateEventHandler, isElementInViewport, getEvolutionChain, statistics, getPkmnIdFromURL };
