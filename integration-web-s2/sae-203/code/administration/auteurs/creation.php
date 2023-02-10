<?php
require_once '../../ressources/includes/connexion-bdd.php';

$pageCourante = 'auteurs';

$formulaire_soumis = !empty($_POST);

if ($formulaire_soumis) {
    if (
        isset(
            $_POST['prenom'],
            $_POST['nom'],
            $_POST['lien_avatar'],
            $_POST['lien_twitter']
        )
    ) {
        // On crée une nouvelle entrée
        $creerAuteurCommande = $clientMySQL->prepare(
            'INSERT INTO auteur(prenom, nom, lien_avatar) VALUES (:prenom, :nom, :lien_avatar)'
        );

        $nom = htmlentities($_POST['nom']);
        $prenom = htmlentities($_POST['prenom']);
        $lienAvatar = htmlentities($_POST['lien_avatar']);
        $lienTwitter = htmlentities($_POST['lien_twitter']);

        $creerAuteurCommande->execute([
            'nom' => $nom,
            'prenom' => $prenom,
            'lien_avatar' => $lienAvatar,
            'lien_twitter' => $lienTwitter,
        ]);
    }
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php require_once('../ressources/includes/head.php'); ?>

    <title>Creation auteur - Administration</title>
</head>

<body>
    <?php require_once('../ressources/includes/menu-lateral.php'); ?>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Créer</h1>
        </div>
    </header>

    <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div class="py-6">
                <form method="POST" action="" class="rounded-lg bg-white p-4 shadow border-gray-300 border-1">
                    <section class="grid gap-6">
                        <input type="hidden" value="<?php echo $auteur['id']; ?>" name="id">
                        <div class="col-span-12">
                            <label for="nom" class="block text-lg font-medium text-gray-700">Nom</label>
                            <input type="text" name="nom" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="prenom">
                        </div>
                        <div class="col-span-12">
                            <label for="prenom" class="block text-lg font-medium text-gray-700">Prénom</label>
                            <input type="text" name="prenom" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="prenom">
                        </div>
                        <div class="col-span-12">
                            <label for="avatar" class="block text-lg font-medium text-gray-700">Lien avatar</label>
                            <input type="text" name="lien_avatar" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="avatar">
                            <div class="text-sm text-gray-500">
                                Mettre l'URL de l'avatar (chemin absolu)
                            </div>
                        </div>
                        <div class="col-span-12">
                            <label for="avatar" class="block text-lg font-medium text-gray-700">Lien twitter</label>
                            <input type="text" name="lien_twitter" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" id="avatar">
                        </div>
                        <div class="mb-3 col-md-6">
                            <button type="submit" class="font-bold rounded-md bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700">Créer</button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    </main>
    
</body>

</html>