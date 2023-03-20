<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> {block name='nom_page'}Page {$nom_page}{/block}</title>

    <link rel="stylesheet" href="https://danyellow.net/cours-mmi/reset.css" />
    <link rel="stylesheet" href="style.css" />
</head>

<body>
        <header>
            <nav>
                <ul class="menu">
                    <li class="crumb"><a class="lien" href="?page=index">Accueil</a></li>
                    <li class="crumb"><a class="lien" href="?page=contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    <main>
        <p>Ceci s'affiche sur toutes les pages</p>
        <hr>
        {block name='contenu_page'}{/block}
    </main>
</body>

</html>