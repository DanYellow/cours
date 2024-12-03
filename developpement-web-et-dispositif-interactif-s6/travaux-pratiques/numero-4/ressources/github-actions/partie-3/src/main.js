import "./style.css";
import fetchPokemonForGeneration, { fetchPokemonDescription } from "./api";
import { getVersionForName } from "./utils";

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const pkdexTemplateRaw = document.querySelector("[data-tpl-id='pokedex']");
const pokedexContainer = document.querySelector("[data-list-pokedex]");
const loadGenerationBtn = document.querySelector("[data-load-generation]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-pokemon-modal]");

const displayDetails = async (e) => {
    const pkmnDataRaw = e.currentTarget.dataset.pokemonData;
    const pkmnData = JSON.parse(pkmnDataRaw);

    const imgTag = modal.querySelector("img");
    imgTag.src = pkmnData.sprites.regular;
    imgTag.alt = `sprite de ${pkmnData.name.fr}`;

    modal.querySelector("h2").textContent = `#${pkmnData.pokedex_id} ${pkmnData.name.fr}`;
    modal.querySelector("[data-sprite]").textContent = pkmnData.name.fr;

    const listTypes = modal.querySelector("[data-list-types]");

    while (listTypes.firstChild) {
        listTypes.removeChild(listTypes.firstChild);
    }

    pkmnData.types.forEach((type) => {
        const li = document.createElement("li");
        li.textContent = type.name;
        li.classList.add(...[type.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, ''), "rounded-lg", "px-2", "py-1"])

        listTypes.append(li);
    })

    const descriptionsContainer = modal.querySelector("dl");
    const listDescriptions = await fetchPokemonDescription(pkmnData.pokedex_id);

    while (descriptionsContainer.firstChild) {
        descriptionsContainer.removeChild(descriptionsContainer.firstChild);
    }

    listDescriptions.flavor_text_entries.forEach((description) => {
        const dt = document.createElement("dt");
        const versionName = `Pokémon ${getVersionForName[description.version.name] || "Unknown"}`
        dt.textContent = versionName;
        dt.classList.add("font-bold")
        descriptionsContainer.append(dt);
        
        const dd = document.createElement("dd");
        dd.textContent = description.flavor_text;
        dd.classList.add("mb-2")
        descriptionsContainer.append(dd);
    })

    modal.showModal();

    console.log(pkmnDataRaw);
};

const loadTemplateForGeneration = async (generation = 1) => {
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
        generationRange.textContent = `${pokedexData[0].pokedex_id} -> ${
            pokedexData.at(-1).pokedex_id
        }`;

        pokedexData.forEach((item) => {
            const clone = document.importNode(pkmnTemplateRaw.content, true);
            const imgTag = clone.querySelector("img");
            imgTag.src = item.sprites.regular;
            imgTag.alt = `sprite de ${item.name.fr}`;
            clone.querySelector(
                "figcaption"
            ).textContent = `#${item.pokedex_id} ${item.name.fr}`;

            const button = clone.querySelector("[data-pokemon-data]");
            button.dataset.pokemonData = JSON.stringify(item);
            button.addEventListener("click", displayDetails);

            pokedex.append(clone);
        });
        loadGenerationBtn.dataset.loadGeneration = Number(generation) + 1;

        pokedexContainer.append(cloneDex);
        loadGenerationBtn.inert = false;
    } catch (error) {
        console.log(error);
    }
};

loadTemplateForGeneration();

loadGenerationBtn.addEventListener("click", (e) => {
    loadTemplateForGeneration(e.currentTarget.dataset.loadGeneration);
});

closeModalBtn.addEventListener("click", () => {
    modal.close();
});