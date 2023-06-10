const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getListNationalHolidays = async (region = "metropole") => {
  const response = await fetch(
    `https://calendrier.api.gouv.fr/jours-feries/${region}.json`, 
  );
  const jsonRes = await response.json();

  const res = [];
  let nextDate = null;
  const currentYear =  new Date().getFullYear();
  const endNextYear = new Date(`${currentYear + 1}-06-30`);

  for (const [key, value] of Object.entries(jsonRes)) {
    nextDate = new Date(key);
    if (nextDate > new Date() && nextDate < endNextYear) {
      res.push({
        rawDate: nextDate,
        date: nextDate.toLocaleDateString("fr"),
        name: value,
      });
    }
  }

  await new Promise(r => setTimeout(r, randomIntFromInterval(0, 5) * 1000));

  const resOrdered = res.sort((a, b) => {
    return new Date(b.rawDate) - new Date(a.rawDate);
  }).map((item) => {
    delete item.rawDate
    return item
  })

  return resOrdered;
};

export { getListNationalHolidays };
