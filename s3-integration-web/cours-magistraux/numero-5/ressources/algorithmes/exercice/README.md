Le but de ces exercices est de réaliser les diverses fonctionnalités demandées. Dans une approche algorithmique des sujets, nous allons, à chaque fois, lister les entrées et sorties attendues

## Exercice 1 - Tableau aléatoire

Remplir un tableau avec un nombre N de nombres entier aléatoires entre 0 et 99 inclus.

La fonction `Math.random()` permet de générer un nombre alatoire.

## Exercice 2 - Mot de passe sécurisé
Attestez de la sécurité d'un mot de passe en vous assurant qu'il a bel et bien au minimum neuf caractères et qu'il contient le caractère "@".

> Il est possible d'utiliser la méthode `.includes()` de la classe String pour vérifier si le caractère est présent.

## Exercice 3 - Trouver le maximum d'un tableau
Trouvez la plus grande valeur d'un tableau de nombres.

## Exercice 4 - Le trio de tête
A partir du tableau d'objets suivant, affichez les N étudiants avec la note la plus haute. En sachant que si certains étudiants sont _ex aequo_, ils doivent être dans la liste des N meilleurs.

```js
const listeEtudiants = [{
    nom: "Hélène",
    note: 14
}, {
    nom: "Thomas",
    note: 10
}, {
    nom: "Marc",
    note: 14
}, {
    nom: "Julie",
    note: 12
}, {
    nom: "Thierry",
    note: 17.5
}, {
    nom: "Stéphanie",
    note: 11
}, {
    nom: "Céline",
    note: 10
}, {
    nom: "Pauline",
    note: 17
}, {
    nom: "Yohan",
    note: 12
}, {
    nom: "Olivia",
    note: 17.2
}, {
    nom: "Benoit",
    note: 17
}]
```

## Exercice 5 - Les lettres uniques
Trouvez l'ensemble des caractères non répétés dans une lettre, et ce, quelque soit la casse des lettres. Par exemple dans le mot "mignardises", la fonction doit retourner `['m', 'g', 'n', 'a', 'r', 'd', 'e']`.

Pour récupérer l'index d'un élément, il existe les méthodes `.indexOf()` et `.lastIndexOf()`.
