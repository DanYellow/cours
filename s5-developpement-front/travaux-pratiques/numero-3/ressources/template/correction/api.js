const getListNationalHolidays = async (region = "metropole") => {
    try {
        const response = await fetch(
            `https://calendrier.api.gouv.fr/jours-feries/${region}/${new Date().getFullYear()}.json`
        );
        const jsonRes = await response.json();

        const res = [];
        let nextDate = null;

        for (const [key, value] of Object.entries(jsonRes)) {
            nextDate = new Date(key);
            res.push({
                date: nextDate.toLocaleDateString("fr"),
                name: value,
            });
        }

        return res;
    } catch (error) {
        return {};
    }
};
