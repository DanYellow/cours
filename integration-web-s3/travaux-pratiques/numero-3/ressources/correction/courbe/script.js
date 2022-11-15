// On transforme la donnée pour qu'elle puisse être exploitable par chartjs
const dataset = prenomPauline.map((item) => item.nombre)
const listeAnnees = prenomPauline.map((item) => item.annais)

const data = {
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
