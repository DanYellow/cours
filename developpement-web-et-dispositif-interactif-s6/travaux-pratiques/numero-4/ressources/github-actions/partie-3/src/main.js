import "./style.css";
import fetchPokemonForGeneration from "./api";

const pkmnTemplateRaw = document.querySelector("[data-tpl-id='pokemon']");
const pkdexTemplateRaw = document.querySelector("[data-tpl-id='pokedex']");
const pokedexContainer = document.querySelector("[data-list-pokedex]");
const loadGenerationBtn = document.querySelector("[data-load-generation]");

const displayDetails = async (e) => {
    const pkmnId = e.currentTarget.dataset.pokemonId;

    console.log(pkmnId);
}

const loadTemplateForGeneration = async (generation = 1) => {
    try {
        const pokedexData = await fetchPokemonForGeneration(generation);
        const cloneDex = document.importNode(pkdexTemplateRaw.content, true);
        const pokedex = cloneDex.querySelector("[data-pokedex]");
        const generationNumber = cloneDex.querySelector("[data-generation-number]");
        const generationRange = cloneDex.querySelector("[data-generation-range]");

        generationNumber.textContent = `#${generation}`;
        generationRange.textContent = `${pokedexData[0].pokedex_id} -> ${pokedexData.at(-1).pokedex_id}`;

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
        loadGenerationBtn.dataset.loadGeneration = Number(generation) + 1;

        pokedexContainer.append(cloneDex);
    } catch (error) {
        console.log(error);
    }
}

loadTemplateForGeneration();

loadGenerationBtn.addEventListener("click", (e) => {
    loadTemplateForGeneration(e.currentTarget.dataset.loadGeneration)
})


