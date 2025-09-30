// On récupère tous les boutons pour plus bas lié l'évènement "click" dessus (boucle forEach)
const listePokemonBtns = document.querySelectorAll("[data-pokemon]");
const pkmnModal = document.querySelector("[data-pokemon-modal]");
const fermetureBtn = document.querySelector("[data-fermeture-modal]");

const pkmnImageModal = pkmnModal.querySelector("img");
const pkmnNameModal = pkmnModal.querySelector("[data-pkmn-name]");
const pkmnTypesModal = pkmnModal.querySelector("[data-pkmn-types]");

const openModal = (e) => {
    // La chaîne de caractères sous forme de JSON est transformée en vrai JSON.
    // Ces propriétés peuvent être accédées sous forme d'objet
    const pkmnData = JSON.parse(e.currentTarget.dataset.pokemonData);

    pkmnImageModal.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pkmnData.id}.png`;
    pkmnNameModal.textContent = pkmnData.nom;

    // On vide le contenu de la liste
    pkmnTypesModal.innerHTML = "";
    pkmnData.types.forEach((item) => {
        // On créé une balise <li> pour ensuite l'ajouter à la liste
        const li = document.createElement("li");
        li.textContent = item;
        li.classList.add("px-2", "py-0.25", "rounded-md", "type-label", `bg-${item.toLowerCase()}`);

        pkmnTypesModal.append(li);
    })

    // Ouverture du <dialog> en mode "modale" pour ainsi avoir l'arrière-plan
    pkmnModal.showModal();
};

listePokemonBtns.forEach((item) => {
    // item représente chaque élément contenu dans la variable "listePokemonBtns"
    item.addEventListener("click", openModal);
});

fermetureBtn.addEventListener("click", () => {
    pkmnModal.close();
})
