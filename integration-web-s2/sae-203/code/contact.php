<?php
$couleur_bulle_classe = "jaune";
$page_active = "contact";

$formulaire_a_erreurs = false;
$formulaire_soumis = !empty($_POST);

require_once('./ressources/includes/connexion-bdd.php');

if ($formulaire_soumis) {
    if (!empty($_POST["prenom"]) && !empty($_POST["nom"]) && !empty($_POST["message"]) && !empty($_POST["email"]) && !empty($_POST["je_suis"])) {
        // Requête pour écrire le message dans la base :
        $insertionMessageRequete = "
                INSERT INTO message(nom, prenom, contenu, email, type, date_creation) 
                VALUES (:nom, :prenom, :contenu, :email, :type, :date)
            ";

        // On prépare la requête
        $messageCommande = $clientMySQL->prepare($insertionMessageRequete);

        $nom = htmlentities($_POST["nom"]);
        $prenom = htmlentities($_POST["prenom"]);
        $message = htmlentities($_POST["message"]);
        $email = htmlentities($_POST["email"]);
        $type = htmlentities($_POST["je_suis"]);

        // On récupère la date du jour
        $date = new DateTimeImmutable();

        // On l'exécute 
        // et on remplace les placeholders de la requête par nos valeurs
        $messageCommande->execute([
            'nom' => $nom,
            'prenom' => $prenom,
            'contenu' => $message,
            'email' => $email,
            'type' => $type,
            // La date est formattée en chaîne de caractères
            // au format Année-mois-jour Heure:minutes:secondes
            // Sinon, elle ne pourra pas être 
            // insérée dans la base de données
            'date' => $date->format('Y-m-d H:i:s')
        ]);
        $formulaire_a_erreurs = false;
    } else {
        $formulaire_a_erreurs = true;
    }
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <base href="/<?php echo getenv('CHEMIN_BASE') ?>">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - SAÉ 203</title>

    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/reset.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/global.css">
    <link rel="stylesheet" href="ressources/css/ne-pas-modifier/header.css">

    <link rel="stylesheet" href="ressources/css/global.css">
    <link rel="stylesheet" href="ressources/css/contact.css">
</head>

<body>
    <section>
        <?php require_once('./ressources/includes/header.php'); ?>
        <?php
        if ($formulaire_soumis && !$formulaire_a_erreurs) {
            echo "
                <section class='banniere-alerte succes' role='alert' aria-live='polite'>
                    <p>Message envoyé !</p>
                </section>
            ";
        }
        if ($formulaire_soumis && $formulaire_a_erreurs) {
            echo "
                <section class='banniere-alerte erreur' role='alert' aria-live='polite'>
                    <p>Votre message possède une erreur !</p>
                </section>
            ";
        }
        ?>
        <?php require_once('./ressources/includes/bulle.php'); ?>

        <!-- Vous allez principalement écrire votre code HTML ci-dessous -->
        <main class="conteneur-principal conteneur-1280">
            <h1 class="titre-page">Plus d'infos sur la formation ? <br /> Contactez-nous !</h1>

            <section>
                <p class="paragraphe">
                    <span class="texte-gras">La formation s'ouvre à tous les bacheliers.</span> Avoir des connaissances en programmation, design ou encore audiovisuel n'est pas obligatoire mais reste un bon atout, car il faut aimer la curiosité dans cette formation pluridisciplinaire. <span class="texte-gras">Il est également possible de faire la formation après une reprise d'études ou une réorientation.</span>
                </p>
            </section>

            <h1 class="titre-page">Nous contacter en ligne</h1>

            <form action="" method="POST" class="formulaire-contact">
                <article class="champ-conteneur">
                    <label for="prenom" class="label-champ texte-gras">Prénom</label>
                    <input type="text" class="champ" name="prenom" id="prenom">
                </article>
                <article class="champ-conteneur">
                    <label for="nom" class="label-champ texte-gras">Nom de famille</label>
                    <input type="text" class="champ" name="nom" id="nom">
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
                            <input type="radio" name="je_suis" id="pas_precise" value="pas_precise">
                            <label for="pas_precise">Je ne souhaite pas le préciser</label>
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
                    <button type="submit" class="btn-envoi texte-gras">
                        ENVOYER
                    </button>
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