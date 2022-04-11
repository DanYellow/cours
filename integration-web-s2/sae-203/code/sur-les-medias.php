<?php
require_once('./ressources/includes/connexion-bdd.php');

$couleur_bulle_classe = "rouge";
$page_active = "medias";

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <base href="/<?php echo getenv('CHEMIN_BASE') ?>">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sur les médias - SAÉ 105</title>

    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/reset.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/global.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/header.css">

    <link rel="stylesheet" href="ressources/css/global.css">
    <link rel="stylesheet" href="ressources/css/sur-les-medias.css">
</head>

<body>
    <section>
        <?php require_once('./ressources/includes/header.php'); ?>
        <?php require_once('./ressources/includes/bulle.php'); ?>

        <!-- Vous allez principalement écrire votre code HTML ci-dessous -->
        <main class="conteneur-principal conteneur-1280">
            <h1 class="titre-page">Les actualités et les évènements important du BUT et de l'IUT CY Paris Université dans les médias.</h1>

            <ul class="liste-videos">
                <li class="video-conteneur">
                    <h2 class="titre">La nouvelle réforme : le BUT MMI</h2>
                    <iframe class="video-yt" height="388" src="https://www.youtube.com/embed/oiEbQF7qfBU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </li>
                <li class="video-conteneur">
                    <h2 class="titre">Pourquoi étudier à l'IUT CYU ?</h2>
                    <iframe class="video-yt" height="388" src="https://www.youtube.com/embed/SyjF4h2Zb7Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </li>
                <li class="video-conteneur">
                    <h2 class="titre">Job interview en anglais au département MMI</h2>
                    <iframe class="video-yt" height="388" src="https://www.youtube.com/embed/t72pdxpNjyc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </li>
                <li class="video-conteneur">
                    <h2 class="titre">L'importance de l'IUT dans les études supérieures</h2>
                    <iframe class="video-yt" height="388" src="https://www.youtube.com/embed/xD4wshE0hEg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </li>
            </ul>
        </main>
        <?php require_once('./ressources/includes/footer.php'); ?>
    </section>
</body>

</html>