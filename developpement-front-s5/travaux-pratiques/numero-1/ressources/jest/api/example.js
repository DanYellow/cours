import axios from "axios";

const getNationalHolidays = async (region = "metropole") => {
  // Doc : https://api.gouv.fr/documentation/jours-feries
  const listNationalHolidays = await axios
    .get(`https://calendrier.api.gouv.fr/jours-feries/${region}.json`)
    .then((response) => {
      return response.data;
    });

  const res = []
  let nextDate = null
  for (const [key, value] of Object.entries(listNationalHolidays)) {
    nextDate = new Date(key)
    
    res.push({
        date: nextDate.toLocaleDateString("fr"),
        name: value
    })
  }

  return res;
};

export { getNationalHolidays };
