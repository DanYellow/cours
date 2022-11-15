let chargerDonnees = async () => {
  let donnees = await fetch("../plugins/pauline.json");
  donnees = await donnees.json();

  const dataset = donnees.map((item) => item.nombre);
  const listeAnnees = donnees.map((item) => item.annais);

  const data = {
    labels: listeAnnees,
    datasets: [
      {
        label: "My First dataset",
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