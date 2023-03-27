<?php

// Importation de la bibliothèque
require_once './libs/Smarty.class.php';

// Instanciation del'objet Smarty
$smarty = new Smarty();
$smarty->setTemplateDir('./templates');
// $smarty->testInstall();

$listTpl = glob('templates/*.tpl');

function getTplName($path)
{
    return basename($path, ".tpl");
}

$listTplNames = array_map('getTplName', $listTpl);
$tplIndex = array_search(isset($_GET["page"]) ? $_GET["page"] : "" , $listTplNames);

if($tplIndex !== false) {
    $smarty->assign('ma_variable', "Bonjour");
    $smarty->assign('liste_affaires', ["stylo noir", "crayon de papier", "classeur", "feuilles doubles"]);
    $smarty->assign('titre_page', basename($listTpl[$tplIndex], '.tpl'));

    $templateFile = basename($listTpl[$tplIndex]);
} else {
    $templateFile = 'index.tpl';
}

// Affichage du template après compilation
$smarty->display($templateFile);
