<?php

$racineServerChemin = $_SERVER['DOCUMENT_ROOT'];
require_once("{$racineServerChemin}/classes/DotEnv.php");

$fichierEnvChemin = "{$racineServerChemin}/.env.prod";

$listDomaineLocaux = array(
    '127.0.0.1',
    '::1'
);

if (in_array($_SERVER['REMOTE_ADDR'], $listDomaineLocaux)) {
    $fichierEnvChemin = "{$racineServerChemin}/.env.dev";
}

(new DotEnv($fichierEnvChemin))->load();

try {
    $nomBDD = getenv('NOM_BDD');
    $serveurBDD = getenv('SERVEUR_BDD');

    // On se connecte à notre base de donnée
    $clientMySQL = new PDO(
        "mysql:host={$serveurBDD};dbname={$nomBDD};charset=utf8",
        getenv('UTILISATEUR_BDD'),
        getenv('MDP_BDD'),
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION],
    );
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
