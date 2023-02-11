<?php
require_once '../../ressources/includes/connexion-bdd.php';

$listeAuteursCommande = $clientMySQL->prepare('SELECT * FROM auteur');
$listeAuteursCommande->execute();
$listeAuteurs = $listeAuteursCommande->fetchAll();

$pageCourante = 'auteurs';
$racineURL = $_SERVER['REQUEST_URI'];

$URLCreation = "{$racineURL}/creation.php";
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once '../ressources/includes/head.php'; ?>
    <title>Liste auteurs - Administration</title>
</head>

<body>
    <?php include_once '../ressources/includes/menu-principal.php'; ?>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6 justify-between flex">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">Liste auteurs</h1>
            <a href="<?php echo $URLCreation ?>" class="block font-bold rounded-md bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700">Ajouter un nouvel auteur</a>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl py-6">
            <div class="py-6">
                <table class="w-full bg-white rounded-lg overflow-hidden border-collapse shadow">
                    <thead class="bg-gray-100">
                        <tr class="">
                            <th class="font-bold pl-8 py-5 text-left">Id</th>
                            <th class="font-bold pl-8 py-5 text-left">Avatar</th>
                            <th class="font-bold pl-8 py-5 text-left">Nom</th>
                            <th class="font-bold pl-8 py-5 text-left">Prénom</th>
                            <th class="font-bold pl-8 py-5 text-left">Twitter</th>
                            <th class="pl-8 py-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($listeAuteurs as $auteur) {
                            $lienEdition = "{$racineURL}/edition.php?id={$auteur['id']}"; ?>
                                <tr class="hover:bg-gray-100 border-b-2 border-b-gray-100 last:border-b-0 first:border-t-2 first:border-t-gray-200">
                                    <td class="pl-8 p-4 font-bold"><?php echo $auteur[
                                        'id'
                                    ]; ?></td>
                                    <td class="pl-8 p-4">
                                        <img 
                                            width='60' 
                                            height='60' 
                                            src='<?php echo $auteur['lien_avatar']; ?>' 
                                            loading="lazy"
                                            alt='<?php echo "Portrait {$auteur['prenom']}"; ?>' 
                                        />
                                    </td>
                                    <td class="pl-8 p-4"><?php echo $auteur['prenom']; ?></td>
                                    <td class="pl-8 p-4"><?php echo $auteur['nom']; ?></td>
                                    <td class="pl-8 p-4"><?php echo $auteur['lien_twitter']; ?></td>
                                    <td class="pl-8 p-4">
                                        <a href="<?php echo $lienEdition; ?>" class='font-bold text-blue-600'>Éditer</a>
                                    </td>
                                </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <?php require_once("../ressources/includes/global-footer.php"); ?>
</body>

</html>