const obtenirPkmnInfos = async (nbPkmn) => {
    const req = await fetch(
        `https://tyradex.vercel.app/api/v1/pokemon/${nbPkmn}`
    );
    const res = await req.json();

    return res;
};

document
    .querySelector("[data-form-pkmn]")
    .addEventListener("submit", async (e) => {
        // Cette ligne indique au navigateur que nous ne souhaitons pas le comportement naturel de l'élément
        // dans le cadre du formulaire, nous ne voulons pas recharger la page lors de la soumission
        e.preventDefault();

        const input = e.currentTarget.querySelector("[data-search-input]");

        const valeur = input.value;
        // On récupére la réponse pour l'afficher dans la console du navigateur
        try {
            const res = await obtenirPkmnInfos(valeur);
            console.log(res);

            const spriteConteneur = document.querySelector(
                "[data-pkmn='image']"
            );
            spriteConteneur.src = res.sprites.regular;

            const nomPkmn = document.querySelector("[data-pkmn='nom']");
            nomPkmn.textContent = `#${res.pokedex_id} ${res.name.fr}`;

            const categoriePkmn = document.querySelector(
                "[data-pkmn='categorie']"
            );
            categoriePkmn.textContent = res.category;
        } catch (e) {
            alert("Ce pokémon n'existe pas");
        }
    });
