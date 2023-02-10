<?php
require_once '../../ressources/includes/connexion-bdd.php';

$pageCourante = 'auteurs';

$formulaire_soumis = !empty($_POST);
$entree_mise_a_jour = array_key_exists('id', $_GET);

$auteur = null;
if ($entree_mise_a_jour) {
    $chercherAuteurCommande = $clientMySQL->prepare(
        'SELECT * FROM auteur WHERE id = :id'
    );
    $chercherAuteurCommande->execute([
        // On force la valeur du paramètre en entier
        'id' => (int) $_GET['id'],
    ]);

    $auteur = $chercherAuteurCommande->fetch();
}

if ($formulaire_soumis) {
    // On crée un nouvel auteur
    $majAuteurCommande = $clientMySQL->prepare("
        UPDATE auteur
        SET nom = :nom, prenom = :prenom, lien_avatar = :lien_avatar
        WHERE id = :id
    ");

    $majAuteurCommande->execute([
        'nom' => $_POST['nom'],
        'prenom' => 'A REMPLACER',
        'lien_avatar' => 'A REMPLACER',
        'id' => $_POST['id'],
    ]);
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once '../ressources/includes/head.php'; ?>

    <title>Editeur auteur - Administration</title>
</head>

<body>
    <div class="d-flex h-100">
        <?php include_once '../ressources/includes/menu-lateral.php'; ?>
        <div class="b-example-divider"></div>
        <main class="flex-fill">
            <header class="d-flex justify-content-between align-items-center p-3">
                <p class="fs-1">Editer</p>
            </header>

            <section class="p-3">
                <?php if ($auteur) { ?>
                    <form method="POST" action="">
                        <section class="row flex-column">
                            <input type="hidden" value="<?php echo $auteur[
                                'id'
                            ]; ?>" name="id">
                            <div class="mb-3 col-md-6">
                                <label for="prenom" class="form-label">Nom</label>
                                <input type="text" value="<?php echo $auteur[
                                    'nom'
                                ]; ?>" name="nom" class="form-control" id="prenom">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="prenom" class="form-label">Prénom</label>
                                <input type="text" value="<?php echo $auteur[
                                    'prenom'
                                ]; ?>" name="prenom" class="form-control" id="prenom">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="avatar" class="form-label">Lien avatar</label>
                                <input type="text" value="<?php echo $auteur[
                                    'lien_avatar'
                                ]; ?>" name="lien_avatar" class="form-control" id="avatar">
                                <div class="form-text">
                                    Mettre l'URL de l'avatar (chemin absolu)
                                </div>
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="avatar" class="form-label">Lien twitter</label>
                                <input type="text" value="<?php echo $auteur[
                                    'lien_twitter'
                                ]; ?>" name="lien_twitter" class="form-control" id="avatar">
                            </div>
                            <div class="mb-3 col-md-6">
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