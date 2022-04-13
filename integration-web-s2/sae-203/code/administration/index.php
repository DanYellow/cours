<?php 
// A modifier SI ET SEULEMENT SI 
// vous souhaitez que l'utilisateur arrive sur une autre page 
// lorsqu'il arrive sur la page "/administration"

$listDomaineLocaux = array(
    '127.0.0.1',
    '::1'
);

if (in_array($_SERVER['REMOTE_ADDR'], $listDomaineLocaux)) {
    header('Location: ./administration/auteurs');
} else {
    header('Location: ./auteurs');
}