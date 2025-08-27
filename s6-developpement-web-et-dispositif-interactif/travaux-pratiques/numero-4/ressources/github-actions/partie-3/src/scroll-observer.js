import { setTitleTagForGeneration } from "./main";
import {
    isElementInViewport,
} from "./utils";

const modal = document.querySelector("[data-pokemon-modal]");

const startThemeColor = document.querySelector('meta[name="theme-color"]').getAttribute("content")

const generationScrollingObserver = new IntersectionObserver(
    (entries) => {
        let headerBGColor = null;
        entries.forEach((item) => {
            headerBGColor = window.getComputedStyle(item.target).getPropertyValue('background-color');
            item.target.classList.toggle(
                "is-pinned",
                item.intersectionRatio < 1
            );
        });

        if (modal.open) {
            return;
        }

        if (entries.some((item) => item.target.classList.contains("is-pinned"))) {
            document.querySelector('meta[name="theme-color"]').setAttribute("content", headerBGColor);
        } else {
            document.querySelector('meta[name="theme-color"]').setAttribute("content", startThemeColor);
        }

        setTitleTagForGeneration();
    },
    { threshold: [1] }
);

let firstVisiblePkmn = null;
const pokedexItemScrollingObserver = new IntersectionObserver(() => {
    const allPokemons = Array.from(document.querySelectorAll("[data-pokemon-id]"));
    firstVisiblePkmn = allPokemons.filter((item) => isElementInViewport(item))[0];
}, {
    threshold: [1],
});

export { generationScrollingObserver, pokedexItemScrollingObserver, firstVisiblePkmn };
