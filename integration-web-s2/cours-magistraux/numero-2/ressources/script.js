// On définit les éléments 
// de la page qui vont être manipulés par le javascript
// On utilise les data-attributes pour récupérer les éléments HTML de la page
const baliseImage = document.querySelector("[data-image]");
const baliseInput = document.querySelector("[data-input]");

// On essaye d'appliquer par défaut (au chargement de la page)
// la valeur du champ de texte par défaut l'image.
// Ceci ne fonctionnera que si et seulement si  
baliseImage.src = baliseInput.value;

// On place un écouteur d'évènements sur l'évènement "input"
// - Voir documentation de l'évènement input : https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/input_event
baliseInput.addEventListener("input", function (evt) {
    baliseImage.src = evt.target.value;
});
