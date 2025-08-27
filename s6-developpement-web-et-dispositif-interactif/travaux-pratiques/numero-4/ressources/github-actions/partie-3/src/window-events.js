import { observeURL } from "#src/main.js";

import { CUSTOM_EVENTS } from "./utils";

import pikachuLoadingImage from "/images/pikachu-loading.gif";

const modal = document.querySelector("[data-pokemon-modal]");
const pikachuLoading = document.querySelector("[data-pikachu-loading]");
const faviconContainer = document.querySelector("[data-favicon]");
const initialPageFavicon = faviconContainer.getAttribute("href");
const pokedexContainer = document.querySelector("[data-list-pokedex]");

const initialPageTitle = document.title;

window.addEventListener("popstate", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("id") !== null) {
        await observeURL();
    } else {
        modal.close();
    }
});

window.addEventListener(CUSTOM_EVENTS.startLoading, () => {
    if (!modal.open) {
        document.title = `Chargement - ${initialPageTitle}`;
    }

    pikachuLoading.showPopover();
    pokedexContainer.setAttribute("aria-busy", true);
    faviconContainer.setAttribute("href", pikachuLoadingImage);
    document.documentElement.classList.add("cursor-progress");
});

window.addEventListener(CUSTOM_EVENTS.endLoading, () => {
    pikachuLoading.hidePopover();
    pokedexContainer.setAttribute("aria-busy", false);
    faviconContainer.setAttribute("href", initialPageFavicon);
    document.documentElement.classList.remove("cursor-progress");
});
