let listeDonnees = prenomJerome2005.map((item) => item.nombre)
let labels = prenomJerome2005.map((item) => item.dpt)

const data = {
  labels: labels,
  datasets: [
    {
      label: "Répartition des naissances du prénom Jérôme en Ile-de-France + Oise durant l'année 2005",
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(255, 159, 64)',
        'rgba(255, 205, 86)',
        'rgba(75, 192, 192)',
        'rgba(54, 162, 235)',
        'rgba(153, 102, 255)',
        'rgba(201, 203, 207)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      data: listeDonnees,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

const myChart = new Chart(document.getElementById("myChart"), config);
