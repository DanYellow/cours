<?php
require_once('../../ressources/includes/connexion-bdd.php');

$listeMessagesCommande = $clientMySQL->prepare('SELECT * FROM message');
$listeMessagesCommande->execute();
$listeMessages = $listeMessagesCommande->fetchAll();

$pageCourante = "messages";
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <?php include_once("../ressources/includes/head.php"); ?>
    <title>Liste messages - Administration</title>
</head>

<body>
<?php include_once '../ressources/includes/menu-principal.php'; ?>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6">
            <h1 class="text-3xl font-bold text-gray-900">Liste messages reçus</h1>
            <p class="text-gray-500">Nombre de messages : A REMPLACER</p>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl py-6">
            <div class="py-6">
                <table class="w-full bg-white rounded-lg overflow-hidden border-collapse shadow">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="font-bold pl-8 py-5 text-left">Id</th>
                            <th class="font-bold pl-8 py-5 text-left">Nom</th>
                            <th class="font-bold pl-8 py-5 text-left">A CHANGER</th>
                            <th class="font-bold pl-8 py-5 text-left">A CHANGER</th>
                            <th class="font-bold pl-8 py-5 text-left">A CHANGER</th>
                            <th class="font-bold pl-8 py-5 text-left">A CHANGER</th>
                            <th class="font-bold pl-8 py-5 text-left">A CHANGER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php 
                            foreach ($listeMessages as $message) { 
                        ?>
                            <tr class="hover:bg-gray-100 border-b-2 border-b-gray-100 last:border-b-0 first:border-t-2 first:border-t-gray-200">
                                <td class="pl-8 p-4 font-bold"><?php echo $message["id"]; ?></td>
                                <td class="pl-8 p-4"><?php echo $message["nom"]; ?></td>
                                <td class="pl-8 p-4"><?php echo $message["prenom"]; ?></td>
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