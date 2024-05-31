<?php
// @NOTE : SAUF CAS EXCEPTIONNEL, VOUS N'AVEZ PAS BESOIN DE MODIFIER CE FICHIER
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$PHP_MIN_VERSION = '7.0.0';

if (version_compare(PHP_VERSION, $PHP_MIN_VERSION) < 0) {
    $version_php = phpversion();
    die("ERREUR : Version de PHP trop ancienne ({$version_php}). Votre version de PHP doit être supérieure ou égale à $PHP_MIN_VERSION. Veuillez installer une version plus récente.");
}

$racine_server_chemin = $_SERVER['DOCUMENT_ROOT'];

$url = $_SERVER['REQUEST_URI'];
$url_list_parts = explode('/', str_ireplace(array('http://', 'https://'), '', $url));
$url_list_parts = array_filter($url_list_parts);
$racine_dossier_raw = [];

$liste_dossiers_exclure = ["administration"];

foreach ($url_list_parts as $url_part) {
    if (in_array($url_part, $liste_dossiers_exclure)) {
        break;
    }

    if (
        strpos($url_part, ".") === false &&
        !in_array($url_part, glob("**", GLOB_ONLYDIR))
    ) {
        $racine_dossier_raw[] = $url_part;
    }
}

$racine_dossier = "/" . join("/", $racine_dossier_raw);

require_once("{$racine_server_chemin}{$racine_dossier}/classes/DotEnv.php");

$fichier_env_chemin = "{$racine_server_chemin}{$racine_dossier}/.env.prod";

$liste_domaines_locaux = array(
    '127.0.0.1',
    '::1'
);

$REMOTE_ADDR = $_SERVER['REMOTE_ADDR'];

$est_env_local = in_array($REMOTE_ADDR, $liste_domaines_locaux) || 
    !filter_var($REMOTE_ADDR, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6 | FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE);

if ($est_env_local) {
    $fichier_env_chemin = "{$racine_server_chemin}{$racine_dossier}/.env.dev";

    // Permet de gérer un fichier env.local.dev 
    // pour la configuration s'il existe 
    $chemin_dist = "{$racine_server_chemin}{$racine_dossier}/.env.local.dev";
    if (file_exists($chemin_dist)) {
        $fichier_env_chemin = $chemin_dist;
    }
} else {
    // Permet de gérer un fichier env.local.prod 
    // pour la configuration s'il existe 
    $chemin_dist = "{$racine_server_chemin}{$racine_dossier}/.env.local.prod";
    if (file_exists($chemin_dist)) {
        $fichier_env_chemin = $chemin_dist;
    }
}

(new DotEnv($fichier_env_chemin))->load();

try {
    $nom_BDD = $_ENV['NOM_BDD'];
    $serveur_BDD = $_ENV['SERVEUR_BDD'];

    // On se connecte à notre base de données
    $mysqli_link = mysqli_connect($serveur_BDD, $_ENV['UTILISATEUR_BDD'], $_ENV['MDP_BDD'], $nom_BDD);
} catch (Exception $e) {
    die('Erreur : ' . $e->getCode() . " - " . $e->getMessage());
}
