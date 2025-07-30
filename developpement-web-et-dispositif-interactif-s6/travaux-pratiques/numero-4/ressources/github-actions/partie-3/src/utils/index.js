export const cleanString = (string) =>
    string
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

export const clearTagContent = (tag) => {
    while (tag.firstChild) {
        tag.removeChild(tag.firstChild);
    }
};

export const aRem = 16;
export const convertTailwindRemToPx = (val) =>
    Number(val.replace("rem", "")) * aRem;

export const replaceImage = (img, heavyImagePath, errorCallback = () => {}) => {
    const newImg = new Image();
    newImg.onload = () => {
        img.src = newImg.src;
    };
    newImg.onerror = () => {
        errorCallback();
    };
    newImg.src = heavyImagePath;
};

export const delegateEventHandler = (el, evt, sel, handler) => {
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

export const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= -1 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
};

export const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export const getPkmnIdFromURL = (url) => {
    return url.split("/").filter(Boolean).at(-1);
};

export const getEvolutionChain = (
    data,
    evolutionLineTranslated,
    listPokemon
) => {
    let evolutionLine = Object.values(evolutionLineTranslated)
        .filter(Boolean)
        .flat();
    // evolutionLine = evolutionLine.map((item, idx) => ({
    //     ...item,
    //     condition: evolutionLine[idx - 1]?.condition || item.condition,
    // }))

    let res = [];
    const listPokemonComputed = listPokemon.map((item) => ({
        name: item?.name.fr,
        pokedex_id: item?.pokedex_id,
    }));
    const pokedexId = getPkmnIdFromURL(data.chain.species.url);
    const firstEvolution = {
        ...evolutionLine.find(
            (item) => Number(item.pokedex_id) === Number(pokedexId)
        ),
        sprite: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${getPkmnIdFromURL(
            data.chain.species.url
        )}/regular.png`,
        list_evolutions: data.chain.evolves_to.map(
            (evolution) => evolution.species.name
        ),
    };
    res.push([firstEvolution]);

    const getNextEvolutions = (listEvolutions) => {
        const evolutionLevel = [];
        listEvolutions.forEach((item) => {
            const pkmnId = getPkmnIdFromURL(item.species.url);

            const idxEvolution = res.findIndex((addedEvolution) => {
                return addedEvolution.some((obj) =>
                    obj.list_evolutions.includes(item.species.name)
                );
            });

            evolutionLevel.push({
                name: capitalizeFirstLetter(item.species.name),
                pokedex_id: pkmnId,
                ...evolutionLine.find(
                    (item) => Number(item.pokedex_id) === Number(pkmnId)
                ),
                sprite: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${pkmnId}/regular.png`,
                list_evolutions: item.evolves_to.map(
                    (evolution) => evolution.species.name
                ),
            });

            if (res[idxEvolution + 1]) {
                evolutionLevel.map((evol) => {
                    if (!res[idxEvolution + 1].includes(evol)) {
                        res[idxEvolution + 1].push(evol);
                    }
                });
            } else {
                res.push(evolutionLevel);
            }

            if (item.evolves_to.length > 0) {
                getNextEvolutions(item.evolves_to);
            }
        });
    };

    getNextEvolutions(data.chain.evolves_to);

    const payload = res.map((item) => {
        return item.map((subItem) => ({
            ...subItem,
            ...(listPokemonComputed.find(
                (item) =>
                    Number(item?.pokedex_id) === Number(subItem.pokedex_id)
            ) || { lang: "en" }),
        }));
    });

    return payload;
};

export const statistics = {
    hp: {
        name: "PV",
        color: "rgb(132 204 22)",
    },
    attack: {
        name: "Attaque",
        color: "rgb(45 212 191)",
    },
    defense: {
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
    speed: {
        name: "Vitesse",
        color: "rgb(192 132 252)",
    },
};

export const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
};

export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};

export const onTransitionsEnded = (node) => {
    return Promise.allSettled(
        node.getAnimations().map((animation) => animation.finished)
    );
};

export const modal = document.querySelector("[data-pokemon-modal]");

export const modal_DOM = {
    pkmnName: modal.querySelector("h2"),
    img: modal.querySelector("img"),
    category: modal.querySelector("[data-category]"),
    listTypes: modal.querySelector("[data-list-types]"),
    listSensibilities: modal.querySelector("[data-list-sensibilities]"),
    listEvolutions: modal.querySelector("[data-list-evolutions]"),
    extraEvolutions: modal.querySelector("[data-extra-evolutions]"),
    sexMaleBarContainer: modal.querySelector("[data-sex='male']"),
    sexAsexualBarContainer: modal.querySelector("[data-sex='asexual']"),
    sexFemaleBarContainer: modal.querySelector("[data-sex='female']"),
    sexRateMale: modal.querySelectorAll("[data-sex-rate='male']"),
    sexRateFemale: modal.querySelectorAll("[data-sex-rate='female']"),
    sexLabelFemale: modal.querySelectorAll("[data-sex-label='female']"),
    sexLabelMale: modal.querySelectorAll("[data-sex-label='male']"),
    height: modal.querySelector("[data-weight]"),
    weight: modal.querySelector("[data-height]"),
    listAbilities: modal.querySelector("[data-list-abilities]"),
    listGames: modal.querySelector("[data-list-games]"),
    nbGames: modal.querySelector("[data-nb-games]"),
    nbRegionalForms: modal.querySelector("[data-nb-regional-forms]"),
    listRegionalForms: modal.querySelector("[data-list-regional-forms]"),
    nbForms: modal.querySelector("[data-nb-forms]"),
    listForms: modal.querySelector("[data-list-forms]"),
    spritesContainer: modal.querySelector("[data-sprites-container]"),
    topInfos: modal.querySelector("[data-top-infos]"),
    listSiblings: modal.querySelector("[data-list-siblings-pokemon]"),
    statistics: modal.querySelector("[data-statistics]"),
    catchRate: modal.querySelector("[data-catch-rate]"),
    acronymVersions: modal.querySelector("[data-pkmn-acronym-versions]"),
    noEvolutionsText: modal.querySelector("[data-no-evolutions]"),
    listTogglePip: modal.querySelectorAll("[data-toggle-picture-in-picture]"),
};

export * from "./colors";
export * from "./pokemon-modal.utils";
export * from "./dataDictionaries";
export * from "./constants";
