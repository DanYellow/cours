## Exercice 3 - Trouver le maximum d'un tableau

```js
function trouverMaximum(tableau) {
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

## Exercice 5 - Les lettres uniques

```js
const ensembleDesLettresUniques = (str) => {
    const res = []
  for (let char of str) {
    console.log(str.indexOf(char), str.lastIndexOf(char))
    if (str.indexOf(char) === str.lastIndexOf(char)) {
      res.push(char);
    }
  }

  return res;
};
```
