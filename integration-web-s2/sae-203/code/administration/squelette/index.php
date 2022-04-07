<?php
require_once('../../ressources/includes/connexion-bdd.php');

// A adapter
$commande = $clientMySQL->prepare('SELECT * FROM TABLE');
$commande->execute();
$liste = $commande->fetchAll();

$pageCourante = "REMPLACER";
$racineURL = $_SERVER['REQUEST_URI'];

$URLCreation = "{$racineURL}/creation.php";
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
                <p class="fs-1">Liste éléments</p>
                <div>
                    <a href="<?php echo $URLCreation ?>" class="link-primary">Ajouter un élément</a>
                </div>
            </header>

            <table class="table align-middle table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        foreach ($liste as $element) {
                            $lienEdition = "{$racineURL}/edition.php?id={$element["id"]}";
                    ?>
                        <tr>
                            <th scope='row'><?php echo $element["id"]; ?></th>
                            <td></td>
                            <td>
                                <a href='<?php echo $lienEdition; ?>' class='link-primary'>Modifier</a>
                            </td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>