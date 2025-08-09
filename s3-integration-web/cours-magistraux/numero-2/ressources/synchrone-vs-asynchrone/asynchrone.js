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

    const listNbPremiers = [];
    let nombre = 2;

    while (listNbPremiers.length < quota) {
        if (estPremier(nombre)) {
            // Le fait d'ajouter cette action asynchrone rend l'exécution de notre fonction
            // non bloquante
            await delay(5);
            listNbPremiers.push(nombre);
        }
        nombre++;
    }
    console.log(listNbPremiers)
    return listNbPremiers;
};

document
    .querySelector("[data-async-btn-generer]")
    .addEventListener("click", async () => {
        const nbAGenerer = document.querySelector("[name='quota-async']").value;
        const texteConteneur = document.querySelector(
            "[data-async-resultat]"
        );
        texteConteneur.textContent = "Opération en cours...";
        // Fonction qui prend du temps mais asynchrone
        const listeNbPremiers = await genererNbPremiersAsync(nbAGenerer);

        const nbAGenererFormatte = new Intl.NumberFormat("fr-FR").format(nbAGenerer);
        texteConteneur.textContent = `Génération des ${nbAGenererFormatte} premiers nombres premiers terminée ! (${listeNbPremiers.join(", ")})`;
    });

document
    .querySelector("[data-async-btn-recharger]")
    .addEventListener("click", () => {
        document.location.reload();
    });
