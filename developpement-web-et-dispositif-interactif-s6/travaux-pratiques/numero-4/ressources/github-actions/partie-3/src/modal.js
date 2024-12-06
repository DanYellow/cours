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
} from "./utils";

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

const tailwindConfig = resolveConfig(_tailwindConfig);

const modal_DOM = {
    pkmnName: modal.querySelector("h2"),
    img: modal.querySelector("img"),
    category: modal.querySelector("[data-category]"),
    listTypes: modal.querySelector("[data-list-types]"),
    listSensibilities: modal.querySelector("[data-list-sensibilities]"),
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
    listSprites: modal.querySelector("[data-list-sprites]"),
    topInfos: modal.querySelector("[data-top-infos]"),
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
    history.replaceState({}, "", url);
    modal.close();
});

const displayModal = async (pkmnData) => {
    let pkmnExtraData = dataCache[pkmnData.pokedex_id]?.extras;
    let listDescriptions = dataCache[pkmnData.pokedex_id]?.descriptions;
    if (!dataCache[pkmnData.pokedex_id]) {
        listDescriptions = await fetchPokemonDescription(pkmnData.pokedex_id);
        pkmnExtraData = await fetchPokemonExtraData(pkmnData.pokedex_id);

        dataCache[pkmnData.pokedex_id] = {
            descriptions: listDescriptions,
            extras: pkmnExtraData,
        };
    }

    modal_DOM.img.src = pkmnData.sprites.regular;
    modal_DOM.img.alt = `sprite de ${pkmnData.name.fr}`;

    modal_DOM.pkmnName.textContent = `#${pkmnData.pokedex_id} ${pkmnData.name.fr}`;
    document.title = `${modal_DOM.pkmnName.textContent} - ${initialPageTitle}`;

    if (listDescriptions.is_legendary || listDescriptions.is_mythical) {
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
    history.pushState({}, "", url);

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

    listDescriptions.flavor_text_entries.forEach((description) => {
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
        imgTag.src = pkmnForm.sprites.regular;
        imgTag.alt = `sprite de ${pkmnForm.name.fr} forme ${item.region}`;
        imgTag.fetchPriority = "low";
        clone.querySelector("figcaption").textContent = `${pkmnForm.name.fr}`;

        const button = clone.querySelector("[data-pokemon-data]");
        button.dataset.pokemonData = JSON.stringify(pkmnForm);
        button.addEventListener("click", (e) => {
            const pkmnDataRaw = e.currentTarget.dataset.pokemonData;

            const url = new URL(location);
            url.searchParams.set("region", item.region);
            history.replaceState({}, "", url);
            const pkmnData = JSON.parse(pkmnDataRaw);
            displayModal(pkmnData);
        });

        modal_DOM.listVarieties.append(clone);
    }
    modal_DOM.listVarieties.closest("details").inert =
        (pkmnData?.formes || []).length === 0;

    console.log(pkmnData);
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
