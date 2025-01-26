import {
    fetchPokemonForGeneration,
    fetchPokemon,
} from "#api";

import loadPokemonData from "./pokemon-modal";
import {
    replaceImage,
    cleanString,
    delegateEventHandler,
    isElementInViewport,
    typesAnimatedBorderColor,
    onTransitionsEnded,
    NB_NUMBER_INTEGERS_PKMN_ID,
    HTTP_NOT_FOUND_CODE_ERROR,
    POPOVER_ERRORS,
} from "./utils";
import { generationScrollingObserver, pokedexItemScrollingObserver, firstVisiblePkmn } from "./scroll-observer";

import ripple from '#src/worklets/ripple.js?url';
import loadingImageRaw from "/images/loading.svg?raw";

import "#src/window-events.js";

import "#src/styles/main.css";

if ('paintWorklet' in CSS) {
    CSS.paintWorklet.addModule(ripple);
}

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const pkdexTemplateRaw = document.querySelector("[data-tpl-id='pokedex']");
const generationShortcutTemplateRaw = document.querySelector("[data-tpl-id='generation-shortcut-link']");
const marqueeTypeTextTemplateRaw = document.querySelector("[data-tpl-id='marquee-type-text']");
const marqueeTypeContainerTemplateRaw = document.querySelector("[data-tpl-id='marquee-type-container']");

const pokedexContainer = document.querySelector("[data-list-pokedex]");

const errorPopover = document.querySelector("[data-error-popover]");
const errorMessageContainer = errorPopover.querySelector("[data-error-message]");

const modal = document.querySelector("[data-pokemon-modal]");
const generationShortcut = document.querySelector("[data-generation-shortcut]");

