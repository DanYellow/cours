<?php
require_once('./classes/DotEnv.php');

$envFilePath = $_SERVER['DOCUMENT_ROOT'] . '/.env.prod';

$whiteList = array(
    '127.0.0.1',
    '::1'
);

if (in_array($_SERVER['REMOTE_ADDR'], $whiteList)) {
    $envFilePath = $_SERVER['DOCUMENT_ROOT'] . '/.env.dev';
}

(new DotEnv($envFilePath))->load();

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
} catch (\Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
