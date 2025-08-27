import axios from "axios";

export const fetchPokemonDetails = async (pkmnId) => {
    try {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchPokemonExternalData = async (pkmnId) => {
    try {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pkmnId}`);
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

