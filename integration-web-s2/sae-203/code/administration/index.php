<?php 
// A modifier SI ET SEULEMENT SI 
// vous souhaitez que l'utilisateur arrive sur une autre page 
// lorsqu'il arrive sur la page "/administration"
if (substr($_SERVER['REQUEST_URI'], -1) === "/") {
    header('Location: ./auteurs');
} else {
    header('Location: ./administration/auteurs');
}