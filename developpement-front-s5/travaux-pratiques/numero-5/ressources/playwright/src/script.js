const banner = document.querySelector(".banner")

const routeFullName = {
    "dev": "développement web et dispositifs interactifs",
    "crea": "création numérique",
    "strat": "stratégie de communication numérique et design d’expérience",
};

document
    .querySelector("[data-form]")
    .addEventListener("submit", (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries())
        const bannerTextTpl = banner.querySelector('p').innerHTML;

        console.log("--------- form's values ---------")
        console.log(JSON.stringify(formValues))
        console.log(document.querySelector("input[type=\"file\"]")?.files[0].name)
        console.log("------------------------------------")

        banner.querySelector('p').innerHTML = bannerTextTpl.replace(
            "__route_placeholder__",
            routeFullName[formValues.parcours]
        )
        banner.classList.remove("hidden")
        document.querySelector('a').inert = false;

        // e.target.elements contient tous les champs du formulaire
        Array.from(e.target.elements)
            .forEach((item) => {
                item.inert = true;
        })
})
