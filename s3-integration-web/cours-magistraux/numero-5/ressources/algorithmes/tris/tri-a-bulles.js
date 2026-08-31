const triABulles = (tableau) => {
  for (let j = 0; j < tableau.length; j++) {
    for (let i = 0; i < tableau.length; i++) {
      if (tableau[i] > tableau[i + 1]) {
        let temp = tableau[i];
        tableau[i] = tableau[i + 1];
        tableau[i + 1] = temp;
      }
    }
  }

  return tableau;
};
