import "./style.css";
import fetchPokemon from "./api";

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const pokedexContainer = document.querySelector("[data-pokedex]");

const pokedex = await fetchPokemon();

pokedex.forEach((item) => {
    console.log(item)
    const clone = document.importNode(pkmnTemplateRaw.content, true);
    clone.querySelector("img").src = item.sprites.regular;
    clone.querySelector("img").alt = `sprite de ${item.name.fr}`;
    clone.querySelector("figcaption").textContent = `#${item.pokedex_id} ${item.name.fr}`;

    pokedexContainer.append(clone);
})
