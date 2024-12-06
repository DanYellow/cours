import resolveConfig from "tailwindcss/resolveConfig";
import _tailwindConfig from "/tailwind.config.js";

import {
    fetchPokemonDescription,
    fetchAllTypes,
    fetchPokemonExtraData,
    fetchPokemon,
} from "./api";

import {
    getVersionForName,
    cleanString,
    clearTagContent,
    convertTailwindRemToPx,
    aRem,
    replaceImage,
} from "./utils";

import { listPokemon } from "./main";

import loadingImage from "/loading.svg";

const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-pokemon-modal]");
const pkmnSensibilityTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-sensibility']"
);
const pkmnHighlightTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-highlight']"
);
const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const listPokemonSpritesTemplateRaw = document.querySelector("[data-tpl-id='pokemon-list-sprites']");
const pokemonSpriteTemplateRaw = document.querySelector("[data-tpl-id='pokemon-sprite']");
const pokemonSiblingTemplateRaw = document.querySelector("[data-tpl-id='pokemon-sibling']");

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
    document.title = initialPageTitle;
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
    e.preventDefault()
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
}

displayModal = async (pkmnData) => {
    const pkmnId = pkmnData?.alternate_form_id || pkmnData.pokedex_id;

    let pkmnExtraData = dataCache[pkmnId]?.extras;
    let listDescriptions = dataCache[pkmnId]?.descriptions;
    if (!dataCache[pkmnId]) {
        try {
            listDescriptions = await fetchPokemonDescription(pkmnId);
        } catch (_e) {
            listDescriptions = {}
        }

        try {
            pkmnExtraData = await fetchPokemonExtraData(pkmnId);
        } catch (_e) {
            pkmnExtraData = {}
        }

        dataCache[pkmnId] = {
            descriptions: listDescriptions,
            extras: pkmnExtraData,
        };
    }

    modal_DOM.img.src = pkmnData.sprites.regular;
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

    // clearTagContent(modal_DOM.listEvolutions);
    // const listEvolutions = [...(pkmnData.evolution?.pre || []), { pokedex_id: pkmnData.pokedex_id, name: pkmnData.name.fr , condition: "" }, ...(pkmnData.evolution?.next || [])]
    // listEvolutions.forEach((item) => {
    //     const clone = document.importNode(
    //         pokemonSpriteTemplateRaw.content,
    //         true
    //     );

    //     const img = clone.querySelector("img");
    //     img.alt = `Sprite de ${item.name}`;
    //     img.classList.replace("w-52", "w-36");
    //     replaceImage(img, `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.pokedex_id}.png`);

    //     const textContainer = clone.querySelector("p");
    //     const evolutionName = document.createElement("p");
    //     evolutionName.textContent = item.condition;
    //     evolutionName.classList.add("text-xs", 'text-center')
    //     textContainer.textContent = item.name;
    //     textContainer.insertAdjacentElement("afterend", evolutionName);

    //     modal_DOM.listEvolutions.append(clone);
        
    //     const nextArrow = document.createElement("li");
    //     nextArrow.textContent = "►";
    //     nextArrow.classList.add(...["flex", "items-center", "last:hidden"])
    //     modal_DOM.listEvolutions.append(nextArrow);
    // })


    clearTagContent(modal_DOM.listSensibilities);

    pkmnData.resistances.forEach((item) => {
        const clone = document.importNode(
            pkmnSensibilityTemplateRaw.content,
            true
        );
        const typeData = listTypes.find(
            (type) => cleanString(type.name) === cleanString(item.name)
        );
        const damageFactorContainer = clone.querySelector(
            "[data-damage-factor]"
        );

        clone.querySelector("img").src = typeData.sprite;
        clone.querySelector("[data-type]").textContent = item.name;
        damageFactorContainer.textContent = `x${item.multiplier}`;

        const effectiveDamageMultiplier = 2;
        const superEffectiveDamageMultiplier = 4;
        damageFactorContainer.classList.toggle(
            "font-bold",
            item.multiplier === effectiveDamageMultiplier ||
                item.multiplier === superEffectiveDamageMultiplier
        );

        if (
            item.multiplier === effectiveDamageMultiplier ||
            item.multiplier === superEffectiveDamageMultiplier
        ) {
            const cloneHighlight = document.importNode(
                pkmnHighlightTemplateRaw.content,
                true
            );
            const isTypeEffectiveAgainst =
                item.multiplier === effectiveDamageMultiplier;
            cloneHighlight.querySelector("span").textContent =
                isTypeEffectiveAgainst
                    ? "Double faiblesse"
                    : "Quadruple faiblesse";

            damageFactorContainer.append(cloneHighlight);
        }

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

    const listSpritesObj = pkmnExtraData.sprites.other.home;
    const listSprites = [];
    Object.entries(listSpritesObj).forEach(([key, value]) => {
        if(value === null) {
            return;
        }
        listSprites.push({name: key, sprite: value})
    });
    const groupedSprites = Object.groupBy(listSprites, ({ name }) => name.includes("female") ? "Female ♀" : "Male ♂");

    Object.entries(groupedSprites).forEach(([key, sprites]) => {
        const listPokemonSpritesTemplate = document.importNode(
            listPokemonSpritesTemplateRaw.content,
            true
        );
        listPokemonSpritesTemplate.querySelector("p").textContent = `${key} ${(Object.keys(groupedSprites).length) === 1 ? '/ Female ♀' : ''}`;
        if (pkmnData.sexe?.female === undefined && pkmnData.sexe?.male === undefined) {
            listPokemonSpritesTemplate.querySelector("p").textContent =  "";
        }

        const listSpritesUI = listPokemonSpritesTemplate.querySelector("[data-list-sprites]");
        sprites.forEach((item) => {
            const pokemonSpriteTemplate = document.importNode(
                pokemonSpriteTemplateRaw.content,
                true
            );

            const img = pokemonSpriteTemplate.querySelector("img");
            replaceImage(img, item.sprite);

            img.alt = `sprite ${key} de ${pkmnData.name.fr}`;

            if(!item.name.includes("shiny")) {
                pokemonSpriteTemplate.querySelector("p").classList.add("hidden");
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

        const clone = document.importNode(pkmnTemplateRaw.content, true);
        const imgTag = clone.querySelector("img");
        replaceImage(imgTag, pkmnForm.sprites.regular);
        imgTag.alt = `sprite de ${pkmnForm.name.fr} forme ${item.region}`;
        imgTag.fetchPriority = "low";
        clone.querySelector("figcaption").textContent = `${pkmnForm.name.fr}`;

        const aTag = clone.querySelector("[data-pokemon-data]");
        const alternateForm = listDescriptions.varieties?.filter((_item) => !_item.is_default).find((_item) => {
            return _item.pokemon?.name.includes(item.region);
        });
        
        if (alternateForm) {
            pkmnForm.alternate_form_id = alternateForm?.pokemon.url?.split('/').filter(Boolean).at(-1)
            url.searchParams.set("region", item.region);
            url.searchParams.set("alternate_form_id", pkmnForm.alternate_form_id);
        }
        
        aTag.href = url;
        aTag.dataset.pokemonData = JSON.stringify(pkmnForm);
        aTag.addEventListener("click", (e) => loadDetailsModal(e, item.region));

        modal_DOM.listVarieties.append(clone);
    }
    modal_DOM.listVarieties.closest("details").inert =
        (pkmnData?.formes || []).length === 0;

    console.log(pkmnData);
    // console.log(listPokemon.at(pkmnData.pokedex_id - 1));
    const nextPokemon = listPokemon.at(pkmnData.pokedex_id) || {};
    const prevPokemon = listPokemon[pkmnData.pokedex_id - 2] || {};

    clearTagContent(modal_DOM.listSiblings);
    [prevPokemon, pkmnData, nextPokemon].forEach((item, idx) => {
        const clone = document.importNode(pokemonSiblingTemplateRaw.content, true);
        
        const li = clone.querySelector("li");

        // , "md:[display:revert]
        li.classList.toggle("shrink-0", idx === 1);
        li.classList.toggle("hidden", idx === 1);
        li.classList.toggle("md:[display:revert]", idx === 1);
        li.classList.toggle("grow", idx !== 1);

        if(Object.keys(item).length > 0) {
            const imgTag = clone.querySelector("img");
            imgTag.src = loadingImage;
            replaceImage(imgTag, item.sprites.regular);
            imgTag.classList.toggle("hidden", idx === 1);
    
            const name = clone.querySelector("[data-name]");
            name.textContent = item.name.fr;
            
            const pkmnId = clone.querySelector("[data-id]");
            pkmnId.textContent = `#${item.pokedex_id}`;
            pkmnId.classList.toggle("text-center", idx === 1);
    
            const siblingUrl = new URL(location);
            siblingUrl.searchParams.set("id", item.pokedex_id);
            siblingUrl.searchParams.delete("region");
            siblingUrl.searchParams.delete("alternate_form_id");
            const aTag = clone.querySelector("a");
            aTag.href = siblingUrl;
            aTag.dataset.pokemonData = JSON.stringify(item);
            aTag.addEventListener("click", (e) => loadDetailsModal(e));
        }
        li.inert = idx === 1 || Object.keys(item).length === 0;

        modal_DOM.listSiblings.append(clone);
    })

    modal.showModal();

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


export default displayModal;
