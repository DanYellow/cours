<?php
require_once '../../ressources/includes/connexion-bdd.php';

$requete_brute = "SELECT * FROM auteur";
$resultat_brut = mysqli_query($mysqli_link, $requete_brute);

$page_courante = "auteurs";
$racine_URL = $_SERVER['REQUEST_URI'];

$URL_creation = "{$racine_URL}/creation.php";
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once "../ressources/includes/head.php"; ?>
    <title>Liste auteurs - Administration</title>
</head>

<body>
    <?php include_once '../ressources/includes/menu-principal.php'; ?>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl justify-between flex py-3 px-4">
            <div>
                <p class="text-3xl font-bold text-gray-900">Liste auteurs</p>
                <p class="text-gray-500 text-sm">Nombre d'auteurs : <?php echo mysqli_num_rows($resultat_brut); ?></p>
            </div>
            <a href="<?php echo $URL_creation ?>" class="self-start block rounded-md py-2 px-4 text-base text-white shadow-sm bg-slate-700 hover:bg-slate-900 focus:bg-slate-900">Ajouter un nouvel auteur</a>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl py-6 px-4">
            <div class="py-6">
                <table class="w-full bg-white rounded-lg overflow-hidden border-collapse shadow">
                    <thead class="bg-gray-100">
                        <tr class="">
                            <th class="font-bold pl-8 py-5 text-left">Id</th>
                            <th class="font-bold pl-8 py-5 text-left">Avatar</th>
                            <th class="font-bold pl-8 py-5 text-left">Nom</th>
                            <th class="font-bold pl-8 py-5 text-left">Prénom</th>
                            <th class="font-bold pl-8 py-5 text-left">Compte twitter</th>
                            <th class="pl-8 py-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($element = mysqli_fetch_array($resultat_brut, MYSQLI_ASSOC)) {
                            $lien_edition = "{$racine_URL}/edition.php?id={$element['id']}"; ?>
                            <tr style="view-transition-name: auteur-<?php echo $element['id']; ?>" class="odd:bg-neutral-50 border-b-2 border-b-gray-100 last:border-b-0 first:border-t-2 first:border-t-gray-200">
                                <td class="pl-8 p-4 font-bold" data-label="Id"><?php echo $element[
                                    'id'
                                ]; ?></td>
                                <td class="pl-8 p-4" data-label="Avatar">
                                    <div class="w-16 h-16">
                                        <img
                                            class="rounded-full w-full h-full"
                                            src='<?php echo $element['lien_avatar']; ?>'
                                            loading="lazy"
                                            width='80'
                                            height='80'
                                            alt='<?php echo "Portrait {$element['prenom']}"; ?>'
                                        />
                                    </div>
                                </td>
                                <td class="pl-8 p-4" data-label="Nom"><?php echo $element['nom']; ?></td>
                                <td class="pl-8 p-4" data-label="Prénom"><?php echo $element['prenom']; ?></td>
                                <td class="pl-8 p-4" data-label="Twitter"><?php echo $element['lien_twitter']; ?></td>
                                <td class="pl-8 p-4" data-label="">
                                    <a href="<?php echo $lien_edition; ?>" class='font-bold text-blue-600 hover:text-blue-900 focus:text-blue-900'>Éditer</a>
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
