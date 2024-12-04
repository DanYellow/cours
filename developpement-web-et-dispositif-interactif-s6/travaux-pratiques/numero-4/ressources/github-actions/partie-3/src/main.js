import "./style.css";
import fetchPokemonForGeneration, {
    fetchPokemonDescription,
    fetchAllTypes,
    fetchPokemonExtraData,
    fetchPokemon,
} from "./api";
import { getVersionForName, cleanString, clearTagContent } from "./utils";

import loadingImage from "/loading.svg";

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const pkdexTemplateRaw = document.querySelector("[data-tpl-id='pokedex']");
const pkmnSensibilityTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-sensibility']"
);
const pkmnHighlightTemplateRaw = document.querySelector(
    "[data-tpl-id='pokemon-highlight']"
);

const pokedexContainer = document.querySelector("[data-list-pokedex]");
const loadGenerationBtn = document.querySelector("[data-load-generation]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-pokemon-modal]");

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
};

const dataCache = {};

let listTypes = await fetchAllTypes();
listTypes = listTypes.map((item) => ({
    sprite: item.sprites,
    name: cleanString(item.name.fr),
}));

const displayDetails = async (pkmnData) => {
    modal_DOM.img.src = pkmnData.sprites.regular;
    modal_DOM.img.alt = `sprite de ${pkmnData.name.fr}`;

    modal_DOM.pkmnName.textContent = `#${pkmnData.pokedex_id} ${pkmnData.name.fr}`;
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
        damageFactorContainer.classList.toggle(
            "font-bold",
            item.multiplier === 2 || item.multiplier === 4
        );

        if(item.multiplier === 2 || item.multiplier === 4) {
            const cloneHighlight = document.importNode(
                pkmnHighlightTemplateRaw.content,
                true
            );
            cloneHighlight.querySelector("span").textContent = item.multiplier === 2 ? "Double faiblesse" : "Quadruple faiblesse";

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
    
    for (const item of (pkmnData?.formes || [])) {
        const pkmnForm = await fetchPokemon(pkmnData.pokedex_id, item.region);

        const clone = document.importNode(pkmnTemplateRaw.content, true);
        const imgTag = clone.querySelector("img");
        imgTag.src = pkmnForm.sprites.regular;
        imgTag.alt = `sprite de ${pkmnForm.name.fr} forme ${pkmnForm.region}`;
        imgTag.fetchPriority = "low";
        clone.querySelector(
            "figcaption"
        ).textContent = `${pkmnForm.name.fr}`;

        modal_DOM.listVarieties.append(clone);
    }

    console.log(pkmnData)
    modal.showModal();
};

const loadPokedexForGeneration = async (generation = 1) => {
    try {
        loadGenerationBtn.inert = true;
        const pokedexData = await fetchPokemonForGeneration(generation);
        const cloneDex = document.importNode(pkdexTemplateRaw.content, true);
        const pokedex = cloneDex.querySelector("[data-pokedex]");
        const generationNumber = cloneDex.querySelector(
            "[data-generation-number]"
        );
        const generationRange = cloneDex.querySelector(
            "[data-generation-range]"
        );

        generationNumber.textContent = `#${generation}`;
        const firstPkmnId = pokedexData[0].pokedex_id;
        generationRange.textContent = `${firstPkmnId} -> ${
            pokedexData.at(-1).pokedex_id
        }`;

        pokedexData.forEach((item, index) => {
            if(firstPkmnId > item.pokedex_id) {
                return;
            }
            const clone = document.importNode(pkmnTemplateRaw.content, true);
            const imgTag = clone.querySelector("img");
            imgTag.src = item.sprites.regular;
            imgTag.alt = `sprite de ${item.name.fr}`;
            imgTag.fetchPriority = index <= 20 ? "high" : "low";
            clone.querySelector(
                "figcaption"
            ).textContent = `#${item.pokedex_id} ${item.name.fr}`;

            const button = clone.querySelector("[data-pokemon-data]");
            button.dataset.pokemonData = JSON.stringify(item);
            button.addEventListener("click", (e) => {
                const pkmnDataRaw = e.currentTarget.dataset.pokemonData;
                const pkmnData = JSON.parse(pkmnDataRaw);
                displayDetails(pkmnData);
            });

            pokedex.append(clone);
        });
        loadGenerationBtn.dataset.loadGeneration = 8; // Number(generation) + 1;

        pokedexContainer.append(cloneDex);
        loadGenerationBtn.inert = false;
    } catch (error) {
        if(error?.cause?.status === 404) {
            loadGenerationBtn.inert = true;
        } else {
            loadGenerationBtn.inert = false;
        }
    }
};

await loadPokedexForGeneration();

const urlParams = new URLSearchParams(window.location.search);
const pkmnId = urlParams.get("id");

if (pkmnId !== null) {
    const pkmnData = await fetchPokemon(pkmnId)
    displayDetails(pkmnData);
}

loadGenerationBtn.addEventListener("click", (e) => {
    loadPokedexForGeneration(e.currentTarget.dataset.loadGeneration);
});

closeModalBtn.addEventListener("click", () => {
    const url = new URL(location);
    url.searchParams.delete("id");
    history.replaceState({}, "", url);
    modal.close();
});

modal.addEventListener("close", () => {
    modal_DOM.img.src = loadingImage;
    modal_DOM.img.alt = "";
})