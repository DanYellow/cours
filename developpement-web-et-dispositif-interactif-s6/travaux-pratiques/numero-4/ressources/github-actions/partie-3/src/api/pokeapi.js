import axios from "axios";

export const fetchPokemonDetails = async (pkmnId) => {
    try {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchPokemonExternalDataForLang = async (pkmnId, lang = "fr") => {
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

export const fetchEvolutionChain = async (url) => {
    try {
        const req = await axios.get(url);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAbilityDataForLang = async (url, lang = "fr") => {
    try {
        const req = await axios.get(url);
        const name = req.data.names.filter((item) => item.language.name === lang)[0].name;
        const description = req.data.flavor_text_entries.filter((item) => item.language.name === lang).at(-1).flavor_text;

        return { name: { fr: name, en: req.data.name }, description, id: req.data.id };
    } catch (error) {
        throw new Error(error);
    }
}

