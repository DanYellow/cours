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
    <?php include_once '../ressources/includes/menu-lateral.php'; ?>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6 px-4">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Editer</h1>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl py-6">
            <div class="py-6">
            <?php if ($auteur) { ?>
                    <form method="POST" action="" class="rounded-lg bg-white p-4 shadow border-gray-300 border-1">
                        <section class="grid gap-6">
                            <input type="hidden" value="<?php echo $auteur[
                                'id'
                            ]; ?>" name="id">
                            <div class="col-span-12">
                                <label for="nom" class="block text-lg font-medium text-gray-700">Nom</label>
                                <input type="text" value="<?php echo $auteur[
                                    'nom'
                                ]; ?>" name="nom" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="prenom">
                            </div>
                            <div class="col-span-12">
                                <label for="prenom" class="block text-lg font-medium text-gray-700">Prénom</label>
                                <input type="text" value="<?php echo $auteur[
                                    'prenom'
                                ]; ?>" name="prenom" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="prenom">
                            </div>
                            <div class="col-span-12">
                                <label for="avatar" class="block text-lg font-medium text-gray-700">Lien avatar</label>
                                <input type="text" value="<?php echo $auteur['lien_avatar']; ?>" name="lien_avatar" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="avatar">
                                <div class="text-sm text-gray-500">
                                    Mettre l'URL de l'avatar (chemin absolu)
                                </div>
                            </div>
                            <div class="col-span-12">
                                <label for="avatar" class="block text-lg font-medium text-gray-700">Lien twitter</label>
                                <input type="text" value="<?php echo $auteur[
                                    'lien_twitter'
                                ]; ?>" name="lien_twitter" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="avatar">
                            </div>
                            <div class="mb-3 col-md-6">
                                <button type="submit" class="font-bold rounded-md bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700">Éditer</button>
                            </div>
                        </section>
                    </form>
                <?php } else { ?>
                    <!-- A compléter -->
                <?php } ?>
            </div>
        </div>
    </main>
</body>

</html>