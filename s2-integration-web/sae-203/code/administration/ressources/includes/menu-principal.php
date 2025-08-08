<?php

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
    ],
];
?>

<nav class="bg-gradient-to-r from-gray-800 to-slate-900">
    <div class="mx-auto max-w-7xl px-4 py-2">
        <div class="flex items-center gap-y-4 gap-x-8 md:flex-row flex-col">
            <div class="flex-shrink-0">
                <p>
                    <a href="<?php echo $liste_entrees_menu[0]["lien"]; ?>" class="text-white font-bold hover:text-sky-200 focus:text-sky-200">Administration SAE 203</a>
                </p>
            </div>
            <nav class="flex items-baseline gap-x-4 grow">
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
                    }
                ?>
            </nav>
        </div>
    </div>
</nav>
