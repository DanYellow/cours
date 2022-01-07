<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil - Salon de thé de l'IUT</title>

    <link rel="stylesheet" href="ressources/css/reset.css">
    <link rel="stylesheet" href="ressources/css/global.css">
    <link rel="stylesheet" href="ressources/css/accueil.css">
</head>

<body>
    <header class="en-tete">
        <h1 class="titre">
            <span>SALON DE THÉ</span>
            <span>DE L'IUT</span>
        </h1>
        <p class="description">Ouvert du lundi au vendredi de 7h40 à 17h et fermé durant les vacances scolaires</p>
    
        <nav class="nav-principale">
            <ul>
                <li><a href="">Accueil</a></li>
                <li><a href="details.php">Cakes</a></li>
                <li><a href="details.php">Tartes</a></li>
                <li><a href="details.php">Mignardises</a></li>
                <li><a href="details.php">Boissons</a></li>
            </ul>
        </nav>
    </header>

    <main class="contenu-principal">
        <nav class="menu-tuiles">
            <a class="tuile-tartes" href="">
                <h2 class="titre">TARTES</h2>
            </a>
            <a class="tuile-cakes" href="">
                <h2 class="titre">CAKES</h2>
            </a>
            <a class="tuile-mignardises" href="">
                <h2 class="titre">MIGNARDISES</h2>
            </a>
        </nav>

        <p class="description-accueil">Toutes nos pâtisseries sont faites maison. Respectant la Nature, notre carte change au fil des saisons.<br>
            Ainsi, même si notre tarte aux fraises enchante les papilles de nos consommateurs, vous ne la trouverez pas sur la carte en janvier. </p>
    </main>
    <?php include_once("ressources/includes/footer.php") ?>
</body>

</html>