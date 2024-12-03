import axios from "axios";

const fetchAllTypes = async () => {
    try {
        const req = await axios.get("https://tyradex.app/api/v1/types");
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

const fetchPokemonExtraData = async (pkmnId) => {
    try {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`);
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

export { fetchAllTypes, fetchPokemonDescription, fetchPokemonExtraData };

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