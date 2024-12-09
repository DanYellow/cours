import resolveConfig from "tailwindcss/resolveConfig";
import _tailwindConfig from "/tailwind.config.js";

import {
    fetchPokemonDescription,
    fetchAllTypes,
    fetchPokemonExtraData,
    fetchPokemon,
    fetchEvolutionChain,
} from "./api";

import {
    getVersionForName,
    cleanString,
    clearTagContent,
    convertTailwindRemToPx,
    aRem,
    replaceImage,
    getEvolutionChain,
} from "./utils";

import { listPokemon, setTitleTagForGeneration } from "./main";
import { createSensibility, createRegionalForm} from "./modal.utils"
import loadingImage from "/loading.svg";

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
};

const dataCache = {};
const initialPageTitle = document.title;

let listTypes = await fetchAllTypes();
listTypes = listTypes.map((item) => ({
    sprite: item.sprites,
    name: cleanString(item.name.fr),
}));

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

const createSibling = (template, data, isInert, isPrevious) => {
    const li = template.querySelector("li");

    li.classList.toggle("shrink-0", isInert);
    li.classList.toggle("hidden", isInert);
    li.classList.toggle("md:[display:revert]", isInert);
    li.classList.toggle("grow", !isInert);
    li.classList.toggle("basis-0", !isInert);

    if (Object.keys(data || {}).length > 0) {
        const imgTag = template.querySelector("img");
        imgTag.src = loadingImage;
        imgTag.alt = `sprite de ${data.name.fr}`;
        replaceImage(imgTag, data.sprites.regular);
        imgTag.classList.toggle("hidden", isInert);

        const name = template.querySelector("[data-name]");
        name.textContent = data.name.fr;

        const pkmnId = template.querySelector("[data-id]");
        pkmnId.textContent = `#${data.pokedex_id}`;
        pkmnId.classList.toggle("!text-center", isInert);

        const siblingUrl = new URL(location);
        siblingUrl.searchParams.set("id", data.pokedex_id);
        siblingUrl.searchParams.delete("region");
        siblingUrl.searchParams.delete("alternate_form_id");
        const aTag = template.querySelector("a");
        aTag.href = siblingUrl;
        aTag.dataset.pokemonData = JSON.stringify(data);
        aTag.addEventListener("click", (e) => loadDetailsModal(e));
        
        if (!isInert) {
            aTag.dataset.testid = isPrevious ? "previous-pkmn" : "next-pkmn";
            const arrow = document.createElement("p");
            arrow.textContent = isPrevious ? "◄" : "►";
            arrow.classList.add(...["font-['serif']", isPrevious ? "-mr-3.5" : "-ml-3.5", "arrow"])
            aTag.prepend(arrow);
        } else {
            aTag.classList.replace("inert:opacity-25", "inert:opacity-100")
        }
    }
    li.inert = isInert || Object.keys(data || {}).length === 0;

    return template;
};


displayModal = async (pkmnData) => {
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
            evolutionLine = await fetchEvolutionChain(listDescriptions.evolution_chain.url);
            evolutionLine = getEvolutionChain(
                evolutionLine, 
                {
                    ...pkmnData.evolution, 
                    self: { name: pkmnData.name.fr, pokedex_id: pkmnData.pokedex_id }
                });
        } catch (_e) {
            evolutionLine = [];
        }

        try {
            pkmnExtraData = await fetchPokemonExtraData(pkmnId);
        } catch (_e) {
            pkmnExtraData = {};
        }

        dataCache[pkmnId] = {
            descriptions: listDescriptions,
            extras: pkmnExtraData,
            evolutionLine,
        };
    }

    replaceImage(modal_DOM.img, pkmnData.sprites.regular);
    modal_DOM.img.alt = `sprite de ${pkmnData.name.fr}`;

    modal_DOM.pkmnName.textContent = `#${pkmnData.pokedex_id} ${pkmnData.name.fr}`;
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

    while (modal_DOM.listTypes.firstChild) {
        modal_DOM.listTypes.removeChild(modal_DOM.listTypes.firstChild);
    }

    const url = new URL(location);
    url.searchParams.set("id", pkmnData.pokedex_id);

    pkmnData.types.forEach((type) => {
        const li = document.createElement("li");
        li.textContent = type.name;
        li.classList.add(
            ...[cleanString(type.name), "py-0.5", "px-2", "rounded-md"]
        );

        modal_DOM.listTypes.append(li);
    });

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

    evolutionLine.forEach((evolution) => {
        const li = document.createElement("li")
        const ul = document.createElement("ul");
        ul.classList.add(...["flex", "flex-wrap", "gap-6"])
        evolution.forEach((item) => {       
            const clone = document.importNode(
                pokemonSpriteTemplateRaw.content,
                true
            );

            const img = clone.querySelector("img");
            img.alt = `Sprite de ${item.name}`;
            img.classList.replace("w-52", "w-36");
            replaceImage(img, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.pokedex_id}.png`);

            const textContainer = clone.querySelector("p");
            const evolutionName = document.createElement("p");
            evolutionName.textContent = item.condition;
            evolutionName.classList.add("text-xs", 'text-center')
            textContainer.textContent = item.name;
            textContainer.insertAdjacentElement("afterend", evolutionName);

            ul.append(clone);
        })
        li.append(ul);
        modal_DOM.listEvolutions.append(li);
        const nextArrow = document.createElement("li");
        nextArrow.textContent = "▼";
        nextArrow.inert = true;
        nextArrow.classList.add(...["flex", "items-center", "last:hidden", "arrow"])
        modal_DOM.listEvolutions.append(nextArrow);
    });

    if(pkmnData.evolution?.mega) {
        const li = document.createElement("li")
        const ul = document.createElement("ul");
        ul.classList.add(...["flex", "flex-wrap", "gap-6"])

        pkmnData.evolution.mega.forEach((item) => {
            // console.log(item);
            const clone = document.importNode(
                pokemonSpriteTemplateRaw.content,
                true
            );
            const img = clone.querySelector("img");
            img.alt = `Sprite de ${item.name}`;
            img.classList.replace("w-52", "w-36");
            replaceImage(img, item.sprites.regular);

            const textContainer = clone.querySelector("p");
            textContainer.textContent = `avec ${item.orbe}`;

            ul.append(clone);
        })

        li.append(ul);
        modal_DOM.listEvolutions.append(li);
    }

    const hasNoEvolutions = (evolutionLine.flat().length === 1) && (pkmnData.evolution?.mega || []).length === 0;
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

    clearTagContent(modal_DOM.listAbilities);

    pkmnData.talents.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.name;

        if (item.tc) {
            const clone = document.importNode(
                pkmnHighlightTemplateRaw.content,
                true
            );
            li.append(clone);
        }

        modal_DOM.listAbilities.append(li);
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
            sexLabel.textContent = "";
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

    console.log(pkmnData);
    
    const nextPokemon = listPokemon.at(pkmnData.pokedex_id) || (pkmnData.pokedex_id === listPokemon.length ? null : {});
    const prevPokemon = listPokemon[pkmnData.pokedex_id - 2] || {};

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

    if (pkmnData.pokedex_id === listPokemon.length) {
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

    document.documentElement.style.setProperty(
        "--header-height-collapsed",
        `${
            (modal_DOM.topInfos.offsetHeight +
                convertTailwindRemToPx(tailwindConfig.theme.padding["4"]) +
                convertTailwindRemToPx(tailwindConfig.theme.padding["2"])) /
            aRem
        }rem`
    );
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
