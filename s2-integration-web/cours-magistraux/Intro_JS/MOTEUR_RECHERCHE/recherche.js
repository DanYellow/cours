

let noms_etudiants = ["Diallo", "Mbappé"];
noms_etudiants.push("Valery");
noms_etudiants.push("Macron");
noms_etudiants.push("Dubois");
noms_etudiants.push("Henry");
noms_etudiants.push("m21ek ");

//fonction basique qui cherche une requête (texte saisi par l'utilisateur dans la case input)
//à travers l'itération complète de l'array en testant l'égalité  entre la requête et chaque élément.
//Optimisation : lors que la requête a trouvé un match, on peut terminer la recherche en sortant de la boucle avec  l'opération break.

function recherche()
{
    requete = document.getElementById("texteRecherche").value;
    trouve = false;
    for(i=0;i<noms_etudiants.length;i++)
    {
        if(noms_etudiants[i].toLowerCase() == requete.toLowerCase() )
        {
            trouve = true;
            document.getElementById("rechercheResultats").innerText = "L'étudiant "+noms_etudiants[i]+ " se trouve dans la liste des étudiants";
            document.getElementById("rechercheResultats").style.color = "green";
            break;
        }
    }
    if (!trouve)
    {
        document.getElementById("rechercheResultats").innerText = "L'étudiant "+requete+ " ne se trouve pas dans la liste des étudiants";
        document.getElementById("rechercheResultats").style.color = "red";
    }
}

//fonction optimisée qui cherche une requête (texte saisi par l'utilisateur dans la case input)
// la recherche est effectuée dans un array trié en ordre lexicographique à travers une recherche dichotomique :
// https://fr.wikipedia.org/wiki/Recherche_dichotomique

function rechercheSmart()
{
    requete = document.getElementById("texteRecherche").value;
    
    noms_etudiants.sort() //tri les etudiants dans l'array noms_etudiants
    console.log(noms_etudiants)

    if (!rechercheDichotomique(0, noms_etudiants.length, requete ))
    {
    	 document.getElementById("rechercheResultats").innerText = "L'étudiant "+requete+ " ne se trouve pas dans la liste des étudiants";
         document.getElementById("rechercheResultats").style.color = "red";
    }
}

function rechercheDichotomique(start, end, requete )
{
	center = start + Math.trunc((end-start)/2)

    if(noms_etudiants[center].toLowerCase() == requete.toLowerCase() )
    {
        document.getElementById("rechercheResultats").innerText = "L'étudiant "+noms_etudiants[center]+ " se trouve dans la liste des étudiants";
        document.getElementById("rechercheResultats").style.color = "green";
        return true;
    }
    else if ( end-start > 1 )
    {
        if(requete.toLowerCase() > noms_etudiants[center].toLowerCase())
        {
            return rechercheDichotomique(start + center + 1, end, requete);
        }
        else
        {   
            return rechercheDichotomique(start, center, requete);
        }
    }
    return false;
}
