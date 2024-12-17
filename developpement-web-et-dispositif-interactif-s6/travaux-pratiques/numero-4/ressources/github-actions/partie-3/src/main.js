import fetchPokemonForGeneration, {
    fetchPokemon,
} from "./api";
import displayPkmnModal, { tailwindConfig } from "./modal";
import {
    replaceImage,
    cleanString,
    delegateEventHandler,
    isElementInViewport,
} from "./utils";
import { generationScrollingObserver, pokedexItemScrollingObserver, firstVisiblePkmn } from "./scroll-observer";

import { typesBorderColor } from "./colors";

import loadingImage from "/loading.svg?raw";
import pikachuLoadingImage from "/pikachu-loading.gif"
import "./style.css";

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const pkdexTemplateRaw = document.querySelector("[data-tpl-id='pokedex']");
const pokedexContainer = document.querySelector("[data-list-pokedex]");

const noGenerationBanner = document.querySelector("[data-no-generation-banner]");
const modal = document.querySelector("[data-pokemon-modal]");
const pikachuLoading = document.querySelector("[data-pikachu-loading]");
const faviconContainer = document.querySelector("[data-favicon]")

const initialPageTitle = document.title;
const initialPageFavicon = faviconContainer.getAttribute("href");
const listPokemon = [];

const setTitleTagForGeneration = () => {
    const allStickedHeaders = Array.from(document.querySelectorAll(".is-pinned"));
    let allStickedVisibleHeaders = allStickedHeaders.filter((item) => isElementInViewport(item));
    const currentGenerationName = (allStickedVisibleHeaders.at(-1) || document.querySelector("[data-header-pokedex]") ).querySelector("h2").textContent.trim();
    document.title = `${currentGenerationName} - ${initialPageTitle}`;
}

export { listPokemon, setTitleTagForGeneration };

const updateSwitchIcons = (isGridLayout) => {
    Array.from(document.querySelectorAll("[data-layout-switch]")).forEach((item) => {
        item.checked = isGridLayout;
    });

    Array.from(document.querySelectorAll("[data-icon='list']")).forEach((item) => {
        item.classList.toggle("opacity-50", isGridLayout)
    });
    
    Array.from(document.querySelectorAll("[data-icon='grid']")).forEach((item) => {
        item.classList.toggle("opacity-50", !isGridLayout)
    });
}

