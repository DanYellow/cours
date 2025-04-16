<footer class="pied-de-page-principal conteneur-1280">
    <div class="logo">
        <!-- Format svg est un format vectoriel, il se charge comme une image normale -->
        <img src="ressources/images/logo-cyu-couleur.svg" alt="">
    </div>

    <section class="textes">
        <p>Certains textes sont issus de Wikipédia</p>
        <ul class="liste-liens">
            <li>
            <!--
                Tous les lecteurs d'écran ne lisent pas forcément le contenu de l'attribut "title", c'est pourquoi nous pouvons
                utiliser l'attribut "aria-label" qui doit s'utiliser QUE quand le libellé n'est pas lisible.
                A noter que l'attribut "aria-label" n'est lu QUE par les lecteurs d'écran, il n'est donc pas redondant de mettre l'attribut "title" et "aria-label"

                Plus d'informations ici : https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute
            -->
                <a aria-label="Ouverture dans un nouvel onglet" href="https://fr-fr.facebook.com/CYCergyParisUniversite/" title="Ouverture dans un nouvel onglet" target="_blank">Facebook</a>
            </li>
            <li>
                <a aria-label="Ouverture dans un nouvel onglet" href="https://twitter.com/universitecergy?lang=fr" title="Ouverture dans un nouvel onglet"  target="_blank">Twitter</a>
            </li>
            <li>
                <a aria-label="Ouverture dans un nouvel onglet" href="https://fr-fr.facebook.com/CYCergyParisUniversite/" title="Ouverture dans un nouvel onglet"  target="_blank">Université CY Paris Université</a>
            </li>
            <!--
                L'attribut "aria-hidden" permet d'empêcher les lecteurs d'écran de lire un élément
                Ici le caractère | n'est là que pour décorer, il est donc inutile pour les lecteurs d'écran
                Plus d'informations ici : https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden - anglais
                ou encore ici : https://www.a11y-101.com/development/aria-hidden - anglais
            -->
            <li aria-hidden="true">
                |
            </li>
            <li>
                <a href="./administration/auteurs" class="lien-admin">Accéder à l'administration</a>
            </li>
        </ul>

        <p class="txt-credits">SAE 203 • BUT MMI - CY Paris Université - Site de Sarcelles</p>
    </section>


</footer>
