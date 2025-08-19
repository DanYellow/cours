const getListNationalHolidays = async (region = "metropole") => {
  const response = await fetch(
    `https://calendrier.api.gouv.fr/jours-feries/${region}.json`, 
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
};

