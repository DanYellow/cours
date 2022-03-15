<?php
$couleur_bulle_classe = "jaune";
$page_active = "contact";

$formulaire_a_erreurs = false;
$formulaire_soumis = !empty($_POST);

if ($formulaire_soumis) {
    // La fonction isset peut prendre en paramètre une liste de variables, ceci rend plus ismple son utilisation
    if (!isset($_POST["prenom"],  $_POST["nom_de_famille"], $_POST["message"], $_POST["email"], $_POST["je_suis"])) {
        $formulaire_a_erreurs = true;
    }
}

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - SAÉ 105</title>

    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/reset.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/global.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/header.css">

    <link rel="stylesheet" href="ressources/css/global.css">
    <link rel="stylesheet" href="ressources/css/contact.css">
</head>

<body>
    <?php 
        if($formulaire_soumis && !$formulaire_a_erreurs) {
            echo "
                <section class='banniere-alerte succes' role='alert' aria-live='polite'>
                    <p class='semigras'>Message envoyé !</p>
                </section>
            ";
        }
        if($formulaire_soumis && $formulaire_a_erreurs) {
            echo "
                <section class='banniere-alerte erreur' role='alert' aria-live='polite'>
                    <p class='semigras'>Votre message possède une erreur !</p>
                </section>
            ";
        }
    ?>

    <section class="conteneur-1280">
        <?php require_once('./ressources/includes/header.php'); ?>

        <!-- Vous allez principalement écrire votre code HTML ci-dessous -->
        <main class="conteneur-principal">
            <h1 class="titre-page">Plus d'infos sur la formation ? <br /> Contactez-nous !</h1>

            <section>
                <p class="paragraphe">
                    <span class="texte-gras">La formation s'ouvre à tous les bacheliers,</span> pour rappel. Avoir des connaissances en programmation, design ou encore audiovisuel n'est pas obligatoire mais reste un bon atout, car il faut aimer la curiosité dans cette formation pluridisciplinaire. <span class="texte-gras">Il est également possible de faire la formation après une reprise d'études ou une réorientation.</span>
                </p>
            </section>

            <h1 class="titre-page">Nous contacter en ligne</h1>

            <form action="" method="POST" class="formulaire-contact">
                <article class="champ-conteneur">
                    <label for="prenom" class="label-champ texte-gras">Prénom</label>
                    <input type="text" class="champ" name="prenom" id="prenom">
                </article>
                <article class="champ-conteneur">
                    <label for="nom_de_famille" class="label-champ texte-gras">Nom de famille</label>
                    <input type="text" class="champ" name="nom_de_famille" id="nom_de_famille">
                </article>
                <article class="champ-conteneur">
                    <label for="email" class="label-champ texte-gras">Adresse e-mail</label>
                    <input type="email" class="champ" name="email" id="email">
                </article>

                <article class="champ-conteneur">
                    <label for="message" class="label-champ texte-gras">Message</label>
                    <textarea name="message" id="message" cols="30" rows="10" class="champ"></textarea>
                </article>

                <article class="champ-conteneur">
                    <p class="label-champ texte-gras">Je suis</p>
                    <ul class="liste-choix">
                        <li class="choix">
                            <input type="radio" name="je_suis" id="pas_de_choix" value="pas_de_choix">
                            <label for="pas_de_choix">Je ne souhaite pas le préciser</label>
                        </li>
                        <li class="choix">
                            <input type="radio" name="je_suis" id="etudiant" value="etudiant">
                            <label for="etudiant">Étudiant / Étudiante</label>
                        </li>
                        <li class="choix">
                            <input type="radio" name="je_suis" id="parent" value="parent">
                            <label for="parent">Parent</label>
                        </li>
                        <li class="choix">
                            <input type="radio" name="je_suis" id="autre" value="autre">
                            <label for="autre">Autre</label>
                        </li>
                    </ul>
                </article>
                <article class="champ-conteneur">
                    <input type="submit" value="ENVOYER" class="btn-envoi texte-gras">
                </article>
            </form>

            <h1 class="titre-page">Nous contacter par courrier</h1>
            <p class="paragraphe">
                IUT de Cergy-Pontoise,<br>
                Département Métiers du Multimédia et de l’Internet (MMI) <br>
                34 Bis Boulevard Henri Bergson <br>
                95200 Sarcelles
            </p>
        </main>
        <?php require_once('./ressources/includes/footer.php'); ?>
    </section>
</body>

</html>