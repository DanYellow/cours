import resolveConfig from "tailwindcss/resolveConfig";
import _tailwindConfig from "/tailwind.config.js";

import {
    fetchPokemonDescription,
    fetchAllTypes,
    fetchPokemonExtraData,
    fetchPokemon,
    fetchDataFromURL,
} from "./api";

import {
    getVersionForName,
    cleanString,
    clearTagContent,
    replaceImage,
    getEvolutionChain,
    statistics,
    getPkmnIdFromURL,
} from "./utils";

import { listPokemon, setTitleTagForGeneration } from "./main";
import { createSensibility, createRegionalForm, createSibling, createStatisticEntry } from "./modal.utils"
import loadingImage from "/loading.svg";
import loadingImageRaw from "/loading.svg?raw";

const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-pokemon-modal]");
const pikachuLoading = document.querySelector("[data-pikachu-loading]");

const pkmnSensibilityTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-sensibility']"
);
const pkmnHighlightTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-highlight']"
);

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const listPokemonSpritesTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-list-sprites']"
);
const pokemonSpriteTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-sprite']"
);
const pokemonSiblingTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-sibling']"
);
const btnLoadGenerationTemplateRaw = document.querySelector(
    "[data-tpl-id='load-generation-btn']"
);
const pokemonStatisticTempalteRaw = document.querySelector(
    "[data-tpl-id='pokemon-statistic']"
);


const tailwindConfig = resolveConfig(_tailwindConfig);

export { tailwindConfig };

const modal_DOM = {
    pkmnName: modal.querySelector("h2"),
    img: modal.querySelector("img"),
    category: modal.querySelector("[data-category]"),
    listTypes: modal.querySelector("[data-list-types]"),
    listSensibilities: modal.querySelector("[data-list-sensibilities]"),
    listEvolutions: modal.querySelector("[data-list-evolutions]"),
    sexMale: modal.querySelector("[data-sex='male']"),
    sexAsexual: modal.querySelector("[data-sex='asexual']"),
    sexFemale: modal.querySelector("[data-sex='female']"),
    sexRateMale: modal.querySelector("[data-sex-rate='male']"),
    sexRateFemale: modal.querySelector("[data-sex-rate='female']"),
    height: modal.querySelector("[data-weight]"),
    weight: modal.querySelector("[data-height]"),
    listAbilities: modal.querySelector("[data-list-abilities]"),
    listGames: modal.querySelector("[data-list-games]"),
    nbGames: modal.querySelector("[data-nb-games]"),
    nbVarieties: modal.querySelector("[data-nb-varieties]"),
    listVarieties: modal.querySelector("[data-list-varieties]"),
    spritesContainer: modal.querySelector("[data-sprites-container]"),
    topInfos: modal.querySelector("[data-top-infos]"),
    listSiblings: modal.querySelector("[data-list-siblings-pokemon]"),
    statistics: modal.querySelector("[data-statistics]"),
    catchRate: modal.querySelector("[data-catch-rate]"),
};

const dataCache = {};
let listAbilitiesCache = [];
const initialPageTitle = document.title;

let listTypes = await fetchAllTypes();
listTypes = listTypes.map((item) => ({
    sprite: item.sprites,
    name: {
        fr: cleanString(item.name.fr),
        en: cleanString(item.name.en)
    },
}));

export { listTypes }

modal.addEventListener("close", () => {
    modal_DOM.img.src = loadingImage;
    modal_DOM.img.alt = "";
    setTitleTagForGeneration();
});

closeModalBtn.addEventListener("click", () => {
    const url = new URL(location);
    url.searchParams.delete("id");
    url.searchParams.delete("region");
    url.searchParams.delete("alternate_form_id");
    history.pushState({}, "", url);
    modal.close();
});

let displayModal = null;

const loadDetailsModal = (e, region = null) => {
    e.preventDefault();
    const pkmnDataRaw = e.currentTarget.dataset.pokemonData;
    const pkmnData = JSON.parse(pkmnDataRaw);
 
    const url = new URL(location);
    if (region) {
        url.searchParams.set("region", region);
    } else {
        url.searchParams.delete("region");
    }
    if (pkmnData.alternate_form_id) {
        url.searchParams.set("alternate_form_id", pkmnData.alternate_form_id);
    } else {
        url.searchParams.delete("alternate_form_id");
    }

    url.searchParams.set("id", pkmnData.pokedex_id);

    history.pushState({}, "", url);
    displayModal(pkmnData);
};


