

<nav class="navigation-principale">
    <ul>
        <li><a id="indexNav" href ="index.php">ACCUEIL</a></li>
        <li><a id="rechercheNav" href ="recherche.php">MOTEUR DE RECHERCHE</a></li>
    </ul>
</nav>


<?php
$idNavChange = "indexNav";
$path_parts = pathinfo($_SERVER['SCRIPT_FILENAME']);
switch ($path_parts['filename']) {
    case "index":
        $idNavChange = "indexNav";
        break;
    case "recherche":
        $idNavChange = "rechercheNav";
        break;
}   

?>

<script>
    document.getElementById("rechercheNav").style.color = "rgb(0,0,0)";
    document.getElementById("indexNav").style.color = "rgb(0,0,0)";


    document.getElementById("rechercheNav").addEventListener('mouseenter', e => {
        document.getElementById("rechercheNav").style.color = "rgb(0,255,0)";
    });
    document.getElementById("indexNav").addEventListener('mouseenter', e => {
        document.getElementById("indexNav").style.color = "rgb(0,255,0)";
    });



    document.getElementById("rechercheNav").addEventListener('mouseleave', e => {
        document.getElementById("rechercheNav").style.color = "rgb(0,0,0)";
        document.getElementById(<?php echo json_encode($idNavChange) ?>).style.color = "rgb(255,0,0)";
    });

    document.getElementById("indexNav").addEventListener('mouseleave', e => {
        document.getElementById("indexNav").style.color = "rgb(0,0,0)";
        document.getElementById(<?php echo json_encode($idNavChange) ?>).style.color = "rgb(255,0,0)";
    });

    document.getElementById(<?php echo json_encode($idNavChange) ?>).style.color = "rgb(255,0,0)";

</script>


<header class="bulle">
    <article class="titre">
        <h1 class="txt-grand">
            <span>Bachelor</span>
            <span>Universitaire de</span>
            <span>Technologie</span>
        </h1>
        <h2 class="txt-petit">
            <span>Métiers du Multimédia et de</span>
            <span>l'Internet</span>
        </h2>
    </article>

    <article class="bulle-icone <?php echo $couleur_bulle_classe; ?>"></article>
    <article class="bulle-icone-bordure <?php echo $couleur_bulle_classe; ?>"></article>
</header>