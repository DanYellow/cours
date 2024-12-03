import axios from "axios";

const fetchPokemon = async (url) => {
    try {
        const req = await axios.get(url);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

const fetchPokemonDescription = async (pkmnId, lang = "fr") => {
    try {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`);
        const res = {
            ...req.data,
            flavor_text_entries: req.data.flavor_text_entries.filter((item) => item.language.name === lang),
        }
    
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

export { fetchPokemon, fetchPokemonDescription };

const fetchListPokemon = async (generation = 1) => {
    let listPokemon = [];
    try {
        const req = await axios.get(`https://tyradex.vercel.app/api/v1/gen/${generation}`);
        listPokemon = req.data;

        return listPokemon;
    } catch (error) {
        throw new Error(error);
    }
}

export default fetchListPokemon;