<nav class="navigation-principale semigras">
    <ul>
        <li <?php if ($page_active == "index") {
                echo "class='active'";
            } ?>>
            <a href="index.php">
                ACCUEIL
            </a>
        </li>
        <li <?php if ($page_active == "apropos") {
                echo "class='active'";
            } ?>><a href="a-propos.php">A PROPOS</a></li>
        <li <?php if ($page_active == "contact") {
                echo "class='active'";
            } ?>><a href="contact.php">CONTACT</a></li>
        <li <?php if ($page_active == "medias") {
                echo "class='active'";
            } ?>><a href="sur-les-medias.php">SUR LES MÉDIAS</a></li>
    </ul>
</nav>

<header class="bulle">
    <article class="titre">
        <h1 class="txt-grand">
            <span>Bachelor</span>
            <span>Universitaire de</span>
            <span>Technologie</span>
        </h1>
        <h2 class="txt-petit">
            <span>Métiers du Multimédia et de</span>
            <span>l'Internet</span>
        </h2>
    </article>

    <article class="bulle-icone <?php echo $couleur_bulle_classe; ?>"></article>
    <article class="bulle-icone-bordure <?php echo $couleur_bulle_classe; ?>"></article>
</header>