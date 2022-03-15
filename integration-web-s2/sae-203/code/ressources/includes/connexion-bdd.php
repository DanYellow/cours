<?php
try {
    // A changer en fonction de votre configuration sur phpmyadmin
    $nomUtilisateur = 'root';
    $motDePasse = '';

    // On se connecte à notre base de donnée
    $clientMySQL = new PDO(
        'mysql:host=localhost;dbname=sae_203_db;charset=utf8', 
        $nomUtilisateur, 
        $motDePasse,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION],
    );
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
