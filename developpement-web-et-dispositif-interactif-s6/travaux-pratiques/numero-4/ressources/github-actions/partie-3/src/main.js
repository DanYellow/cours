import {
    fetchPokemonForGeneration,
    fetchPokemon,
} from "#api";

import displayPkmnModal from "./pokemon-modal";
import {
    replaceImage,
    cleanString,
    delegateEventHandler,
    isElementInViewport,
    typesAnimatedBorderColor,
    tailwindConfig,
} from "./utils";
import { generationScrollingObserver, pokedexItemScrollingObserver, firstVisiblePkmn } from "./scroll-observer";

import loadingImageRaw from "/loading.svg?raw";
import pikachuLoadingImage from "/pikachu-loading.gif"
import "./style.css";

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const pkdexTemplateRaw = document.querySelector("[data-tpl-id='pokedex']");
const generationShortcutTemplateRaw = document.querySelector("[data-tpl-id='generation-shortcut-link']");
const marqueeTypeTextTemplateRaw = document.querySelector("[data-tpl-id='marquee-type-text']");
const marqueeTypeContainerTemplateRaw = document.querySelector("[data-tpl-id='marquee-type-container']");

const pokedexContainer = document.querySelector("[data-list-pokedex]");

const noGenerationBanner = document.querySelector("[data-no-generation-banner]");
const modal = document.querySelector("[data-pokemon-modal]");
const pikachuLoading = document.querySelector("[data-pikachu-loading]");
const faviconContainer = document.querySelector("[data-favicon]");
const generationShortcut = document.querySelector("[data-generation-shortcut]");

let isGridLayout = localStorage.getItem("is_grid_layout") ? JSON.parse(localStorage.getItem("is_grid_layout")) === true : true;
const initialPageTitle = document.title;
const initialPageFavicon = faviconContainer.getAttribute("href");

modal.dataset.isGridLayout = isGridLayout;

export const listPokemon = [];

export const setTitleTagForGeneration = () => {
    const allStickedHeaders = Array.from(document.querySelectorAll(".is-pinned"));
    let allStickedVisibleHeaders = allStickedHeaders.filter((item) => isElementInViewport(item));
    const currentHeader = (allStickedVisibleHeaders.at(-1) || document.querySelector("[data-header-pokedex]"));

    const currentHeaderIndex = allStickedVisibleHeaders.findIndex((item) => item === currentHeader);
    const indicatorId = `pokedex-${currentHeaderIndex === -1 ? 1 : currentHeaderIndex + 1}`

    const currentGenerationName = currentHeader.querySelector("h2").textContent.trim();
    document.title = `${currentGenerationName} - ${initialPageTitle}`;
    setScrollIndicator(indicatorId)
}

const setScrollIndicator = (indicatorId) => {
    generationShortcut.querySelectorAll("button").forEach((item) => {
        item.classList.toggle("font-bold", item.dataset.id.includes(indicatorId))
    })
}

export let hasReachPokedexEnd = false;

const updateSwitchIcons = (_isGridLayout) => {
    Array.from(document.querySelectorAll("[data-layout-switch]")).forEach((item) => {
        item.checked = _isGridLayout;
    });

    Array.from(document.querySelectorAll("[data-icon='list']")).forEach((item) => {
        item.classList.toggle("opacity-20", _isGridLayout)
    });

    Array.from(document.querySelectorAll("[data-icon='grid']")).forEach((item) => {
        item.classList.toggle("opacity-20", !_isGridLayout)
    });
}

const updatePokedexLayout = (_isGridLayout) => {
    Array.from(document.querySelectorAll("[data-pokedex]")).forEach((item) => {
        item.classList.toggle("grid-cols-3", _isGridLayout);
        item.classList.toggle("md:grid-cols-5", _isGridLayout);
        item.classList.toggle("lg:grid-cols-6", _isGridLayout);
        item.classList.toggle("grid-cols-1", !_isGridLayout);
    });
};

updatePokedexLayout(isGridLayout);

const loadDetailsModal = async (e) => {
    e.preventDefault();

    const pkmnDataRaw = e.currentTarget.dataset.pokemonData;
    const pkmnData = JSON.parse(pkmnDataRaw);
    await displayPkmnModal(pkmnData);

    modal.showModal();

    const url = new URL(location);
    url.searchParams.set("id", pkmnData.pokedex_id);
    history.pushState({}, "", url);
}

