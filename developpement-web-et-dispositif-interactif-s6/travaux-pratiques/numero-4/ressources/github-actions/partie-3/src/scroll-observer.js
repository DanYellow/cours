import { setTitleTagForGeneration } from "./main";
import {
    isElementInViewport,
} from "./utils";

const modal = document.querySelector("[data-pokemon-modal]");

const generationScrollingObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((item) => {
            item.target.classList.toggle(
                "is-pinned",
                item.intersectionRatio < 1
            );
        });

        if (modal.open) {
            return;
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
