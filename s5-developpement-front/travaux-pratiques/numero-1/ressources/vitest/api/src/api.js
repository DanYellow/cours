const fetchNationalHolidays = async (region = "metropole") => {
    const req = await fetch(`https://calendrier.api.gouv.fr/jours-feries/${region}.json`);
    const res = await req.json();

    return res;
}

export {
    fetchNationalHolidays
}
