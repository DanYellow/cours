<?php
require_once("../../ressources/includes/connexion-bdd.php");

// A adapter
$requete_brute = "SELECT * FROM TABLE";
$resultat_brute = mysqli_query($mysqli_link, $requete_brute);

$page_courante = "REMPLACER";
$racineURL = $_SERVER['REQUEST_URI'];

$URLCreation = "{$racineURL}/creation.php";
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once("../ressources/includes/head.php"); ?>
    <title>Liste A REMPLACER  - Administration</title>
</head>

<body>
    <?php include_once("../ressources/includes/menu-principal.php"); ?>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-3 px-4 justify-between flex">
            <p class="text-3xl font-bold text-gray-900">Liste A REMPLACER</p>
            <a href="<?php echo $URLCreation ?>" class="block font-bold rounded-md bg-indigo-600 py-2 px-4 text-base text-white shadow-sm hover:bg-indigo-700 focus-within:bg-indigo-700">Ajouter un nouvel auteur</a>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl py-6 px-4">
            <div class="py-6">
                <table class="w-full bg-white rounded-lg overflow-hidden border-collapse shadow">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="font-bold pl-8 py-5 text-left">Id</th>
                            <th class="font-bold pl-8 py-5 text-left"></th>
                            <th class="font-bold pl-8 py-5 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            while ($article = mysqli_fetch_array($element, MYSQLI_ASSOC)) {
                                $lien_edition = "{$racineURL}/edition.php?id={$element["id"]}";
                        ?>
                            <tr class="hover:bg-gray-100 border-b-2 border-b-gray-100 last:border-b-0 first:border-t-2 first:border-t-gray-200">
                                <td class="pl-8 p-4 font-bold"><?php echo $element["id"]; ?></td>
                                <td class="pl-8 p-4"></td>
                                <td class="pl-8 p-4">
                                    <a href='<?php echo $lien_edition; ?>' class='link-primary'>Modifier</a>
                                </td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <?php
        require_once("../ressources/includes/global-footer.php");
    ?>
</body>

</html>
