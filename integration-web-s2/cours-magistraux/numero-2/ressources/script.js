// On définit les éléments 
// de la page qui vont être manipulés par le javascript
// On utilise les data-attributes pour récupérer les éléments HTML de la page
const banniere = document.querySelector("[data-banniere]");
const btnFermetureBanniere = document.querySelector("[data-fermeture-banniere]");

// On place un écouteur d'évènements sur l'évènement "click" pour appeler notre fonction lorsque l'on clique sur le bouton
// - Voir documentation de l'évènement input : https://developer.mozilla.org/fr/docs/Web/API/Element/click_event
// La méthode "addEventListener" pourrait se traduire littéralement en "ajoute un écouteur d'évènement". Ici on a décidé que ça soit au clic sur "btnFermetureBanniere"
btnFermetureBanniere.addEventListener("click", function () {
    // On ajoute la classe CSS "cache" à banniere qui nous permet de cacher notre bannière
    banniere.classList.add('cache')
});
