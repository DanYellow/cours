import axios from "axios";

export default (region = "metropole") =>
  axios
    .get(`https://calendrier.api.gouv.fr/jours-feries/${region}.json`)
    .then((response) => response.data)
    .catch(() => []);