displayModal = async (pkmnData) => {
    if (pkmnData.is_incomplete) {
        const cachedPokemon = listPokemon.find((item) => item?.pokedex_id === pkmnData.pokedex_id);
        if (cachedPokemon) {
            pkmnData = cachedPokemon;
        } else {
            pkmnData = await fetchPokemon(pkmnData.pokedex_id);
        }
    }
    modal.dataset.pokemonData = JSON.stringify(pkmnData);
    document.title = `Chargement - ${initialPageTitle}`;
    pikachuLoading.classList.remove("hidden");
    const listPokedexEntries = document.querySelectorAll("[data-pokemon-data]")
    listPokedexEntries.forEach((item) => { item.inert = true; });
    modal_DOM.img.src = loadingImage;

    const pkmnId = pkmnData?.alternate_form_id || pkmnData.pokedex_id;

    let pkmnExtraData = dataCache[pkmnId]?.extras;
    let listDescriptions = dataCache[pkmnId]?.descriptions;
    let evolutionLine = dataCache[pkmnId]?.evolutionLine;
    if (!dataCache[pkmnId]) {
        try {
            listDescriptions = await fetchPokemonDescription(pkmnId);
        } catch (_e) {
            listDescriptions = {};
        }

        try {
            const evolutionReq = await fetchDataFromURL(listDescriptions.evolution_chain.url);
            evolutionLine = getEvolutionChain(
                evolutionReq, 
                {
                    ...pkmnData.evolution, 
                    self: { 
                        name: pkmnData.name.fr, 
                        pokedex_id: pkmnData.pokedex_id, 
                        // condition: pkmnData.evolution.pre?.map((item) => item.condition)[0] 
                    }
                }, listPokemon, listTypes);
        } catch (_e) {
            evolutionLine = [];
        }

        try {
            pkmnExtraData = await fetchPokemonExtraData(pkmnId);
        } catch (_e) {
            pkmnExtraData = {};
        }

        const listAbilitiesDescriptions = []
        
        for (const ability of pkmnExtraData.abilities) {
            const abilityInCache = listAbilitiesCache.find((item) => item.name.en.toLowerCase() === ability.ability.name.toLowerCase());
            if (abilityInCache) {
                listAbilitiesDescriptions.push(abilityInCache);
            } else {
                try {
                    const abilityReq = await fetchDataFromURL(ability.ability.url);
                    const name = abilityReq.names.filter((item) => item.language.name === "fr")[0].name;
                    const description = abilityReq.flavor_text_entries.filter((item) => item.language.name === "fr").at(-1).flavor_text;
    
                    listAbilitiesDescriptions.push({ id: abilityReq.id, description, name: { fr: name, en: abilityReq.name } });
                } catch (_e) {}
            }
        }

        pkmnData.talents = pkmnData.talents.map((item) => ({
            ...item,
            ...listAbilitiesDescriptions.find((description) => cleanString(description.name.fr.toLowerCase().replace("-", "")) === cleanString(item.name.toLowerCase().replace("-", "")))
        }));

        listPokemon[pkmnData.pokedex_id - 1] = pkmnData;

        listAbilitiesCache = [
            ...listAbilitiesCache,
            ...listAbilitiesDescriptions,
        ];

        listAbilitiesCache = Array.from(new Set(listAbilitiesCache.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item));
        
        dataCache[pkmnId] = {
            descriptions: listDescriptions,
            extras: pkmnExtraData,
            evolutionLine,
        };
    }
  
    replaceImage(modal_DOM.img, pkmnData.sprites.regular);
    modal_DOM.img.alt = `sprite de ${pkmnData.name.fr}`;

    modal_DOM.pkmnName.textContent = `#${String(pkmnData.pokedex_id).padStart(4, '0')} ${pkmnData.name.fr}`;
    document.title = `${modal_DOM.pkmnName.textContent} - ${initialPageTitle}`;

    if (listDescriptions?.is_legendary || listDescriptions?.is_mythical) {
        const cloneHighlight = document.importNode(
            pkmnHighlightTemplateRaw.content,
            true
        );
        const span = cloneHighlight.querySelector("span");
        span.textContent = listDescriptions.is_legendary
            ? "Pokémon Légendaire"
            : "Pokémon Fabuleux";
        span.classList.add(
            listDescriptions.is_legendary ? "!bg-amber-400" : "!bg-slate-400",
            "!text-black"
        );
        modal_DOM.pkmnName.append(cloneHighlight);
    }

    modal_DOM.category.textContent = pkmnData.category;

    clearTagContent(modal_DOM.listTypes);

    const url = new URL(location);
    url.searchParams.set("id", pkmnData.pokedex_id);

    pkmnData.types.forEach((type, idx) => {
        const li = document.createElement("li");
        li.textContent = type.name;
        li.setAttribute("aria-label", `Type ${idx + 1} ${type.name}`);
        li.classList.add(
            ...[cleanString(type.name), "py-0.5", "px-2", "rounded-md", "gap-1", "flex", "items-center", "type-name"]
        );

        const imgTag = document.createElement("img");
        imgTag.alt = `icône type ${type.name}`;
        replaceImage(imgTag, type.image);

        const encodedData = window.btoa(loadingImageRaw.replaceAll("#037ef3", "#fff"));
        imgTag.src = `data:image/svg+xml;base64,${encodedData}`;

        imgTag.fetchpriority = "low";
        imgTag.loading = "lazy";
        imgTag.classList.add(...["h-5"]);

        li.prepend(imgTag);
        
        modal_DOM.listTypes.append(li);
    });

    const firstBorderColor = tailwindConfig.theme.colors[`type_${cleanString(pkmnData.types[0].name)}`];
    const secondaryBorderColor = tailwindConfig.theme.colors[`type_${cleanString(pkmnData.types[1]?.name || "")}`] || null;

    modal.style.borderTopColor = firstBorderColor;
    modal.style.color = `rgb(from ${firstBorderColor} r g b / 0.4)`;
    modal.style.borderLeftColor = firstBorderColor;
    modal.style.borderRightColor = secondaryBorderColor ? secondaryBorderColor : firstBorderColor;
    modal.style.borderBottomColor = secondaryBorderColor ? secondaryBorderColor : firstBorderColor;
    modal.style.setProperty("--footer-bg", firstBorderColor);

    modal.querySelector("header").style.borderImage = `linear-gradient(to right, ${firstBorderColor} 0%, ${firstBorderColor} 50%, ${secondaryBorderColor ? secondaryBorderColor : firstBorderColor} 50%, ${secondaryBorderColor ? secondaryBorderColor : firstBorderColor} 100%) 1`;
    const descriptionsContainer = modal.querySelector("dl");

    clearTagContent(descriptionsContainer);

    listDescriptions.flavor_text_entries?.forEach((description) => {
        const dt = document.createElement("dt");
        const versionName = `Pokémon ${
            getVersionForName[description.version.name] || "Unknown"
        }`;
        dt.textContent = versionName;
        dt.classList.add("font-bold");
        descriptionsContainer.append(dt);

        const dd = document.createElement("dd");
        dd.textContent = description.flavor_text;
        dd.classList.add("mb-2");
        descriptionsContainer.append(dd);
    });

    clearTagContent(modal_DOM.listEvolutions);
    evolutionLine.forEach((evolution, idx) => {
        const li = document.createElement("li");
        const ol = document.createElement("ol");
        ol.classList.add(...["flex", "flex-wrap", "gap-x-2", "gap-y-6"])
        evolution.forEach((item) => {       
            const clone = document.importNode(
                pokemonSpriteTemplateRaw.content,
                true
            );

            const img = clone.querySelector("img");
            img.alt = `Sprite de ${item.name}`;
            img.classList.replace("w-52", "w-36");
            replaceImage(img, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.pokedex_id}.png`);

            const evolutionName = clone.querySelector("p");
            evolutionName.textContent = `#${String(item.pokedex_id).padStart(4, '0')} ${item.name}`;
            evolutionName.classList.toggle("font-bold", item.pokedex_id === pkmnData.pokedex_id);
            evolutionName.classList.add(...["group-hocus:bg-slate-900", "group-hocus:text-white"])
            
            if (idx > 0) {
                const evolutionCondition = document.createElement("p");
                evolutionCondition.classList.add("text-xs", 'text-center');
                evolutionCondition.textContent = item.condition;
                clone.querySelector("li div").insertAdjacentElement("afterbegin", evolutionCondition);
            }

            const divTag = clone.querySelector("div");
            const evolutionURL = new URL(location);
            evolutionURL.searchParams.set("id", item.pokedex_id);
            const aTag = document.createElement('a');
            aTag.innerHTML = divTag.innerHTML;
            aTag.href = evolutionURL;
            aTag.classList = divTag.classList;
            aTag.classList.add(...["hocus:bg-slate-100", "rounded-md", "p-2"])
            aTag.dataset.pokemonData = JSON.stringify({ ...item, is_incomplete: true });
            aTag.addEventListener("click", (e) => loadDetailsModal(e));

            divTag.parentNode.replaceChild(aTag, divTag);
            
            ol.append(clone);
        });

        li.append(ol);
        modal_DOM.listEvolutions.append(li);

        const nextArrow = document.createElement("li");
        nextArrow.textContent = evolutionLine.flat().length >= 7 ? "►" : "▼";
        nextArrow.inert = true;
        nextArrow.classList.add(...["flex", "items-center", "last:hidden", "arrow", "justify-center", "font-['serif']"])
        modal_DOM.listEvolutions.append(nextArrow);
    });

    let alternateEvolutions = listDescriptions.varieties.filter((item) => !item.is_default && item.pokemon.name.includes("mega"))
    alternateEvolutions = alternateEvolutions.map((item) => {
        return {
            orbe: "",
            sprites: {
                regular: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${getPkmnIdFromURL(item.pokemon.url)}.png`
            }
        }
    })

    const megaEvolutionLine = (pkmnData.evolution?.mega || alternateEvolutions)
    if (megaEvolutionLine.length) {
        const li = document.createElement("li")
        const ul = document.createElement("ul");
        ul.classList.add(...["flex", "flex-wrap", "gap-6"])

        megaEvolutionLine.forEach((item) => {
            const clone = document.importNode(
                pokemonSpriteTemplateRaw.content,
                true
            );
            const img = clone.querySelector("img");
            img.alt = `Sprite de ${item.name}`;
            img.classList.replace("w-52", "w-36");
            replaceImage(img, item.sprites.regular);

            const textContainer = clone.querySelector("p");
            textContainer.textContent = item.orbe ? `avec ${item.orbe}` : "";

            // const evolutionName = clone.querySelector("p");
            // evolutionName.textContent = `Méga-${pkmnData.name.fr}`;

            // const evolutionCondition = evolutionName.cloneNode();

            // evolutionCondition.classList.add("text-xs", 'text-center');
            // evolutionCondition.textContent = `avec ${item.orbe}`;
            // clone.querySelector("li div").insertAdjacentElement("beforeend", evolutionCondition);

            ul.append(clone);
        })

        li.append(ul);
        modal_DOM.listEvolutions.append(li);
    }

    modal_DOM.listEvolutions.classList.toggle("horizontal-evolution-layout", evolutionLine.flat().length >= 7)
    modal_DOM.listEvolutions.classList.toggle("vertical-evolution-layout", evolutionLine.flat().length < 7)

    const hasNoEvolutions = (evolutionLine.flat().length === 0) && (pkmnData.evolution?.mega || []).length === 0;
    modal_DOM.listEvolutions.closest("details").inert = hasNoEvolutions;
    if (hasNoEvolutions) {
        modal_DOM.listEvolutions.closest("details").removeAttribute("open");
    }

    clearTagContent(modal_DOM.listSensibilities);

    pkmnData.resistances.forEach((item) => {
        const clone = createSensibility(
            document.importNode(
                pkmnSensibilityTemplateRaw.content,
                true
            ),
            item,
            listTypes
        );

        modal_DOM.listSensibilities.append(clone);
    });

    modal_DOM.sexMale.classList.toggle(
        "hidden",
        pkmnData.sexe?.male === 0 || pkmnData.sexe?.male === undefined
    );
    modal_DOM.sexFemale.classList.toggle(
        "hidden",
        pkmnData.sexe?.female === 0 || pkmnData.sexe?.female === undefined
    );
    modal_DOM.sexAsexual.classList.toggle(
        "hidden",
        !(
            pkmnData.sexe?.female === undefined &&
            pkmnData.sexe?.male === undefined
        )
    );

    modal_DOM.sexMale.style.width = `${pkmnData.sexe?.male}%`;
    modal_DOM.sexRateMale.textContent = `${pkmnData.sexe?.male}%`;
    modal_DOM.sexFemale.style.width = `${pkmnData.sexe?.female}%`;
    modal_DOM.sexRateFemale.textContent = `${pkmnData.sexe?.female}%`;

    modal_DOM.height.textContent = pkmnData.height;
    modal_DOM.weight.textContent = pkmnData.weight;
    modal_DOM.catchRate.textContent = pkmnData.catch_rate;

    clearTagContent(modal_DOM.listAbilities);

    pkmnData.talents.forEach((item) => {
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = item.name.fr;

        const paragraph = document.createElement("p");
        paragraph.textContent = item.description?.replace("\\n", " ");
        paragraph.classList.add("ml-4");

        if (item.tc) {
            const clone = document.importNode(
                pkmnHighlightTemplateRaw.content,
                true
            );
            summary.append(clone);
        }
        details.append(summary);
        details.insertAdjacentElement("beforeend", paragraph);
        details.classList.add("mb-1.5");

        modal_DOM.listAbilities.append(details);
    });

    clearTagContent(modal_DOM.spritesContainer);

    const listSpritesObj = pkmnExtraData.sprites?.other.home || {};
    const listSprites = [];
    Object.entries(listSpritesObj).forEach(([key, value]) => {
        if (value === null) {
            return;
        }
        listSprites.push({ name: key, sprite: value });
    });
    const groupedSprites = Object.groupBy(listSprites, ({ name }) =>
        name.includes("female") ? "Femelle ♀" : "Mâle ♂"
    );

    Object.entries(groupedSprites).forEach(([key, sprites]) => {
        const listPokemonSpritesTemplate = document.importNode(
            listPokemonSpritesTemplateRaw.content,
            true
        );
        const sexLabel = listPokemonSpritesTemplate.querySelector("p");
        sexLabel.textContent = `${key} ${
            Object.keys(groupedSprites).length === 1 ? "/ Femelle ♀" : ""
        }`;

        if (Object.keys(groupedSprites).length === 1) {
            sexLabel.classList.add("no-dimorphism")
        } else {
            if(key === "Femelle ♀") {
                sexLabel.classList.add("bg-pink-300")
            } else if (key === "Mâle ♂") {
                sexLabel.classList.add("bg-sky-300")
            }
        }

        if (
            pkmnData.sexe?.female === undefined &&
            pkmnData.sexe?.male === undefined
        ) {
            sexLabel.classList.add("hidden");
        } else {
            sexLabel.classList.remove("hidden");
        }

        const listSpritesUI = listPokemonSpritesTemplate.querySelector(
            "[data-list-sprites]"
        );
        sprites.forEach((item) => {
            const pokemonSpriteTemplate = document.importNode(
                pokemonSpriteTemplateRaw.content,
                true
            );

            const img = pokemonSpriteTemplate.querySelector("img");
            replaceImage(img, item.sprite);

            img.alt = `sprite ${key} de ${pkmnData.name.fr}`;

            if (!item.name.includes("shiny")) {
                pokemonSpriteTemplate
                    .querySelector("p")
                    .classList.add("hidden");
            }

            listSpritesUI.append(pokemonSpriteTemplate);
        });

        modal_DOM.spritesContainer.append(listPokemonSpritesTemplate);
    });

    clearTagContent(modal_DOM.listGames);
    pkmnExtraData.game_indices.forEach((item) => {
        const li = document.createElement("li");
        const versionName = `Pokémon ${
            getVersionForName[item.version.name] || "Unknown"
        }`;
        li.textContent = versionName;

        modal_DOM.listGames.append(li);
    });
    modal_DOM.nbGames.textContent = ` (${pkmnExtraData.game_indices.length})`;

    clearTagContent(modal_DOM.listVarieties);
    modal_DOM.nbVarieties.textContent = ` (${pkmnData.formes?.length || 0})`;

    for (const item of pkmnData?.formes || []) {
        const pkmnForm = await fetchPokemon(pkmnData.pokedex_id, item.region);
        const clone = createRegionalForm(
            document.importNode(pkmnTemplateRaw.content, true),
            {...item, ...pkmnData, ...pkmnForm, sprite: pkmnForm.sprites.regular, varieties: listDescriptions.varieties}
        );

        modal_DOM.listVarieties.append(clone);
    }
    modal_DOM.listVarieties.closest("details").inert =
        (pkmnData?.formes || []).length === 0;

    clearTagContent(modal_DOM.statistics);
    
    let statsTotal = 0;
    pkmnExtraData.stats.forEach((item) => {
        const clone = document.importNode(
            pokemonStatisticTempalteRaw.content,
            true
        );

        const {bar, name, value} = createStatisticEntry(clone, {...item, statistics})

        modal_DOM.statistics.append(name);
        modal_DOM.statistics.append(value);
        modal_DOM.statistics.append(bar);

        statsTotal += item.base_stat;
    })

    const cloneStatEntry = document.importNode(
        pokemonStatisticTempalteRaw.content,
        true
    );
    const statName = cloneStatEntry.querySelector("[data-stat-name]");
    const statValue = cloneStatEntry.querySelector("[data-stat-value]");
    statName.textContent = "Total";
    statName.style.borderTop = "2px solid black";
    statName.style.marginTop = "1.75rem";
    statName.setAttribute("aria-label", `Total statistique de ${pkmnData.name.fr} : ${statsTotal}`);
    statName.style.borderLeftWidth = "0";
    
    statValue.textContent = statsTotal;
    statValue.style.borderTop = "2px solid black";
    statValue.style.gridColumnStart = "span 2";
    statValue.style.marginTop = "1.75rem";
    
    modal_DOM.statistics.append(statName);
    modal_DOM.statistics.append(statValue);
    
    console.log("pkmnData", pkmnData);

    const loadGenerationBtn = document.querySelector("[data-load-generation]")
    const prevPokemon = listPokemon.find((item) => item?.pokedex_id === pkmnData.pokedex_id - 1) || {};
    let nextPokemon = listPokemon.find((item) => item?.pokedex_id === pkmnData.pokedex_id + 1) || null;
    
    const isLastPokemonOfGen = Number(pkmnData.generation) < Number(loadGenerationBtn.dataset.loadGeneration) && !nextPokemon;

    if (!isLastPokemonOfGen && !nextPokemon) {
        nextPokemon = {}
    }

    clearTagContent(modal_DOM.listSiblings);
    [prevPokemon, pkmnData, nextPokemon]
        .filter(Boolean)
        .forEach((item) => {
            const clone = createSibling(
                document.importNode(pokemonSiblingTemplateRaw.content, true),
                item,
                item.pokedex_id === pkmnData.pokedex_id,
                item.pokedex_id < pkmnData.pokedex_id
            );

            modal_DOM.listSiblings.append(clone);
        });

    if (isLastPokemonOfGen) {
        const clone = document.importNode(
            btnLoadGenerationTemplateRaw.content,
            true
        );

        const button = clone.querySelector("button");
        button.textContent = "Charger la génération suivante";
        button.dataset.loadGeneration = Number(pkmnData.generation) + 1;

        modal_DOM.listSiblings.append(clone);
    }

    modal.showModal();
    pikachuLoading.classList.add("hidden");
    listPokedexEntries.forEach((item) => { item.inert = false; })
};

const pkmnSiblingsObserver = new MutationObserver((e) => {
    if (e[0].removedNodes) {
        if (Array.from(e[0].removedNodes)[0]?.tagName) {
            const urlParams = new URLSearchParams(window.location.search);
            const pkmnId = urlParams.get("id");
            const nextPokemon = listPokemon.at(pkmnId);

            const clone = createSibling(
                document.importNode(pokemonSiblingTemplateRaw.content, true),
                nextPokemon,
                false,
                false
            );
            modal_DOM.listSiblings.append(clone);
        }
    }
});

pkmnSiblingsObserver.observe(modal_DOM.listSiblings, { childList: true, subtree: true });

export { loadDetailsModal }
export default displayModal;
