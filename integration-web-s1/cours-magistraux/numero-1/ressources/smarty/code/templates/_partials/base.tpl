<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> {block name='nom_page'}Page {$pagename}{/block}</title>

    <link rel="stylesheet" href="https://danyellow.net/cours-mmi/reset.css" />

    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 1rem;
            padding: 0.5rem;
        }

        .menu {
            display: flex;
            column-gap: 1rem;
            margin-bottom: 2rem;
            font-size: 1.5rem;
        }
    </style>
</head>

<body>
        <header>
            <nav>
                <ul class="menu">
                    <li class="crumb"><a href="?page=index">Accueil</a></li>
                    <li class="crumb"><a href="?page=contact">Contact</a></li>
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