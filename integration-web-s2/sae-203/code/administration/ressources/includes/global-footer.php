<?php
    if (!is_null($mysqli_link)) {
        mysqli_close($mysqli_link);
    }
?>
<footer class="border-y border-gray-400 text-center mx-6 py-2 mb-1">
    <p class="font-bold">SAÉ 203 - Concevoir un site web avec une source de données</p>
    <p class="font-bold">MMI <?php echo (date("Y") - 1) . "-" . (date("Y") + 2); ?></p>
    <p>Projet réalisé par :</p>
    <ul class="inline-flex">
        <li class="px-1">A compléter</li>
        <li class="px-1">A compléter</li>
        <li class="px-1">A compléter</li>
    </ul>
</footer>
