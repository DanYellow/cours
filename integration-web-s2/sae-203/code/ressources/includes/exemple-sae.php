<?php 
    // La variable i est récupérée depuis la boucle qui l'importe 
    $numSAE = 101 + $i;
    $listSAES = [
        "Auditer une communication numérique", 
        "Concevoir une recommandation de communication numérique", 
        "Produire les éléments d’une communication visuelle",
        "Produire un contenu audio et vidéo",
        "Produire un site Web",
        "Gérer un projet de communication numérique"
    ]
?>
<article class="projet">
    <div class="img">
        <img src="ressources/images/image-article.png" alt="">
    </div>
    <section class='textes'>
        <h2 class="titre"><?php echo $listSAES[$i]; ?> • SAÉ <?php echo $numSAE; ?></h2>
        <p class='paragraphe description'>Apprendre les bases du reportage vidéo sur un sujet libre</p>
    </section>
</article>