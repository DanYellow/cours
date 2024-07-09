const obtenirPkmnInfos = async (nbPkmn) => {
    // Récupération des données principales
    let req = await fetch(`https://pokeapi.co/api/v2/pokemon/${nbPkmn}`);
    const messageErreur = "Une erreur est survenue";
    // S'il y a un problème lors de la requête, on lève une erreur
    // Elle sera capturée dans un try/catch
    if (req.status === 404) {
        throw new Error(messageErreur);
    }
    const resPokemon = await req.json();

    // Récupération des informations supplémentaires
    res = await fetch(resPokemon["species"]["url"]);
    if (req.status === 404) {
        throw new Error(messageErreur);
    }
    const pokemonDesc = await res.json();

    // On fusionne les deux réponses dans un seul et unique objet javascript
    // Le "..." s'appelle la "syntaxe de décomposition" 
    return { ...resPokemon, ...pokemonDesc };
};

const formatPkmnData = async (data) => {
    const lang = "fr";
    const pokemonNameFrObj = data["names"].find(
        (name) => name.language.name === lang
    );
    const pokemonNameFr = pokemonNameFrObj["name"];

    const pokemonType = data["types"].map((item) => item.type.name);
    const pokemonImg = data["sprites"]["front_default"];

    // On cherche la description française du Pokémon affiché
    const pokemonDescObj = data["flavor_text_entries"].find(
        (name) => name.language.name === lang
    );
    // Puis on récupère uniquement la valeur de la clé "flavor_text"
    // Le "?." permet de vérifier si l'entité précédente existe avant d'y accéder
    // ceci évite les crashs
    const pokemonDesc = pokemonDescObj?.flavor_text;

    const pokemonCategorieObj = data["genera"].find(
        (name) => name.language.name === lang
    );
    const pokemonCategorie = pokemonCategorieObj?.["genus"];

    const pokemonCri = data["cries"]["latest"];

    const listJeuxApparencesUrl = data.game_indices.map((item) => {
        return item.version.url;
    });

    const listJeuxApparences = await Promise.all(
        listJeuxApparencesUrl.map(async (url) => {
            const req = await fetch(url);
            const res = await req.json();

            const jeuFr = res.names.find((name) => name.language.name === lang);

            return jeuFr.name;
        })
    );

    return {
        numero: data.id,
        nom: pokemonNameFr,
        sprite: pokemonImg,
        types: pokemonType,
        description: pokemonDesc,
        categorie: pokemonCategorie,
        cri: pokemonCri,
        list_jeux_apparences: listJeuxApparences,
    };
};

let dernierPokemonSelectionne = 0;
document
    .querySelector("[data-form-pkmn]")
    .addEventListener("submit", async (e) => {
        // Cette ligne indique au navigateur que nous ne souhaitons pas le comportement naturel de l'élément
        // dans le cadre du formulaire, nous ne voulons pas recharger la page lors de la soumission
        e.preventDefault();

        const input = e.currentTarget.querySelector("[data-search-input]");

        const valeur = input.value;

        if (dernierPokemonSelectionne === Number(valeur)) {
            return;
        }
        dernierPokemonSelectionne = Number(valeur);
        // On récupére la réponse pour l'afficher dans la console du navigateur
        try {
            const res = await obtenirPkmnInfos(valeur);
            const pkmnData = await formatPkmnData(res);
            console.log(pkmnData);

            const spriteConteneur = document.querySelector(
                "[data-pkmn='image']"
            );
            spriteConteneur.src = pkmnData.sprite;

            const nomPkmn = document.querySelector("[data-pkmn='nom']");
            nomPkmn.textContent = `#${pkmnData.numero} ${pkmnData.nom}`;

            const categoriePkmn = document.querySelector(
                "[data-pkmn='categorie']"
            );
            categoriePkmn.textContent = pkmnData.categorie;

            const descriptionPkmn = document.querySelector(
                "[data-pkmn='description']"
            );
            descriptionPkmn.textContent = pkmnData.description;

            const listTypes = document.querySelector("[data-pkmn='types']");
            // On supprime tout le contenu de la liste de type avant de la remplir
            // Ceci évite que les types s'accumulent
            listTypes.replaceChildren();
            pkmnData.types.forEach((item) => {
                // On crée une balise <li> pour chaque type trouvé
                const liTag = document.createElement("li");
                // on lui ajoute une classe "type-pkmn"
                liTag.classList.add("type-pkmn");
                // puis on lui met du texte, celui du type du Pokémon
                liTag.textContent = item;
                // et enfin on ajoute cette balise <li> dans le balise <ul>
                listTypes.appendChild(liTag);
            });

            const listJeux = document.querySelector("[data-pkmn='jeux']");
            listJeux.replaceChildren();
            pkmnData.list_jeux_apparences.forEach((item) => {
                const liTag = document.createElement("li");
                liTag.classList.add("type-pkmn");
                liTag.textContent = `Pokémon version ${item}`;
                listJeux.appendChild(liTag);
            });

            if (pkmnData.cri) {
                const criPkmn = new Audio(pkmnData.cri);
                criPkmn.volume = 0.2;
                criPkmn.play();
            }
        } catch (e) {
            alert("Ce pokémon n'existe pas");
        }
    });
