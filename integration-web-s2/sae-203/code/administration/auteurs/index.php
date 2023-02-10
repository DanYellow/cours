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
<html lang="fr" class="h-full bg-gray-100">

<head>
    <?php include_once '../ressources/includes/head.php'; ?>
    <title>Liste auteurs - Administration</title>
</head>

<body class="h-full">
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
            <div class="flex-shrink-0">
                <img class="h-8 w-8  height-1/2" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a>
                </div>
            </div>
            </div>
            
        </div>
        </div>
    </nav>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Liste auteurs</h1>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div class="py-6">
                <table class="w-full bg-white rounded-lg overflow-hidden shadow-xl border-collapse">
                    <thead class="bg-gray-100">
                        <tr class="">
                            <th class="font-bold pl-8 py-5 text-left">Id</th>
                            <th class="font-bold pl-8 py-5 text-left">Avatar</th>
                            <th class="font-bold pl-8 py-5 text-left">Nom</th>
                            <th class="font-bold pl-8 py-5 text-left">Prénom</th>
                            <th class="font-bold pl-8 py-5 text-left">Twitter</th>
                            <th class="font-bold pl-8 py-5 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($listeAuteurs as $auteur) {
                            $lienEdition = "{$racineURL}/edition.php?id={$auteur['id']}"; ?>
                                <tr class="hover:bg-gray-100 border-b-2 border-b-gray-100 last:border-b-0 first:border-t-2 first:border-t-gray-200">
                                    <td scope='row' class="pl-8  p-4 font-bold"><?php echo $auteur[
                                        'id'
                                    ]; ?></td>
                                    <td class="pl-8  p-4">
                                        <img 
                                            width='60' 
                                            height='60' 
                                            src='<?php echo $auteur[
                                                'lien_avatar'
                                            ]; ?>' 
                                            loading="lazy"
                                            alt='<?php echo "Portrait {$auteur['prenom']}"; ?>' 
                                        />
                                    </td>
                                    <td class="pl-8  p-4"><?php echo $auteur['prenom']; ?></td>
                                    <td class="pl-8  p-4"><?php echo $auteur['nom']; ?></td>
                                    <td class="pl-8  p-4"><?php echo $auteur['lien_twitter']; ?></td>
                                    <td class="pl-8  p-4">
                                        <a href='<?php echo $lienEdition; ?>' class='font-bold text-blue-600'>Modifier</a>
                                    </td>
                                </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</body>

</html>