let isGridLayout = localStorage.getItem("is_grid_layout") ? JSON.parse(localStorage.getItem("is_grid_layout")) === true : true;
const initialPageTitle = document.title;

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
        item.classList.toggle("opacity-20", _isGridLayout);
    });

    Array.from(document.querySelectorAll("[data-icon='grid']")).forEach((item) => {
        item.classList.toggle("opacity-20", !_isGridLayout);
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


export const rippleEffect = (e, color = "#fff") => {
    return new Promise((resolve) => {
        if ("paintWorklet" in CSS === false) {
            resolve();
        }
        const $el = e.currentTarget;
        $el.classList.add('animating');

        const rect = $el.getBoundingClientRect();

        const [x, y] = [parseInt(e.clientX - rect.left), parseInt(e.clientY - rect.top)];
        const start = performance.now();

        requestAnimationFrame(function raf(now) {
            const count = Math.floor(now - start);
            $el.style.cssText = `--ripple-x: ${x}; --ripple-y: ${y}; --animation-tick: ${count}; --ripple-color: ${color}`;

            if (count > 350) {
                $el.classList.remove('animating');
                $el.style.cssText = `--animation-tick: 0`;

                resolve();
                return;
            }
            requestAnimationFrame(raf);
        });
    })
}

const loadDetailsModal = async (e) => {
    e.preventDefault();

    const listPokedexEntries = document.querySelectorAll("[data-pokemon-data]")
    listPokedexEntries.forEach((item) => { item.inert = true; });

    const $el = e.currentTarget;

    const pkmnDataRaw = $el.dataset.pokemonData;
    const pkmnData = JSON.parse(pkmnDataRaw);

    let rippleColor = window.getComputedStyle(document.body).getPropertyValue(`--type-${cleanString(pkmnData.types[0].name)}`);
    const href = $el.href;

    $el.removeAttribute("href");
    if (Math.random() > 0.5 && pkmnData.types[1]) {
        rippleColor = window.getComputedStyle(document.body).getPropertyValue(`--type-${cleanString(pkmnData.types[1].name)}`);
    }
    await rippleEffect(e, rippleColor);
    $el.href = href;

    await loadPokemonData(pkmnData);

    modal.showModal();

    const url = new URL(location);
    url.searchParams.set("id", pkmnData.pokedex_id);
    history.pushState({}, "", url);

    listPokedexEntries.forEach((item) => { item.inert = false; });
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
        scrollTypeContainer.style.backgroundColor = window.getComputedStyle(document.body).getPropertyValue(`--type-${cleanString(type.name)}`);
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
        headerPokedex.style.scrollMargin = `${headerPokedex.offsetHeight}px`;

        let nonRegionalPokedexData = pokedexData.filter((item) => {
            const name = item.name.fr;
            const listNames = (item.formes || []).map((form) => form.name.fr);

            return !listNames.includes(name);
        })

        generationNumber.textContent = `#${generation}`;
        const firstPkmnId = nonRegionalPokedexData[0].pokedex_id;

        generationRange.textContent = `${String(firstPkmnId).padStart(NB_NUMBER_INTEGERS_PKMN_ID, '0')} ➜ ${
            String(nonRegionalPokedexData.at(-1).pokedex_id).padStart(NB_NUMBER_INTEGERS_PKMN_ID, '0')
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

            const encodedData = window.btoa(
                loadingImageRaw.replaceAll(
                    "#037ef3", 
                    window.getComputedStyle(document.body).getPropertyValue(`--type-${cleanString(item.types[0].name)}`)
                )
            );
            imgTag.src = `data:image/svg+xml;base64,${encodedData}`;

            replaceImage(imgTag, item.sprites.regular);

            imgTag.alt = `sprite de ${item.name.fr}`;
            imgTag.fetchPriority =
                index <= fetchPriorityHighThreshold ? "high" : "low";

            const pkmnNameContainer = clone.querySelector("[data-pkmn-name]")
            pkmnNameContainer.textContent = `#${String(item.pokedex_id).padStart(NB_NUMBER_INTEGERS_PKMN_ID, '0')}\n${item.name.fr}`;

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

        await onTransitionsEnded(layoutSwitch)
        layoutSwitch.nextElementSibling.classList.add("after:transition-all")

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
        if (error?.cause?.status === HTTP_NOT_FOUND_CODE_ERROR) {
            listLoadGenerationBtns.forEach((item) => item.inert = true);
            hasReachPokedexEnd = true;

            errorMessageContainer.textContent = "Impossible d'afficher cette génération, car elle n'existe pas.";
        } else {
            console.error(error);
            errorMessageContainer.textContent = "Une erreur est survenue.";
            listLoadGenerationBtns.forEach((item) => item.inert = false);
        }
        errorPopover.dataset.error = POPOVER_ERRORS.unknown;
        errorPopover.showPopover();
    }
};

const urlParams = new URLSearchParams(window.location.search);
const pkmnId = urlParams.get("id");

export const observeURL = async () => {
    if (pkmnId !== null) {
        try {
            const pkmnData = await fetchPokemon(pkmnId, urlParams.get("region"));
            pkmnData.alternate_form_id = urlParams.get("alternate_form_id");

            await loadPokemonData(pkmnData);
            modal.showModal();
        } catch (_e) {
            modal.close();
            errorMessageContainer.textContent = `Le Pokémon avec l'id "${pkmnId}" n'existe pas`;
            errorPopover.dataset.error = POPOVER_ERRORS.unknown_pkmn;
            errorPopover.showPopover();
        }
    }
}

await observeURL();
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

errorPopover.addEventListener("beforetoggle", (e) => {
    if (e.newState !== "open" && e.target.dataset.error === POPOVER_ERRORS.unknown_pkmn) {
        const url = new URL(location);
        url.searchParams.delete("id");
        url.searchParams.delete("region");
        url.searchParams.delete("alternate_form_id");
        history.pushState({}, "", url);
    }
});

if (process.env.NODE_ENV === "development") {
    await import("./utils/vite.error-overlay");
}

window.addEventListener("offline", () => {
    errorMessageContainer.textContent = "Connexion perdue";
    errorPopover.dataset.error = POPOVER_ERRORS.lost_connection;
    errorPopover.showPopover();
});

export { loadPokedexForGeneration };
