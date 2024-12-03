import "./style.css";
import fetchPokemonForGeneration from "./api";

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const pkdexTemplateRaw = document.querySelector("[data-tpl-id='pokedex']");
const pokedexContainer = document.querySelector("[data-list-pokedex]");

const displayDetails = async (e) => {
    const pkmnId = e.currentTarget.dataset.pokemonId;

    console.log(pkmnId);
}

const loadTemplateForGeneration = async (generation = 1) => {
    try {
        const pokedexData = await fetchPokemonForGeneration(generation);
        const cloneDex = document.importNode(pkdexTemplateRaw.content, true);
        const pokedex = cloneDex.querySelector("[data-pokedex]");
        pokedexData.forEach((item) => {
            const clone = document.importNode(pkmnTemplateRaw.content, true);
            clone.querySelector("img").src = item.sprites.regular;
            clone.querySelector("img").alt = `sprite de ${item.name.fr}`;
            clone.querySelector("figcaption").textContent = `#${item.pokedex_id} ${item.name.fr}`;
        
            const button = clone.querySelector("[data-pokemon-id]");
            button.dataset.pokemonId = item.pokedex_id;
            button.addEventListener("click", displayDetails);
        
            pokedex.append(clone);
        })
        pokedexContainer.append(cloneDex);
    } catch (error) {
        console.log(error);
    }
    
}

loadTemplateForGeneration();


