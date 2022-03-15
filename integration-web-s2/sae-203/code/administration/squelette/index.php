<?php
require_once('../../ressources/includes/connexion-bdd.php');

$listeAuteursCommande = $clientMySQL->prepare('SELECT * FROM auteur');
$listeAuteursCommande->execute();
$listeAuteurs = $listeAuteursCommande->fetchAll();

$pageCourante = "articles";

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>REMPLACER - Administration</title>

    <link rel="stylesheet" href="../ressources/css/ne-pas-modifier/style.css">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

<body>
    <div class="d-flex h-100">
        <?php include_once("../ressources/includes/menu-lateral.php"); ?>
        <div class="b-example-divider"></div>
        <main class="flex-fill">
            <p class="fs-1 p-3">REMPLACER</p>
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">REMPLACER</th>
                        <th scope="col">REMPLACER</th>
                        <th scope="col">REMPLACER</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($listeAuteurs as $auteur) {
                        echo "
                    <tr>
                        <th scope='row'>{$auteur["id"]}</th>
                        <td>
                            <img 
                                width='40' 
                                src='{$auteur["avatar"]}' 
                                class='img-thumbnail rounded-circle' 
                                alt='Portrait {$auteur["prenom"]}'
                            />
                        </td>
                        <td>{$auteur["prenom"]}</td>
                        <td>{$auteur["nom"]}</td>
                        <td>
                            <a href='?id={$auteur["nom"]}' class='link-primary'>Modifier</a>
                            <a href='#' class='link-secondary'>Consulter</a>
                        </td>
                    </tr>
                ";
                    } ?>

                </tbody>
            </table>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>