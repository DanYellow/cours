## Exercice 1 - Tableau aléatoire

```js
const genererNombresAléatoire = (nbElements) => {
    const resultat = [];
    for (let i = 0; i < nbElements; i++) {
        const nbAleatoire = Math.floor(Math.random() * 100);
        resultat.push(nbAleatoire);
    }

    return resultat;
}
```

## Exercice 2 - Mot de passe sécurisé

```js
const motDePasseEstCorrect = (motDePasse) => {
    if (motDePasse.length < 9) {
        return false;
    }

    if (!motDePasse.includes('@')) {
        return false;
    }

    return true;
}
```

## Exercice 3 - Trouver le maximum d'un tableau

```js
const trouverMaximum = (tableau) => {
    // Vérifier si le tableau est vide
    if (tableau.length === 0) {
        return null;
    }

    // On définit la valeur maximale du tableau en utilisant la dernière valeur
    // Cette valeur va servir de référence
    let max = tableau[0];

    // On commence notre itération de tableau à 1 car la première valeur (index 0)
    // est contenue dans le tableau
    for (let i = 1; i < tableau.length; i++) {
        // On vérifie si la valeur courante est supérieur à la valeur maximale courante
        if (tableau[i] > max) {
            max = tableau[i];
        }
    }

    return max;
}
```

## Exercice 4 - Le trio de tête

```js
const top3Etudiants = (listeEtudiants, nbTopEtudiants = 3) => {
    // On trie notre tableau dans l'ordre décroissant par note
    const listeEtudiantsOrdonnes = [...listeEtudiants].sort((a, b) => b.note - a.note);

    // Si le nombre de résultat est inférieur ou égal au nombre total de résultats voulus
    // On retourne le tout
    if (listeEtudiantsOrdonnes.length <= nbTopEtudiants) {
        return listeEtudiantsOrdonnes;
    }

    // S'il y a plus de N étudiants qui font partie du top
    // On récupère la dernier haute valeur
    const derniereValeurDuTop = listeEtudiantsOrdonnes[nbTopEtudiants - 1].note;

    // Puis on filtre tous les résultats supérieur ou égaux à cette dernière valeur
    return listeEtudiantsOrdonnes.filter(x => x.note >= derniereValeurDuTop);
}
```

## Exercice 5 - Les lettres uniques

```js
const ensembleDesLettresUniques = (str) => {
    const res = [];
    for (let char of str) {
        // Ici, on vérifie si la première occurence de la lettre courante et égale
        // A la dernière occurence. Si c'est le cas, c'est que la lettre est unique
        // Donc on l'ajoute au tableau
        if (str.indexOf(char) === str.lastIndexOf(char)) {
            res.push(char);
        }
    }

    return res;
};
```
