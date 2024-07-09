const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const genererNbPremiersAsync = async (quota) => {
    const estPremier = (n) => {
        for (let c = 2; c <= Math.sqrt(n); ++c) {
            if (n % c === 0) {
                return false;
            }
        }
        return true;
    };

    const nbPremiers = [];
    let nombre = 1;
    while (nbPremiers.length < quota) {
        if (estPremier(nombre)) {
            // Le fait d'ajouter cette action asynchrone rend l'exécution de notre fonction
            // non bloquante
            await delay(15);
            nbPremiers.push(nombre);
        }
        nombre++;
    }

    return nbPremiers;
};

document
    .querySelector("[data-async-btn-generer]")
    .addEventListener("click", async () => {
        const quota = document.querySelector("[name='quota-async']").value;
        const texteConteneur = document.querySelector(
            "[data-async-resultat]"
        );
        texteConteneur.textContent = "Opération en cours";
        // Fonction qui prend du temps
        const listeNbPremiers = await genererNbPremiersAsync(quota);
        texteConteneur.textContent = `Génération des ${quota} premiers nombres premiers terminée ! (${listeNbPremiers.join(", ")})`;
    });

document
    .querySelector("[data-async-btn-recharger]")
    .addEventListener("click", () => {
        document.location.reload();
    });
