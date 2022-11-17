// Les fonctions asynchrones ("fetch" ici) sont un type particulier de fonction
// Ce sont des fonctions qui s'exécutent sans bloquer le reste du code
// Autrement dit, elles exécutent des instructions sans bloquer le reste du code...
let chargerDonnees = async () => {
  // ...toutefois dans le cadre de notre projet (afficher un graphique)
  // nous avons besoin d'attendre le chargement du fichier pour afficher le graphique
  // nous utilisons donc le mot-clé "await" pour dire qu'on souhaite attendre
  // l'exécution du code pour aller à la ligne suivante
  // Ici, nous attendons pour le chargement du fichier distant et sa transformation en json
  // Note : Pour utiliser le mot-clé "await", il faut impérativement que la fonction soit de type "async"
  // Plus informations : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function  
  let donnees = await fetch("../plugins/pauline.json"); // SI vous utilisez WAMP / MAMP
  // let donnees = await fetch("../../plugins/pauline.json"); // Si vous utilisez live server
  donnees = await donnees.json();

  // Le reste est comme nous avons fait en TP
  let dataset = donnees.map((item) => item.nombre);
  let listeAnnees = donnees.map((item) => item.annais);

  let data = {
    labels: listeAnnees,
    datasets: [
      {
        label: "Evolution des naissances du prénom Pauline de 1900 à 2020",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: dataset,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {},
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
}

chargerDonnees();