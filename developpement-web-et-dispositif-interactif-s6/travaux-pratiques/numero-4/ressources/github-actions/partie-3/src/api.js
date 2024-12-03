import axios from "axios";

const fetchPokemon = async (url) => {
    try {
        const req = await axios.get(url);
        return req.data;
    } catch (error) {
        throw new Error(error);
    }
}

export { fetchPokemon };

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