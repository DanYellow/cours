<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cakes - Salon de thé de l'IUT</title>

    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/reset.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/global.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/details.css">
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
                <li><a href="index.php">Accueil</a></li>
                <li><a href="details.php">Cakes</a></li>
                <li><a href="details.php">Tartes</a></li>
                <li><a href="details.php">Mignardises</a></li>
                <li><a href="details.php">Boissons</a></li>
            </ul>
        </nav>
    </header>

    <main class="contenu-principal">
        <ul class="liste-patisseries">
            <?php 
                for ($i=0; $i < 3; $i++) { 
                    echo "
                    <li class='patisserie'>
                        <figure>
                            <img src='ressources/images/patisseries/financiers.jpg' alt=''>
                        </figure>
                        <section class='details'>
                            <section class='textes'>
                                <p class='titre'>Madeleines</p>
                                <p class='prix'>8 euros la demi-douzaine</p>
                            </section>
                            <section class='liste-boutons'>
                                <button type='button' class='cta-primaire'>Ajouter au panier</button>
                                <a href='' class='cta-secondaire'>Voir plus d'infos</a>
                            </section>
                        </section>
                    </li>
                    ";
                }
            ?>
        </ul>
    </main>
    <?php include_once("ressources/includes/footer.php") ?>
</body>

</html>