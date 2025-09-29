// On récupère tous les boutons pour plus bas lié l'évènement "click" dessus (boucle forEach)
const listePokemonBtns = document.querySelectorAll("[data-pokemon]");
const pkmnModal = document.querySelector("[data-pokemon-modal]");
const fermetureBtn = document.querySelector("[data-fermeture-modal]");

const openModal = () => {
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
