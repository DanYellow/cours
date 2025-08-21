import { fetchNationalHolidays } from "./api.js";

const getNationalHolidays = async (region = "metropole") => {
    // Documentation : https://api.gouv.fr/documentation/jours-feries
    const listNationalHolidays = await fetchNationalHolidays(region);

    const res = [];
    let nextDate = null;
    for (const [key, value] of Object.entries(listNationalHolidays)) {
        nextDate = new Date(key);

        res.push({
            date: nextDate.toLocaleDateString("fr"),
            name: value,
        });
    }

    return res;
};

export { getNationalHolidays };
