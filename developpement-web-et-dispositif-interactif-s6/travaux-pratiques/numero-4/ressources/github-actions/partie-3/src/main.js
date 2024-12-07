import fetchPokemonForGeneration, {
    fetchPokemon,
} from "./api";
import displayPkmnModal, { tailwindConfig } from "./modal";
import {
    replaceImage,
    cleanString,
    delegateEventHandler,
} from "./utils";

import loadingImage from "/loading.svg?raw";
import "./style.css";

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const pkdexTemplateRaw = document.querySelector("[data-tpl-id='pokedex']");
const pokedexContainer = document.querySelector("[data-list-pokedex]");

const noGenerationBanner = document.querySelector("[data-no-generation-banner]");
const modal = document.querySelector("[data-pokemon-modal]");

const listPokemon = [];

export { listPokemon };

const loadDetailsModal = (e) => {
    e.preventDefault()
    const pkmnDataRaw = e.currentTarget.dataset.pokemonData;
    const pkmnData = JSON.parse(pkmnDataRaw);
    displayPkmnModal(pkmnData);

    const url = new URL(location);
    url.searchParams.set("id", pkmnData.pokedex_id);
    history.pushState({}, "", url);
}

const loadPokedexForGeneration = async (generation = 1, triggerElement) => {
    const listLoadGenerationBtns = document.querySelectorAll("[data-load-generation]");

    try {
        listLoadGenerationBtns.forEach((item) => item.inert = true);
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

        const fetchPriorityHighThreshold = 20;
        const url = new URL(window.location);

        listPokemon.push(...pokedexData);
        
        pokedexData.forEach((item, index) => {
            url.searchParams.set("id", item.pokedex_id)

            if (firstPkmnId > item.pokedex_id) {
                return;
            }
            const clone = document.importNode(pkmnTemplateRaw.content, true);
            const imgTag = clone.querySelector("img");

            const newImg = new Image();
            newImg.onload = () => {
                imgTag.src = newImg.src; 
            }
            newImg.src = item.sprites.regular;    

            const encodedData = window.btoa(loadingImage.replaceAll("#037ef3", tailwindConfig.theme.colors[`type_${cleanString(item.types[0].name)}`]));
            imgTag.src = `data:image/svg+xml;base64,${encodedData}`;

            replaceImage(imgTag, item.sprites.regular);

            imgTag.alt = `sprite de ${item.name.fr}`;
            imgTag.fetchPriority =
                index <= fetchPriorityHighThreshold ? "high" : "low";
            clone.querySelector(
                "figcaption"
            ).textContent = `#${item.pokedex_id} ${item.name.fr}`;

            const aTag = clone.querySelector("[data-pokemon-data]");
            aTag.href = url;
            aTag.dataset.pokemonData = JSON.stringify(item);
            aTag.addEventListener("click", loadDetailsModal);

            pokedex.append(clone);
        });
        listLoadGenerationBtns.forEach((item) => item.dataset.loadGeneration = Number(generation) + 1);

        pokedexContainer.append(cloneDex);
        listLoadGenerationBtns.forEach((item) => item.inert = false);
        if (triggerElement) {
            triggerElement.parentNode.parentNode.removeChild(triggerElement.parentNode)
        }
    } catch (error) {
        const errorRessourceNotFound = 404;
        if (error?.cause?.status === errorRessourceNotFound) {
            listLoadGenerationBtns.forEach((item) => item.inert = true);
            noGenerationBanner.showPopover();
        } else {
            listLoadGenerationBtns.forEach((item) => item.inert = false);
        }
    }
};

await loadPokedexForGeneration();

const urlParams = new URLSearchParams(window.location.search);
const pkmnId = urlParams.get("id");

if (pkmnId !== null) {
    const pkmnData = await fetchPokemon(pkmnId, urlParams.get("region"));
    pkmnData.alternate_form_id = urlParams.get("alternate_form_id");
    displayPkmnModal(pkmnData);
}

delegateEventHandler(document, "click", "[data-load-generation]", (e) => {
    loadPokedexForGeneration(e.target.dataset.loadGeneration, e.target.dataset.selfDelete === "" ? e.target : null);
});

window.addEventListener('popstate', async () => {
    const urlParams = new URLSearchParams(window.location.search);

    if(urlParams.get("id") !== null) {
        const pkmnData = await fetchPokemon(urlParams.get("id"), urlParams.get("region"));
        pkmnData.alternate_form_id = urlParams.get("alternate_form_id");
        displayPkmnModal(pkmnData);
    } else {
        modal.close();
    }
});