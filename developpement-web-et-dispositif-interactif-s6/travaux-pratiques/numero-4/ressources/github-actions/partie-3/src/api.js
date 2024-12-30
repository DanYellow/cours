import axios from "axios";

import { debounce } from "./utils";

let numberOfAjaxCallPending = 0;
const startLoadingEvent = new Event("startloading");
const endLoadingEvent = new Event("endloading");

const delayBeforeFlagEndRequests = 850;
const notifyEndRequests = debounce(() => {
    window.dispatchEvent(endLoadingEvent);
}, delayBeforeFlagEndRequests);

const listURLToIntercept = ["https://tyradex.vercel.app/api/v1/gen", "https://pokeapi.co/api/v2/", "https://pokeapi.co/api/v2/pokemon/"]

axios.interceptors.request.use(async (config) => {
    try {
        if (listURLToIntercept.some((item) => config.url.startsWith(item))) {
            numberOfAjaxCallPending++;

            window.dispatchEvent(startLoadingEvent);
        }

        return config;
    } catch (error) {
        return Promise.reject(error);
    }
})

axios.interceptors.response.use(async (response) => {
    try {
        return response;
    } catch (error) {
        return Promise.reject(error);
    } finally {
        if (listURLToIntercept.some((item) => response.config.url.startsWith(item))) {
            numberOfAjaxCallPending--;
            if (numberOfAjaxCallPending == 0) {
                notifyEndRequests();
            }
        }
    }
});

export const fetchAllTypes = async () => {
    try {
        const req = await axios.get("https://tyradex.app/api/v1/types");
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchPokemonExtraData = async (pkmnId) => {
    try {
        const req = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchDataFromURL = async (url) => {
    try {
        const req = await axios.get(url);
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

export const fetchPokemonDescription = async (pkmnId, lang = "fr") => {
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

const fetchListPokemon = async (generation = 1) => {
    let listPokemon = [];
    try {
        const req = await axios.get(`https://tyradex.vercel.app/api/v1/gen/${generation}`);
        listPokemon = req.data;
        const serverErrorStartNumber = 400;
        if(req.data?.status >= serverErrorStartNumber) {
            throw new Error("", {cause: req.data} );
        }

        return listPokemon;
    } catch (error) {
        throw new Error("", { cause: error.cause });
    }
}

export default fetchListPokemon;
