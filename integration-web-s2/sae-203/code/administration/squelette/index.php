<?php
require_once('../../ressources/includes/connexion-bdd.php');

$commande = $clientMySQL->prepare('SELECT * FROM TABLE');
$commande->execute();
$liste = $commande->fetchAll();

$pageCourante = "REMPLACER";

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once("../ressources/includes/head.php"); ?>
    <title>Liste REMPLACER - Administration</title>
</head>

<body>
    <div class="d-flex h-100">
        <?php include_once("../ressources/includes/menu-lateral.php"); ?>
        <div class="b-example-divider"></div>
        <main class="flex-fill">
            <header class="d-flex justify-content-between align-items-center p-3">
                <p class="fs-1">Liste auteurs</p>
                <div>
                    <a href="creation.php" class="link-primary">Ajouter un auteur</a>
                </div>
            </header>

            <table class="table align-middle">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
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
                            <a href='edition.php?id={$auteur["id"]}' class='link-primary'>Modifier</a>
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