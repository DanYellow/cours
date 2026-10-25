const btn = document.querySelector("[data-fetch-holidays]")
const tplHolidayItem = document.querySelector('[data-template="holiday-item"]');
const holidaysContainer = document.querySelector("[data-list-holidays]")

const displayHolidays = async (e) => {
    e.currentTarget.setAttri;
    const req = await fetch("/api");
    const res = await req.json();
    
    res.forEach(item => {
        const clone = document.importNode(tplHolidayItem.content, true);
        
        clone.querySelector("li").textContent = `${item.date}: ${item.name}`;
        
        holidaysContainer.appendChild(clone);
    });
    e.currentTarget.inert = false;
}

btn.addEventListener("click", displayHolidays);