import axios from "axios";

const fetchNationalHolidays = (region = "metropole") =>
  axios
    .get(`https://calendrier.api.gouv.fr/jours-feries/${region}.json`)
    .then((response) => response.data)
    .catch((error) => {
        return { error };
    });

export {
    fetchNationalHolidays
}
