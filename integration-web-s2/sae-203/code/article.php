<?php
$couleur_bulle_classe = "rose";
$page_active = "index";

require_once('./ressources/includes/connexion-bdd.php');


$id = 1;
$sql = "SELECT * FROM article WHERE id=?"; // SQL with parameters
$stmt = $mysqli->prepare($sql); 
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result(); // get the mysqli result
$user = $result->fetch_assoc(); 
print_r($user);
// à adapter
// $requete = 'SELECT * FROM article WHERE id = 1';

// $result = mysqli_query($mysqli, $requete);
// // $articleCommand = $mysqli->query('SELECT * FROM article WHERE id = ?');

// // $articleId = 1;
// // $articleCommand->bind_param('i', $articleId);
// // $articleCommand->execute();
// print_r(
//     mysqli_fetch_assoc($result)
// );

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <base href="/<?php echo getenv('CHEMIN_BASE') ?>">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article - SAÉ 203</title>

    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/reset.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/global.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/header.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/accueil.css">

    <link rel="stylesheet" href="ressources/css/global.css">
    <link rel="stylesheet" href="ressources/css/accueil.css">
</head>

<body>
    <section>
        <?php require_once('./ressources/includes/header.php'); ?>
        <?php
        // A supprimer si vous n'en avez pas besoin.
        // Mettre une couleur dédiée pour cette bulle si vous gardez la bulle
        require_once('./ressources/includes/bulle.php');
        ?>

        <!-- Vous allez principalement écrire votre code HTML ci-dessous -->
        <main class="conteneur-principal conteneur-1280">
            <h1 class="titre-page"><?php echo $article["titre"]; ?></h1>
            <p>A vous de faire le design de l'article</p>

        </main>
        <?php require_once('./ressources/includes/footer.php'); ?>
    </section>
</body>

</html>