const updatePokedexLayout = (isGridLayout) => {
    Array.from(document.querySelectorAll("[data-pokedex]")).forEach((item) => {
        item.classList.toggle("grid-cols-3", isGridLayout);
        item.classList.toggle("md:grid-cols-5", isGridLayout);
        item.classList.toggle("lg:grid-cols-6", isGridLayout);
        item.classList.toggle("px-2", isGridLayout);
        item.classList.toggle("grid-cols-1", !isGridLayout);
    });
}

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
    document.title = `Chargement - ${initialPageTitle}`;
    faviconContainer.setAttribute("href", pikachuLoadingImage);
    
    try {
        listLoadGenerationBtns.forEach((item) => item.inert = true);
        const pokedexData = await fetchPokemonForGeneration(generation);
        const cloneDex = document.importNode(pkdexTemplateRaw.content, true);
        
        const pokedex = cloneDex.querySelector("[data-pokedex]");

        const layoutSwitch = cloneDex.querySelector("[data-layout-switch]")
        layoutSwitch.checked = JSON.parse(localStorage.getItem("is_grid_layout") === true);

        const generationNumber = cloneDex.querySelector(
            "[data-generation-number]"
        );
        const generationRange = cloneDex.querySelector(
            "[data-generation-range]"
        );
        const headerPokedex = cloneDex.querySelector('[data-header-pokedex]');
        
        let nonRegionalPokedexData = pokedexData.filter((item) => {
            const name = item.name.fr;
            const listNames = (item.formes || []).map((form) => form.name.fr);

            return !listNames.includes(name);
        })

        generationNumber.textContent = `#${generation}`;
        const firstPkmnId = nonRegionalPokedexData[0].pokedex_id;

        generationRange.textContent = `${String(firstPkmnId).padStart(4, '0')} -> ${
            String(nonRegionalPokedexData.at(-1).pokedex_id).padStart(4, '0')
        }`;

        const fetchPriorityHighThreshold = 20;
        const url = new URL(window.location);

        nonRegionalPokedexData = nonRegionalPokedexData.map((item) => {
            const pkmnUpdated = {...item, ...(listPokemon.find((pkmn) => pkmn?.pokedex_id === item.pokedex_id) || {})}
            listPokemon[item.pokedex_id - 1] = pkmnUpdated;

            return pkmnUpdated;
        })
        pokedexContainer.append(cloneDex);

        nonRegionalPokedexData.forEach((item, index) => {
            url.searchParams.set("id", item.pokedex_id)

            if (firstPkmnId > item.pokedex_id) {
                return;
            }
            const clone = document.importNode(pkmnTemplateRaw.content, true);
            const imgTag = clone.querySelector("img");

            const encodedData = window.btoa(loadingImage.replaceAll("#037ef3", tailwindConfig.theme.colors[`type_${cleanString(item.types[0].name)}`]));
            imgTag.src = `data:image/svg+xml;base64,${encodedData}`;

            replaceImage(imgTag, item.sprites.regular);

            imgTag.alt = `sprite de ${item.name.fr}`;
            imgTag.fetchPriority =
                index <= fetchPriorityHighThreshold ? "high" : "low";

            const pkmnNameContainer = clone.querySelector("[data-pkmn-name]")
            pkmnNameContainer.textContent = `#${String(item.pokedex_id).padStart(4, '0')}\n${item.name.fr}`;

            const aTag = clone.querySelector("[data-pokemon-data]");
            aTag.href = url;
            aTag.style.scrollMargin = `${headerPokedex.offsetHeight}px`;
            aTag.dataset.pokemonData = JSON.stringify(item);
            aTag.dataset.pokemonId = item.pokedex_id;
            aTag.classList.add(...[
                typesBorderColor[`${cleanString(item.types[0].name)}_${cleanString(item.types[1]?.name || item.types?.[0].name)}`]
            ]);
            aTag.addEventListener("click", loadDetailsModal);

            pokedex.append(clone);
            pokedexItemScrollingObserver.observe(aTag);
        });
        listLoadGenerationBtns.forEach((item) => item.dataset.loadGeneration = Number(generation) + 1);

        updateSwitchIcons(localStorage.getItem("is_grid_layout") ? JSON.parse(localStorage.getItem("is_grid_layout")) === true : true);
        updatePokedexLayout(localStorage.getItem("is_grid_layout") ? JSON.parse(localStorage.getItem("is_grid_layout")) === true : true)

        generationScrollingObserver.observe(headerPokedex);

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

const urlParams = new URLSearchParams(window.location.search);
const pkmnId = urlParams.get("id");

if (pkmnId !== null) {
    const pkmnData = await fetchPokemon(pkmnId, urlParams.get("region"));
    pkmnData.alternate_form_id = urlParams.get("alternate_form_id");
    displayPkmnModal(pkmnData);
}

await loadPokedexForGeneration(1);

delegateEventHandler(document, "click", "[data-load-generation]", (e) => {
    loadPokedexForGeneration(e.target.dataset.loadGeneration, e.target.dataset.selfDelete === "" ? e.target : null);
});

delegateEventHandler(document, "change", "[data-layout-switch]", (e) => {
    localStorage.setItem("is_grid_layout", e.target.checked);
    
    updatePokedexLayout(e.target.checked)
    updateSwitchIcons(e.target.checked);

    firstVisiblePkmn.scrollIntoView({
        behavior: "instant",
    });
});

updatePokedexLayout(JSON.parse(localStorage.getItem("is_grid_layout")) === true)
updateSwitchIcons(JSON.parse(localStorage.getItem("is_grid_layout")) === true);

window.addEventListener('popstate', async () => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("id") !== null) {
        const pkmnData = await fetchPokemon(Number(urlParams.get("id")), urlParams.get("region"));
        pkmnData.alternate_form_id = urlParams.get("alternate_form_id");
        displayPkmnModal(pkmnData);
    } else {
        modal.close();
    }
});

window.addEventListener("startloading", () => {
    pikachuLoading.classList.remove("hidden");
    faviconContainer.setAttribute("href", pikachuLoadingImage);
});

window.addEventListener("endloading", () => {
    pikachuLoading.classList.add("hidden");
    faviconContainer.setAttribute("href", initialPageFavicon);
});

if (process.env.NODE_ENV === "development") {
    await import("./vite.error-overlay");
}

export { loadPokedexForGeneration };
