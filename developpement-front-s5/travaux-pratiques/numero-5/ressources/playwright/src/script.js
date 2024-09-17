const banner = document.querySelector(".banner")

const parcoursFullName = {
    "dev": "développement web et dispositifs interactifs",
    "crea": "création numérique",
    "strat": "stratégie de communication numérique et design d’expérience"
};

document
    .querySelector("[data-form]")
    .addEventListener("submit", async (e) => {
        e.preventDefault()
        
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries())
        const bannerTextTpl = banner.querySelector('p').innerHTML;
        
        banner.querySelector('p').innerHTML = bannerTextTpl.replace("__parcours_placeholder__", parcoursFullName[formValues.parcours])
        banner.classList.remove("hidden")
        document.querySelector('a').classList.remove("pointer-events-none", "opacity-50")
                
        Array.from(e.target.elements)
            .forEach((item) => {
                item.disabled = true

                item.classList.add("disabled:opacity-50")
                item.classList.toggle("disabled:bg-gray-100", item.tagName.toLowerCase() !== "button")
        })
})