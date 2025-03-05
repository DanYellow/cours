<?php
// Editez le tableau de dictionnaires ci-dessous
$liste_entrees_menu = [
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

<nav class="bg-gradient-to-r from-gray-800 to-slate-900">
    <div class="mx-auto max-w-7xl px-4">
        <div class="flex h-16 items-center">
            <div class="flex-shrink-0">
                <p class="text-white font-bold">
                    <a href="./administration/articles">Administration SAE 203</a>
                </p>
            </div>
            <nav class="ml-10 flex items-baseline space-x-4 grow">
                <?php 
                    foreach ($liste_entrees_menu as $key => $entree_menu) {
                        $liste_classes = 'text-white';
                        if ($key === array_key_last($liste_entrees_menu)) {
                            $liste_classes .= ' ml-auto';
                        }
                        $aria_current_attr = "";
                        if ($page_courante === $entree_menu["clef"]) {
                            $aria_current_attr = "aria-current='page'";
                            $liste_classes = "bg-white text-gray-900";
                        }
    
                        echo "
                            <a href='{$entree_menu["lien"]}' class='{$liste_classes} rounded-md font-medium hover:bg-gray-700 hover:text-white focus-within:bg-gray-700 focus-within:text-white px-3 py-2' $aria_current_attr>
                                {$entree_menu["nom"]}
                            </a>
                        ";
                } ?>
            </nav>
        </div>
    </div>
</nav>