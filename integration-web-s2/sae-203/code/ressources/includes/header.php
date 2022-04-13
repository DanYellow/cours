<nav class="navigation-principale conteneur-1280">
    <ul>
        <li <?php if ($page_active == "index") {
                echo "class='active'";
            } ?>><a href="./">ACCUEIL</a>
        </li>
        <li <?php if ($page_active == "apropos") {
                echo "class='active'";
            } ?>><a href="./a-propos.php">A PROPOS</a></li>
        <li <?php if ($page_active == "") {
                echo "class='active'";
            } ?>><a href="./">ÉQUIPE DE RÉDACTION</a></li>
        <li <?php if ($page_active == "medias") {
                echo "class='active'";
            } ?>><a href="./sur-les-medias.php">SUR LES MÉDIAS</a></li>
        <li <?php if ($page_active == "contact") {
                echo "class='active'";
            } ?>><a href="./contact.php">CONTACT</a></li>
        <li class="lien-admin"><a href="./administration/auteurs">Administration</a></li>
    </ul>
</nav>