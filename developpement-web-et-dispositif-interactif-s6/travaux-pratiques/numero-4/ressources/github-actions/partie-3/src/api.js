import axios from "axios";

const fetchPokemon = async (url) => {
    try {
        const req = await axios.get(url);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

const fetchListPokemon = async (generation = 1) => {
    let listPokemon = [];
    try {
        const req = await axios.get(`https://tyradex.vercel.app/api/v1/gen/${generation}`);
        // for (const pkmn of req.data.results) {
        //     const res = await fetchPokemon(pkmn.url);
        //     listPokemon.push(res);
        // }
        listPokemon = req.data;
        return listPokemon;
    } catch (error) {
        throw new Error(error);
    }
}

export default fetchListPokemon;