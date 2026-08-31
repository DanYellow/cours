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

    let max = tableau[0];

    for (let i = 1; i < tableau.length; i++) {
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
    const listeEtudiantsOrdonnes = [...listeEtudiants].sort((a, b) => b.note - a.note);

    if (listeEtudiantsOrdonnes.length <= nbTopEtudiants) {
        return listeEtudiantsOrdonnes;
    }

    const thirdValue = listeEtudiantsOrdonnes[nbTopEtudiants - 1].note;

    return listeEtudiantsOrdonnes.filter(x => x.note >= thirdValue);
}
```

## Exercice 5 - Les lettres uniques

```js
const ensembleDesLettresUniques = (str) => {
    const res = [];
    for (let char of str) {
        if (str.indexOf(char) === str.lastIndexOf(char)) {
            res.push(char);
        }
    }

    return res;
};
```
