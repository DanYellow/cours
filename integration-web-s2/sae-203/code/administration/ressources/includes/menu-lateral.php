<?php
// Editez le tableau de dictionnaires ci-dessous
$listeEntreesMenu = [
    [
        "lien" => "./administration/articles",
        "nom" => "Articles",
        "clef" => "articles"
    ],
    [
        "lien" => "./administration/auteurs",
        "nom" => "Auteurs",
        "clef" => "auteurs"
    ],
    [
        "lien" => "./administration/messages",
        "nom" => "Messages",
        "clef" => "messages"
    ],
    [
        "lien" => "./",
        "nom" => "Accéder au site",
        "clef" => "site"
    ]
];
?>

<div class="flex column flex-shrink-0 p-3 text-white bg-menu-gradient" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4">Administration</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <?php foreach ($listeEntreesMenu as $entreeMenu) {
            $entreeClasse = 'nav-link';
            $ariaCurrentAttr = "";
            if ($pageCourante === $entreeMenu["clef"]) {
                $ariaCurrentAttr = "aria-current='page'";
                $entreeClasse = "$entreeClasse active";
            }

            if ($entreeMenu["clef"] === "site") {
                $entreeClasse = "$entreeClasse mt-5";
            }

            echo "
                <li class='nav-item'>
                    <a href='{$entreeMenu["lien"]}' class='$entreeClasse text-white' $ariaCurrentAttr>
                        {$entreeMenu["nom"]}
                    </a>
                </li>
            ";
        } ?>
    </ul>
    <hr>
    <?php include_once("../ressources/includes/menu-lateral-footer.php"); ?>

</div>