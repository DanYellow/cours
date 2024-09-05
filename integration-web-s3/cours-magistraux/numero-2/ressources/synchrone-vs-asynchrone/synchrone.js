const genererNbPremiersSync = (quota) => {
    const estPremier = (n) => {
        for (let c = 2; c <= Math.sqrt(n); ++c) {
            if (n % c === 0) {
                return false;
            }
        }
        return true;
    };

    const listNbPremiers = [];
    const maximum = 1000000;

    while (listNbPremiers.length < quota) {
        const nombre = Math.floor(Math.random() * (maximum + 1));
        if (estPremier(nombre)) {
            listNbPremiers.push(nombre);
        }
    }
    console.log(listNbPremiers);
    return listNbPremiers;
};

document
    .querySelector("[data-sync-btn-generer]")
    .addEventListener("click", () => {
        const nbAGenerer = document.querySelector("[name='quota-sync']").value;
        // Fonction qui prend du temps
        genererNbPremiersSync(nbAGenerer);
        const nbAGenererFormatte = new Intl.NumberFormat("fr-FR").format(nbAGenerer);
        document.querySelector(
            "[data-sync-resultat]"
        ).textContent = `Génération de ${nbAGenererFormatte} nombres premiers terminée !`;
    });

document
    .querySelector("[data-sync-btn-recharger]")
    .addEventListener("click", () => {
        document.location.reload();
    });
