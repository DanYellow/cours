<?php
$couleur_bulle_classe = "rose";
$page_active = "index";

require_once('./ressources/includes/connexion-bdd.php');

$listeArticlesCommande = $clientMySQL->prepare('SELECT * FROM article');
$listeArticlesCommande->execute();
$listeArticles = $listeArticlesCommande->fetchAll();

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <base href="/<?php echo getenv('CHEMIN_BASE') ?>">

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil - SAÉ 203</title>

    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/reset.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/global.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/header.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/accueil.css">

    <link rel="stylesheet" href="ressources/css/global.css">
    <link rel="stylesheet" href="ressources/css/accueil.css">
</head>

<body>
    <?php require_once('./ressources/includes/header.php'); ?>
    <?php require_once('./ressources/includes/bulle.php'); ?>

    <!-- Vous allez principalement écrire votre code HTML ci-dessous -->
    <main class="conteneur-principal conteneur-1280">
        <h1 class="titre-page">Articles sur le BUT MMI</h1>

        <section class="colonne">
            <section class="liste-articles">
                <?php foreach ($listeArticles as $article) { ?>
                    <!-- 
                        Nous avons passé un paramètre d'URL GET nommé "id".
                        Ainsi quand l'utilisateur va arriver sur la page "article.php",
                        elle va recevoir la valeur envoyée dans l'URL. 
                        Vous pourrez récupérer la valeur en php grâce à $_GET["id"]
                     -->
                    <a href="article.php?id=<?php echo $article["id"]; ?>" class='article'>
                        <figure>
                            <img src='ressources/images/image-article.png' alt=''>
                        </figure>
                        <section class='textes'>
                            <h1 class='titre'><?php echo $article["titre"]; ?></h1>
                            <p class='description'>
                                <?php echo $article["chapo"]; ?>
                            </p>
                        </section>

                    </a>
                <?php } ?>
            </section>
            <a class="jpo-banniere" title="Ouverture dans un nouvel onglet" target="_blank" href="https://www.cyu.fr/salons-journee-portes-ouvertes">
                <img src="ressources/images/logo-cyu-blanc.png" width="200" class="logo" alt="">

                <section class="textes">
                    <p class="txt-petit">Journée portes <br /> ouvertes</p>
                    <p class="txt-grand">
                        12/02/<?php echo date('Y') ?>, <br />
                        de 10h à 17h
                    </p>
                    <p class="en-savoir-plus">EN SAVOIR PLUS</p>
                </section>
            </a>
        </section>
    </main>
    <?php require_once('./ressources/includes/footer.php'); ?>
</body>

</html>