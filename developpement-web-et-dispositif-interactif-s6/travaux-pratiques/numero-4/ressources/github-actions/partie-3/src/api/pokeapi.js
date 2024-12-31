import axios from "axios";

export const fetchPokemonDetails = async (pkmnId) => {
    try {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchPokemon = async (pkmnId, region = null) => {
    try {
        const regionName = region ? `/${region}` : "";
        const req = await axios.get(`https://tyradex.vercel.app/api/v1/pokemon/${pkmnId}${regionName}`);

        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchPokemonExternalData = async (pkmnId) => {
    try {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`);
        const res = {
            ...req.data,
            flavor_text_entries: req.data.flavor_text_entries.filter((item) => item.language.name === lang),
        }

        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchEvolutionChain = async (url) => {
    try {
        const req = await axios.get(url);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAbilityData = async (url) => {
    try {
        const req = await axios.get(url);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

