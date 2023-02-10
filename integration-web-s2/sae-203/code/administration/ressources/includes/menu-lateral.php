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

<nav class="bg-gray-800">
    <div class="mx-auto px-4 max-w-7xl">
        <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <h1 class="text-white font-bold">Administration SAE 203</h1>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <?php foreach ($listeEntreesMenu as $entreeMenu) {
                            $lienClasses = 'text-white ';
                            $ariaCurrentAttr = "";
                            if ($pageCourante === $entreeMenu["clef"]) {
                                $ariaCurrentAttr = "aria-current='page'";
                                $lienClasses = "bg-white text-gray-900";
                            }
            
                            // if ($entreeMenu["clef"] === "site") {
                            //     $entreeClasse = "$entreeClasse mt-5";
                            // }
            
                            echo "
                                <a href='{$entreeMenu["lien"]}' class='{$lienClasses} rounded-md font-medium hover:bg-gray-700 hover:text-white px-3 py-2' $ariaCurrentAttr>
                                    {$entreeMenu["nom"]}
                                </a>
                            ";
                        } ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>