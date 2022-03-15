<?php
require_once('../../ressources/includes/connexion-bdd.php');

$pageCourante = "REMPLACER";

$formulaire_soumis = !empty($_POST);
$entree_mise_a_jour = array_key_exists("id", $_GET);

$entite = null;
if ($entree_mise_a_jour) {
    $commande = $clientMySQL->prepare('SELECT * FROM REMPLACER WHERE id = :id');
    $commande->execute([
        "id" => $_GET["id"]
    ]);

    $entite = $commande->fetch();
}

if ($formulaire_soumis) {
    // On crée une nouvelle entrée
    $commande = $clientMySQL->prepare("
        UPDATE REMPLACER
        SET nom = :nom, prenom = :prenom, avatar = :avatar
        WHERE id = :id
    ");

    $commande->execute([
        "nom" => $_POST["nom"],
        "prenom" => "A REMPLACER",
        "avatar" => "A REMPLACER",
        "id" => $_POST["id"]
    ]);
}

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once("../ressources/includes/head.php"); ?>

    <title>Editeur REMPLACER - Administration</title>
</head>

<body>
    <div class="d-flex h-100">
        <?php include_once("../ressources/includes/menu-lateral.php"); ?>
        <div class="b-example-divider"></div>
        <main class="flex-fill">
            <header class="d-flex justify-content-between align-items-center p-3">
                <p class="fs-1">Editer</p>
            </header>

            <section class="p-3">
                <?php if ($auteur) { ?>
                    <form method="POST">
                        <section class="row flex-column">
                            <input type="hidden" value="" name="id">

                            <div class="mb-3 col-md-6">
                                <label for="prenom" class="form-label">Nom</label>
                                <input type="text" value="" name="nom" class="form-control" id="prenom">
                            </div>
                            
                            <div class="mb-3  col-md-6">
                                <button type="submit" class="btn btn-primary">Envoyer</button>
                            </div>
                        </section>
                    </form>
                <?php } else { ?>
                    <!-- A compléter -->
                <?php } ?>
            </section>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>