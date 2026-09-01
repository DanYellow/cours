// Le tri fusion est l'un des algorithmes performants pour trier un tableau.
//  Plus complexe à mettre en place qu'un tri à bulles, le tri fusion fonction sur la méthode de "fusionner pour régner" (diviser un problème en sous-problèmes)
// L'idée ici est de séparer en deux le tableau

function fusion(left, right) {
    const tableau = [];
    let l = 0;
    let r = 0;
    while (l < left.length && r < right.length) {
        if (left[l] < right[r]) {
            tableau.push(left[l++]);
        } else {
            tableau.push(right[r++]);
        }
    }
    return tableau.concat(left.slice(l)).concat(right.slice(r));
}

const triFusion = (tableau) => {
    if (tableau.length < 2) {
        return tableau;
    }
    const mid = Math.floor(tableau.length / 2);
    const right = tableau.slice(mid);
    const left = tableau.slice(0, mid);
    const p = fusion(triFusion(left), triFusion(right));

    p.unshift(0, tableau.length);
    tableau.splice.apply(tableau, p);

    return tableau;
};
