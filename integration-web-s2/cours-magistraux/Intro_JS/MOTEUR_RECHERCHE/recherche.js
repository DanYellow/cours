

let noms_etudiants = ["Diallo", "Mbappé"];
noms_etudiants.push("Valery");
noms_etudiants.push("Macron");
noms_etudiants.push("Dubois");
noms_etudiants.push("Henry");
noms_etudiants.push("Michaud");


function recherche()
{
    let requete = document.getElementById("texteRecherche").value;
    let trouve = false;
    for(let i=0;i<noms_etudiants.length;i++)
    {
        if(noms_etudiants[i].toLowerCase() == requete.toLowerCase() )
        {
            trouve = true;
            document.getElementById("rechercheResultats").innerText = "L'étudiant "+noms_etudiants[i]+ " se trouve dans la liste des étudiants";
            document.getElementById("rechercheResultats").style.color = "green";
        }
    }
    if (!trouve)
    {
        document.getElementById("rechercheResultats").innerText = "L'étudiant "+requete+ " ne se trouve pas dans la liste des étudiants";
        document.getElementById("rechercheResultats").style.color = "red";
    }
}