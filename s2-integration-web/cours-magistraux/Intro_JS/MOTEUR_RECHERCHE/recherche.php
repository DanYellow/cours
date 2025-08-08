<?php
    $couleur_bulle_classe = "red";
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RECHERCHE DANS LE IUT MMI</title>

    <link rel="stylesheet" href="ressources/css/reset.css">
    <link rel="stylesheet" href="ressources/css/global.css">
    <link rel="stylesheet" href="ressources/css/header.css">
    <link rel="stylesheet" href="ressources/css/recherche.css">
    <script src="recherche.js"></script> 
</head>

<body>
    <section class="conteneur-1280">
        <?php require_once('./ressources/includes/header.php'); ?>

        <!-- Vous allez principalement écrire votre code HTML ci-dessous -->
        <main class="conteneur-principal">
         
            <section class = "boxResearch">
                <article class=logotext>IUT-OOGLE</article>
                <input id="texteRecherche" class="rechercheInput" type="text"/>
                <button class="rechercheButton" onclick= "rechercheSmart()">RECHERCHE</button>
                 <p id="rechercheResultats" class=resultatsParagraphe ></p>
            </section>

        </main>

    </section>
</body>

</html>