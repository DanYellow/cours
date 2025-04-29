<?php
require_once("../../ressources/includes/connexion-bdd.php");

$page_courante = "REMPLACER";

$formulaire_soumis = !empty($_POST);
$id_present_url = array_key_exists("id", $_GET);

$entite = null;
if ($id_present_url) {
    $id = $_GET["id"];
    $requete_brute = "SELECT * FROM TABLE WHERE id = $id";
    $resultat_brut = mysqli_query($mysqli_link, $requete_brute);
    $entite = mysqli_fetch_array($resultat_brut, MYSQLI_ASSOC);
}

if ($formulaire_soumis) {
    // On récupère les valeurs du champ
    $id = $_POST['id'];
    $champ_1 = htmlentities($_POST['champ_1']);
    $champ_2 = htmlentities($_POST['champ_2']);

    // On met à jour l'entrée
    $requete_brute = "
        UPDATE A-REMPLACER
        SET
            champ_1 = '$champ_1',
            champ_2 = '$champ_2',
        WHERE id = '$id'
    ";

    // A continuer, inspirez-vous des autres fichiers
}

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once("../ressources/includes/head.php"); ?>

    <title>Éditer REMPLACER - Administration</title>
</head>

<body>
    <?php include_once "../ressources/includes/menu-principal.php"; ?>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-3 px-4">
            <p class="text-3xl font-bold text-gray-900">Editer</p>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl py-6 px-4">
            <div class="py-6">
            <?php if ($entite) { ?>
                    <form method="POST" action="" class="rounded-lg bg-white p-4 shadow border-gray-300 border-1">
                        <section class="grid gap-6">
                            <input type="hidden" value="<?php echo $entite[
                                'id'
                            ]; ?>" name="id">
                            <div class="col-span-12">
                                <label for="nom" class="block text-lg font-medium text-gray-700">Nom</label>
                                <input type="text" value="<?php echo $entite[
                                    'nom'
                                ]; ?>" name="nom" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-indigo-500" id="prenom">
                            </div>
                            <div class="mb-3 col-md-6">
                                <button type="submit" class="rounded-md bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus-within:bg-indigo-700">Éditer</button>
                            </div>
                        </section>
                    </form>
                <?php } else { ?>
                    <!-- A compléter -->
                <?php } ?>
            </div>
        </div>
    </main>
    <?php require_once("../ressources/includes/global-footer.php"); ?>
</body>
</html>
