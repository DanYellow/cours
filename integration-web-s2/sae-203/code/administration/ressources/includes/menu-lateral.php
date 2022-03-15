<?php
$listeEntreesMenu = [
    [
        "lien" => "",
        "nom" => "Articles",
        "clef" => "articles"
    ],
    [
        "lien" => "/administration/auteurs/index.php",
        "nom" => "Auteurs",
        "clef" => "auteurs"
    ],
    [
        "lien" => "",
        "nom" => "Messages",
        "clef" => "messages"
    ]
];
?>

<div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
        </svg>
        <span class="fs-4">Sidebar</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <?php foreach ($listeEntreesMenu as $entreeMenu) {
            $entreeClasse = 'nav-link';
            if ($pageCourante === $entreeMenu["clef"]) {
                $entreeClasse = 'nav-link active';
            }
            echo "
                <li class='nav-item'>
                    <a href='{$entreeMenu["lien"]}' class='{$entreeClasse}' aria-current='page'>
                        {$entreeMenu["nom"]}
                    </a>
                </li>
            ";
        } ?>
    </ul>
</div>