const generateMarqueeTypes = (e) => {
    if (e.currentTarget.dataset.hasMarqueeTypes) {
        return;
    }
    e.currentTarget.dataset.hasMarqueeTypes = true;
    const nbMarqueeTextToGenerate = 7;
    const marqueeTypeContainer = e.currentTarget.querySelector("[data-marquee]");
    const pkmnData = JSON.parse(e.currentTarget.dataset.pokemonData);
    pkmnData.types.forEach((type, idx) => {
        const scrollTypeContainerTemplate = document.importNode(marqueeTypeContainerTemplateRaw.content, true);
        const scrollTypeContainer = scrollTypeContainerTemplate.querySelector("div");
        scrollTypeContainer.style.backgroundColor = tailwindConfig.theme.colors[`type_${cleanString(type.name)}`];
        scrollTypeContainer.setAttribute("aria-label", `Type ${idx + 1} ${type.name}`);

        for (let index = 0; index <= nbMarqueeTextToGenerate; index++) {
            const typeText = document.importNode(marqueeTypeTextTemplateRaw.content, true);
            typeText.querySelector("p").textContent = type.name;
            if (idx === 1) {
                typeText.querySelector("p").style.animationDirection = "reverse";
            }
            scrollTypeContainer.append(typeText);
        }
        marqueeTypeContainer.append(scrollTypeContainer);
    })
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
        headerPokedex.dataset.headerPokedex = generation;

        let nonRegionalPokedexData = pokedexData.filter((item) => {
            const name = item.name.fr;
            const listNames = (item.formes || []).map((form) => form.name.fr);

            return !listNames.includes(name);
        })

        generationNumber.textContent = `#${generation}`;
        const firstPkmnId = nonRegionalPokedexData[0].pokedex_id;

        generationRange.textContent = `${String(firstPkmnId).padStart(4, '0')} ➜ ${
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

            const encodedData = window.btoa(loadingImageRaw.replaceAll("#037ef3", tailwindConfig.theme.colors[`type_${cleanString(item.types[0].name)}`]));
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
                typesAnimatedBorderColor[`${cleanString(item.types[0].name)}_${cleanString(item.types[1]?.name || item.types?.[0].name)}`]
            ]);
            aTag.addEventListener("click", loadDetailsModal);
            aTag.addEventListener("mouseover", generateMarqueeTypes);
            aTag.addEventListener("focus", generateMarqueeTypes);
            if (index === 0) {
                aTag.id = `pokedex-${generation}`;
            }

            pokedex.append(clone);
            pokedexItemScrollingObserver.observe(aTag);
        });
        listLoadGenerationBtns.forEach((item) => item.dataset.loadGeneration = Number(generation) + 1);

        updateSwitchIcons(isGridLayout);
        updatePokedexLayout(isGridLayout);
        setTimeout(() => {
            layoutSwitch.nextElementSibling.classList.add("after:transition-all")
        }, 500)

        generationScrollingObserver.observe(headerPokedex);

        const generationShortcutTemplate = document.importNode(generationShortcutTemplateRaw.content, true);
        const buttonGenerationShorcutTemplate = generationShortcutTemplate.querySelector("button");
        buttonGenerationShorcutTemplate.textContent = `#${generation}`;
        buttonGenerationShorcutTemplate.dataset.id = `pokedex-${generation}`;
        buttonGenerationShorcutTemplate.setAttribute("aria-label", `Accéder à la génération ${generation}`);
        buttonGenerationShorcutTemplate.addEventListener("click", () => {
            document.querySelector(`#pokedex-${generation}`).scrollIntoView();
        });
        generationShortcut.append(generationShortcutTemplate);
        generationShortcut.classList.replace("opacity-0", "opacity-100");
        generationShortcut.classList.replace("hidden", "flex");

        listLoadGenerationBtns.forEach((item) => item.inert = false);
        if (triggerElement) {
            triggerElement.parentNode.parentNode.removeChild(triggerElement.parentNode)
        }
        const pokedexLoadedEvent = new CustomEvent("pokedexLoaded", {
            detail: {
                pokedexId: generation,
            },
        });
        window.dispatchEvent(pokedexLoadedEvent);
    } catch (error) {
        const errorRessourceNotFound = 404;
        const errorMessageContainer = noGenerationBanner.querySelector("[data-error-message]");
        if (error?.cause?.status === errorRessourceNotFound) {
            listLoadGenerationBtns.forEach((item) => item.inert = true);
            hasReachPokedexEnd = true;

            errorMessageContainer.textContent = "Impossible d'afficher cette génération, car elle n'existe pas.";
        } else {
            console.error(error);
            errorMessageContainer.textContent = "Une erreur est survenue.";
            listLoadGenerationBtns.forEach((item) => item.inert = false);
        }
        noGenerationBanner.showPopover();
    }
};

const urlParams = new URLSearchParams(window.location.search);
const pkmnId = urlParams.get("id");

if (pkmnId !== null) {
    const pkmnData = await fetchPokemon(pkmnId, urlParams.get("region"));
    pkmnData.alternate_form_id = urlParams.get("alternate_form_id");

    await displayPkmnModal(pkmnData);
    modal.showModal();
}

await loadPokedexForGeneration(1);

delegateEventHandler(document, "click", "[data-load-generation]", (e) => {
    loadPokedexForGeneration(e.target.dataset.loadGeneration, e.target.dataset.selfDelete === "" ? e.target : null);
});

delegateEventHandler(document, "change", "[data-layout-switch]", (e) => {
    localStorage.setItem("is_grid_layout", e.target.checked);

    updatePokedexLayout(e.target.checked);
    updateSwitchIcons(e.target.checked);
    isGridLayout = e.target.checked;
    modal.dataset.isGridLayout = e.target.checked;

    if(window.scrollY !== 0) {
        firstVisiblePkmn.scrollIntoView({
            behavior: "instant",
        });
    }
});

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
    await import("./utils/vite.error-overlay");
}

const scrollDiv = document.createElement("div");
scrollDiv.classList.add("scrollbar-measure");
document.body.appendChild(scrollDiv);

// Get the scrollbar width
const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`)

// Delete the DIV
document.body.removeChild(scrollDiv);

window.addEventListener("offline", () => {
    const errorMessageContainer = noGenerationBanner.querySelector("[data-error-message]");
    errorMessageContainer.textContent = "Connexion perdue";
    noGenerationBanner.showPopover();
});

export { loadPokedexForGeneration };
