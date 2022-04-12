<?php
require_once('../../ressources/includes/connexion-bdd.php');

$listeMessagesCommande = $clientMySQL->prepare('SELECT * FROM message');
$listeMessagesCommande->execute();
$listeMessages = $listeMessagesCommande->fetchAll();

$pageCourante = "messages";
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once("../ressources/includes/head.php"); ?>
    <title>Liste messages - Administration</title>
</head>

<body>
    <div class="d-flex h-100">
        <?php include_once("../ressources/includes/menu-lateral.php"); ?>
        <div class="b-example-divider"></div>
        <main class="flex-fill">
            <header class="d-flex justify-content-between align-items-center p-3">
                <p class="fs-1">Liste messages reçus</p>
            </header>

            <table class="table align-middle table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nom</th>
                        <th scope="col">A CHANGER</th>
                        <th scope="col">A CHANGER</th>
                        <th scope="col">A CHANGER</th>
                        <th scope="col">A CHANGER</th>
                        <th scope="col">A CHANGER</th>

                    </tr>
                </thead>
                <tbody>
                    <?php 
                        foreach ($listeMessages as $message) { 
                    ?>
                        <tr>
                            <th scope='row'><?php echo $message["id"]; ?></th>
                            <td><?php echo $message["nom"]; ?></td>
                            <td><?php echo $message["prenom"]; ?></td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>