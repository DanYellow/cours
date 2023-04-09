<?php
require_once('../../ressources/includes/connexion-bdd.php');

$pageCourante = "articles";

$formulaire_soumis = !empty($_POST);
$entree_mise_a_jour = array_key_exists("id", $_GET);

$entite = null;
if ($entree_mise_a_jour) {
    // On cherche l'article à éditer
    $commande = $clientMySQL->prepare('SELECT * FROM article WHERE id = :id');
    $commande->execute([
        "id" => $_GET["id"]
    ]);

    $entite = $commande->fetch();
}

if ($formulaire_soumis) {
    // On crée une nouvelle entrée
    $commande = $clientMySQL->prepare("
        UPDATE REMPLACER
        SET titre = :titre, chapo = :chapo, contenu = :contenu, COMPLETER
        WHERE id = :id
    ");

    $commande->execute([
        "titre" => $_POST["titre"],
        "chapo" => "A REMPLACER",
        "contenu" => "A REMPLACER",
        // ...COMPLETER
        "id" => $_POST["id"]
    ]);
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once("../ressources/includes/head.php"); ?>

    <title>Editer A REMPLACER - Administration</title>
</head>

<body>
<?php include_once '../ressources/includes/menu-principal.php'; ?>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Editer</h1>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div class="py-6">
                <form method="POST" action="" class="rounded-lg bg-white p-4 shadow border-gray-300 border-1">
                    <section class="grid gap-6">
                        <input type="hidden" value="" name="id">
                        <div class="col-span-12">
                            <label for="titre" class="block text-lg font-medium text-gray-700">Titre</label>
                            <input type="text" name="titre"  value="<?php echo $entite['titre']; ?>"  id="titre" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="prenom">
                        </div>
                        <div class="col-span-12">
                            <label  for="chapo" class="block text-lg font-medium text-gray-700">Chapô</label>
                            <textarea type="text" name="chapo" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="chapo"><?php echo $entite['contenu']; ?></textarea>
                        </div>
                        <div class="mb-3 col-md-6">
                            <button type="submit" class="rounded-md bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700">Créer</button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    </main>
    <?php require_once("../ressources/includes/global-footer.php"); ?>

</body>

</html>