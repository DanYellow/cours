const btn = document.querySelector("[data-national-holidays-btn]");
const listNationalHolidaysContainer = document.querySelector(
    "[data-list-national-holidays]"
);
const nationalHolidayTplRaw = document.querySelector(
    "[data-template-id='national-holiday']"
);

const displayNationalHolidays = async () => {
    const listHolidays = await getListNationalHolidays();
    listHolidays.forEach(({ date, name }) => {
        const nationalHolidayTpl =
            nationalHolidayTplRaw.content.cloneNode(true);
        const dayContainer = nationalHolidayTpl.querySelector("[data-day]");
        dayContainer.textContent = date;
        const dayNameContainer = nationalHolidayTpl.querySelector("[data-day-name]");
        dayNameContainer.textContent = name;

        listNationalHolidaysContainer.append(nationalHolidayTpl);
    });
};

btn.addEventListener("click", displayNationalHolidays);
