const genererNbPremiersSync = (quota) => {
    const estPremier = (n) => {
        for (let c = 2; c <= Math.sqrt(n); ++c) {
            if (n % c === 0) {
                return false;
            }
        }
        return true;
    };

    const nbPremiers = [];
    const maximum = 1000000;

    while (nbPremiers.length < quota) {
        const candidat = Math.floor(Math.random() * (maximum + 1));
        if (estPremier(candidat)) {
            nbPremiers.push(candidat);
        }
    }

    return nbPremiers;
};

document
    .querySelector("[data-sync-btn-generer]")
    .addEventListener("click", () => {
        const quota = document.querySelector("[name='quota-sync']").value;
        // Fonction qui prend du temps
        genererNbPremiersSync(quota);
        document.querySelector(
            "[data-sync-resultat]"
        ).textContent = `Génération de ${quota} nombres premiers terminée !`;
    });

document
    .querySelector("[data-sync-btn-recharger]")
    .addEventListener("click", () => {
        document.location.reload();
    });
