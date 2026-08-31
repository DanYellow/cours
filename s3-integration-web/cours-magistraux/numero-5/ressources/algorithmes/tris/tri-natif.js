const listePrenoms = ["Christophe", "Pauline", "Antoine", "Julie"];
listePrenoms.sort();
console.log(listePrenoms);

const listeMois = ["Décembre", "Janvier", "Mai", "Février", "Novembre", "Août"];
listeMois.sort();
console.log(listeMois);

const listeMoisObjet = [
    {
        nom: "Décembre",
        nb: 12
    },
    {
        nom: "Janvier",
        nb: 1
    },
    {
        nom: "Mai",
        nb: 5
    },
    {
        nom: "Février",
        nb: 2
    },
    {
        nom: "Novembre",
        nb: 11
    },
    {
        nom: "Août",
        nb: 8
    }
]

listeMoisObjet.sort((a, b) => {
    return a.nb - b.nb
});
console.log(listeMoisObjet);


listeMois.sort((a, b) => a.localeCompare(b));
console.log(listeMois);
