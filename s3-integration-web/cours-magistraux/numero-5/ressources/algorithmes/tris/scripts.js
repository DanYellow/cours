const form = document.querySelector("[data-tri-form]");

const nbEntreeTableau = form.elements["nb_elements"];
const result = form.elements["resultat"];

const dureeTriNatif = document.querySelector("[data-duree='natif']");
const dureeTriBulles = document.querySelector("[data-duree='bulles']");
const dureeTriQuickSort = document.querySelector(
    "[data-duree='fusion']",
);

const majLongueurTableau = () => {
    result.value = nbEntreeTableau.valueAsNumber.toLocaleString("fr-FR");
};

majLongueurTableau();

form.addEventListener("input", majLongueurTableau);

const triNatif = (tableau) => {
    const startTime = performance.now();
    tableau.sort();

    const endTime = performance.now();

    const duration = endTime - startTime;

    return duration;
};

const triABullesPerf = (tableau) => {
    const startTime = performance.now();
    triABulles(tableau);

    const endTime = performance.now();

    const duration = endTime - startTime;

    return duration;
};

const triFusionPerf = (tableau) => {
    const startTime = performance.now();
    triFusion(tableau);

    const endTime = performance.now();

    const duration = endTime - startTime;

    return duration;
};


const tri = async (e) => {
    e.preventDefault();

    form.inert = true;
    document.body.style.cursor = "wait";

    await new Promise(resolve => setTimeout(resolve, 750));

    const tableauValAleatoires = Array.from(
        { length: nbEntreeTableau.valueAsNumber },
        () => Math.floor(Math.random() * nbEntreeTableau.valueAsNumber),
    );

    dureeTriNatif.textContent = `${triNatif(tableauValAleatoires).toLocaleString("fr-FR")} ms`;
    dureeTriBulles.textContent = `${triABullesPerf(tableauValAleatoires).toLocaleString("fr-FR")} ms`;
    dureeTriQuickSort.textContent = `${triFusionPerf(tableauValAleatoires).toLocaleString("fr-FR")} ms`;
    
    document.body.style.cursor = "default";
    form.inert = false;
};

form.addEventListener("submit", tri);
