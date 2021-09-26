const formulaire = document.querySelector("form");
let donneesFormulaire = undefined;
formulaire?.addEventListener("submit", (evt) => {
  evt.preventDefault();

  donneesFormulaire = serialize(formulaire, { hash: true });

  console.log("Vous avez soumis les données ci-dessous :");
  for (const prop in donneesFormulaire) {
    if (donneesFormulaire.hasOwnProperty(prop)) {
      console.log(`champ : ${prop} => valeur : ${donneesFormulaire[prop]}`);
    }
  }
});
