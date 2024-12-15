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

export const typesBorderColor = {"plante_poison":"group-hocus:border-plante_poison","plante_feu":"group-hocus:border-plante_feu","plante_eau":"group-hocus:border-plante_eau","plante_vol":"group-hocus:border-plante_vol","plante_insecte":"group-hocus:border-plante_insecte","plante_normal":"group-hocus:border-plante_normal","plante_sol":"group-hocus:border-plante_sol","plante_electrik":"group-hocus:border-plante_electrik","plante_tenebres":"group-hocus:border-plante_tenebres","plante_glace":"group-hocus:border-plante_glace","plante_psy":"group-hocus:border-plante_psy","plante_roche":"group-hocus:border-plante_roche","plante_combat":"group-hocus:border-plante_combat","plante_acier":"group-hocus:border-plante_acier","plante_dragon":"group-hocus:border-plante_dragon","plante_fee":"group-hocus:border-plante_fee","plante_spectre":"group-hocus:border-plante_spectre","poison_feu":"group-hocus:border-poison_feu","poison_eau":"group-hocus:border-poison_eau","poison_vol":"group-hocus:border-poison_vol","poison_insecte":"group-hocus:border-poison_insecte","poison_normal":"group-hocus:border-poison_normal","poison_sol":"group-hocus:border-poison_sol","poison_electrik":"group-hocus:border-poison_electrik","poison_tenebres":"group-hocus:border-poison_tenebres","poison_glace":"group-hocus:border-poison_glace","poison_psy":"group-hocus:border-poison_psy","poison_roche":"group-hocus:border-poison_roche","poison_combat":"group-hocus:border-poison_combat","poison_acier":"group-hocus:border-poison_acier","poison_dragon":"group-hocus:border-poison_dragon","poison_fee":"group-hocus:border-poison_fee","poison_spectre":"group-hocus:border-poison_spectre","feu_eau":"group-hocus:border-feu_eau","feu_vol":"group-hocus:border-feu_vol","feu_insecte":"group-hocus:border-feu_insecte","feu_normal":"group-hocus:border-feu_normal","feu_sol":"group-hocus:border-feu_sol","feu_electrik":"group-hocus:border-feu_electrik","feu_tenebres":"group-hocus:border-feu_tenebres","feu_glace":"group-hocus:border-feu_glace","feu_psy":"group-hocus:border-feu_psy","feu_roche":"group-hocus:border-feu_roche","feu_combat":"group-hocus:border-feu_combat","feu_acier":"group-hocus:border-feu_acier","feu_dragon":"group-hocus:border-feu_dragon","feu_fee":"group-hocus:border-feu_fee","feu_spectre":"group-hocus:border-feu_spectre","eau_vol":"group-hocus:border-eau_vol","eau_insecte":"group-hocus:border-eau_insecte","eau_normal":"group-hocus:border-eau_normal","eau_sol":"group-hocus:border-eau_sol","eau_electrik":"group-hocus:border-eau_electrik","eau_tenebres":"group-hocus:border-eau_tenebres","eau_glace":"group-hocus:border-eau_glace","eau_psy":"group-hocus:border-eau_psy","eau_roche":"group-hocus:border-eau_roche","eau_combat":"group-hocus:border-eau_combat","eau_acier":"group-hocus:border-eau_acier","eau_dragon":"group-hocus:border-eau_dragon","eau_fee":"group-hocus:border-eau_fee","eau_spectre":"group-hocus:border-eau_spectre","vol_insecte":"group-hocus:border-vol_insecte","vol_normal":"group-hocus:border-vol_normal","vol_sol":"group-hocus:border-vol_sol","vol_electrik":"group-hocus:border-vol_electrik","vol_tenebres":"group-hocus:border-vol_tenebres","vol_glace":"group-hocus:border-vol_glace","vol_psy":"group-hocus:border-vol_psy","vol_roche":"group-hocus:border-vol_roche","vol_combat":"group-hocus:border-vol_combat","vol_acier":"group-hocus:border-vol_acier","vol_dragon":"group-hocus:border-vol_dragon","vol_fee":"group-hocus:border-vol_fee","vol_spectre":"group-hocus:border-vol_spectre","insecte_normal":"group-hocus:border-insecte_normal","insecte_sol":"group-hocus:border-insecte_sol","insecte_electrik":"group-hocus:border-insecte_electrik","insecte_tenebres":"group-hocus:border-insecte_tenebres","insecte_glace":"group-hocus:border-insecte_glace","insecte_psy":"group-hocus:border-insecte_psy","insecte_roche":"group-hocus:border-insecte_roche","insecte_combat":"group-hocus:border-insecte_combat","insecte_acier":"group-hocus:border-insecte_acier","insecte_dragon":"group-hocus:border-insecte_dragon","insecte_fee":"group-hocus:border-insecte_fee","insecte_spectre":"group-hocus:border-insecte_spectre","normal_sol":"group-hocus:border-normal_sol","normal_electrik":"group-hocus:border-normal_electrik","normal_tenebres":"group-hocus:border-normal_tenebres","normal_glace":"group-hocus:border-normal_glace","normal_psy":"group-hocus:border-normal_psy","normal_roche":"group-hocus:border-normal_roche","normal_combat":"group-hocus:border-normal_combat","normal_acier":"group-hocus:border-normal_acier","normal_dragon":"group-hocus:border-normal_dragon","normal_fee":"group-hocus:border-normal_fee","normal_spectre":"group-hocus:border-normal_spectre","sol_electrik":"group-hocus:border-sol_electrik","sol_tenebres":"group-hocus:border-sol_tenebres","sol_glace":"group-hocus:border-sol_glace","sol_psy":"group-hocus:border-sol_psy","sol_roche":"group-hocus:border-sol_roche","sol_combat":"group-hocus:border-sol_combat","sol_acier":"group-hocus:border-sol_acier","sol_dragon":"group-hocus:border-sol_dragon","sol_fee":"group-hocus:border-sol_fee","sol_spectre":"group-hocus:border-sol_spectre","electrik_tenebres":"group-hocus:border-electrik_tenebres","electrik_glace":"group-hocus:border-electrik_glace","electrik_psy":"group-hocus:border-electrik_psy","electrik_roche":"group-hocus:border-electrik_roche","electrik_combat":"group-hocus:border-electrik_combat","electrik_acier":"group-hocus:border-electrik_acier","electrik_dragon":"group-hocus:border-electrik_dragon","electrik_fee":"group-hocus:border-electrik_fee","electrik_spectre":"group-hocus:border-electrik_spectre","tenebres_glace":"group-hocus:border-tenebres_glace","tenebres_psy":"group-hocus:border-tenebres_psy","tenebres_roche":"group-hocus:border-tenebres_roche","tenebres_combat":"group-hocus:border-tenebres_combat","tenebres_acier":"group-hocus:border-tenebres_acier","tenebres_dragon":"group-hocus:border-tenebres_dragon","tenebres_fee":"group-hocus:border-tenebres_fee","tenebres_spectre":"group-hocus:border-tenebres_spectre","glace_psy":"group-hocus:border-glace_psy","glace_roche":"group-hocus:border-glace_roche","glace_combat":"group-hocus:border-glace_combat","glace_acier":"group-hocus:border-glace_acier","glace_dragon":"group-hocus:border-glace_dragon","glace_fee":"group-hocus:border-glace_fee","glace_spectre":"group-hocus:border-glace_spectre","psy_roche":"group-hocus:border-psy_roche","psy_combat":"group-hocus:border-psy_combat","psy_acier":"group-hocus:border-psy_acier","psy_dragon":"group-hocus:border-psy_dragon","psy_fee":"group-hocus:border-psy_fee","psy_spectre":"group-hocus:border-psy_spectre","roche_combat":"group-hocus:border-roche_combat","roche_acier":"group-hocus:border-roche_acier","roche_dragon":"group-hocus:border-roche_dragon","roche_fee":"group-hocus:border-roche_fee","roche_spectre":"group-hocus:border-roche_spectre","combat_acier":"group-hocus:border-combat_acier","combat_dragon":"group-hocus:border-combat_dragon","combat_fee":"group-hocus:border-combat_fee","combat_spectre":"group-hocus:border-combat_spectre","acier_dragon":"group-hocus:border-acier_dragon","acier_fee":"group-hocus:border-acier_fee","acier_spectre":"group-hocus:border-acier_spectre","dragon_fee":"group-hocus:border-dragon_fee","dragon_spectre":"group-hocus:border-dragon_spectre","fee_spectre":"group-hocus:border-fee_spectre"}

export { getVersionForName, cleanString, clearTagContent, convertTailwindRemToPx, aRem, replaceImage, delegateEventHandler, isElementInViewport, getEvolutionChain, statistics, getPkmnIdFromURL };
