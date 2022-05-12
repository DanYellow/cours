<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!defined('PHP_VERSION_ID')) {
    $version = explode('.', PHP_VERSION);

    define('PHP_VERSION_ID', ($version[0] * 10000 + $version[1] * 100 + $version[2]));
}

$PHP_TARGETED_VERSION = 70000;

if(PHP_VERSION_ID < $PHP_TARGETED_VERSION) {
    $versionPHP = phpversion();
    die("ERREUR : Version de PHP trop ancienne : {$versionPHP}. Votre version de PHP doit être supérieure ou égale à 7.0.0. Veuillez installer une version plus récente.");
}

$racineServerChemin = $_SERVER['DOCUMENT_ROOT'];

$url = $_SERVER['REQUEST_URI'];
$urlListParts = explode('/', str_ireplace(array('http://', 'https://'), '', $url));
$urlListParts = array_filter($urlListParts);
$racineDossierRaw = [];

$listeDossiersExclure = ["administration"];

foreach ($urlListParts as $urlPart) {
    if (in_array($urlPart, $listeDossiersExclure)) {
        break;
    }

    if (
        strpos($urlPart, ".") === false &&
        !in_array($urlPart, glob("**", GLOB_ONLYDIR))
    ) {
        $racineDossierRaw[] = $urlPart;
    }
}

$racineDossier = "/" . join("/", $racineDossierRaw);

require_once("{$racineServerChemin}{$racineDossier}/classes/DotEnv.php");

$fichierEnvChemin = "{$racineServerChemin}{$racineDossier}/.env.prod";

$listDomaineLocaux = array(
    '127.0.0.1',
    '::1'
);

if (in_array($_SERVER['REMOTE_ADDR'], $listDomaineLocaux)) {
    $fichierEnvChemin = "{$racineServerChemin}{$racineDossier}/.env.dev";

    // Permet de gérer un fichier env.local.dev 
    // pour la configuration s'il existe 
    $cheminDist = "{$racineServerChemin}{$racineDossier}/.env.local.dev";
    if (file_exists($cheminDist)) {
        $fichierEnvChemin = $cheminDist;
    }
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
