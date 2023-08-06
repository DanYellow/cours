L'utilisation de l'extenson liveshare de VS Code est très pratique pour travailler en groupe sur le même projet. Néanmoins, vous avez dû remarquer que si vous pouvez bien modifier les fichiers chez l'hôte, il vous est impossible de voir les modifications sur votre ordinateur local, ce qui limite fortement le travail collaboratif.

> Note : **Les instructions suivantes ne fonctionneront que si et seulement si les conditions suivantes sont toutes réunies :**
> - Les ordinateurs, qui veulent voir les modifications en local, sont sur le même réseau. Par exemple à l'IUT. Attention à l'IUT les réseaux Wi-Fi et Ethernet sont séparés. **Ce sont deux réseaux différents.**
> - Le projet tourne sur un serveur (MAMP/WAMP/XAMPP...)

Nous allons, vous proposer deux méthodes :
- Modification de la configuration de MAMP/XAMPP/WAMPP - Plus "compliqué"
- Utilisation de l'extension gratuite VS Code "PHP Server" - Plus simple

**Quelque soit la solution choisie, une seule personne a besoin de partager son serveur à la fois.** Ainsi, vous pourrez tous éditer les fichiers du même projet et consulter les modifications sur votre ordinateur.
# Récupérer son adresse ip locale

Dans le but de partager votre serveur avec des tiers, qui sont sur le même réseau, il faut faudra impérativement récupérer votre adresse ip **locale**. Dépendamment de votre système d'exploitation la récupération n'est pas la même. L'adresse ip locale **n'est nécessaire que** pour la personne qui va partager son serveur local.

## Windows

1. Ouvrez l'application "invite de commande"
2. Ecrivez la commande  `ipconfig` et appuyez sur la touche `Entrée`
![](captures-ecran/invite-commande.jpg)
3. Récupérez l'adresse ip locale et transmettez-la aux membres de votre groupe


## MacOS
1. Ouvrez l'application "Préférences système"
2. Choississez le menu "Réseau"
![](captures-ecran/pref-sys.png)
3. Sélectionnez la méthode connexion utilisée et récupérez l'adresse ip locale et transmettez-la aux membres de votre groupe
![](captures-ecran/reseau.png)

Une fois que vous avez récupérer l'adresse ip local de votre serveur (l'ordinateur qui fait le partage liveshare), vous pouvez la partager avec les membres de votre groupe qui pourront accéder au site depuis le navigateur de leur ordinateur. Par exemple 192.168.X.X/sae203.

> **Note importante :** Votre adresse ip peut changer à fois que vous vous connectez. Pensez bien à la revérifier et faire les actions nécessaires, si c'est le cas.

# Partage de serveur - WAMP/MAMP/XAMPP

Si vous souhaitez partager un serveur WAMP/MAMP/XAMPP..., l'ordinateur hôte (celui qui lance le serveur liveshare) doit récupérer son adresse ip locale et la partager avec les membres de son groupe. Toutefois Windows peut se montrer un peu contraignant dans son utilisation.
##### Note pour les hôtes sous Windows - Windows 10

Le système d'exploitation peut potentiellement bloquer les requêtes venant de l'extérieur en direction de votre serveur. Dans le cas où l'hôte est sous Windows, il vous faudra rajouter le serveur au pare-feu Windows. Pour ce faire, suivez les étapes suivantes :

1. Ouvrez le logiciel "Sécurité Windows". Vous pouvez utiliser le raccourci `Windows + S` pour afficher le menu de recherche et chercher "Sécurité Windows".
![](captures-ecran/pare-feu-1.png)

2. Sélectionnez "Pare-feu et protection du réseau"
![](captures-ecran/pare-feu-2.jpg)

3. Sélectionnez "Autoriser une application via le pare-feu"
![](captures-ecran/pare-feu-3.jpg)

4. Sélectionnez "Modifier les paramètres" puis "Autoriser une autre application"
   - Cliquer sur "Modifier les paramètres" va activer "Autoriser une autre application"
![](captures-ecran/pare-feu-4.jpg)

5. Cliquez sur le bouton "Parcourir" puis sélectionnez le fichier `httpd.exe` dans le dossier `wamp64\bin\apache\apache2.4.51\bin` et validez l'opération
![](captures-ecran/pare-feu-5.png)

> Le pare-feu peut également être géré par un anti-virus. Regardez sa configuration pour désactiver le pare-feu.

Il vous faudra également éditer le fichier `httpd-vhosts.conf`. Pour y accéder et l'éditer suivez les étapes suivantes :

1. Cliquez sur le logo de WAMP dans la barre de status de Windows. Puis Survolez "Apache ..."
![](captures-ecran/vhosts-1.png)

2. Cliquez sur `httpd-vhosts.conf`
   - Ceci va ouvrir un logiciel avec le fichier `httpd-vhosts.conf`
![](captures-ecran/vhosts-2.png)
3. Remplacez dans le fichier "Require local" en "Require all granted" puis sauvegardez le fichier
4. Redémarrez le WAMP

Maintenant l'accès depuis l'extérieur au serveur hôte sera actif. Vous pourrez tous travailler sur le même projet tout en voyant les modifications en local.

> Note : Des manipulations supplémentaires peuvent être à effectuer **si l'ordinateur hôte utilise XAMPP**. Vous trouverez des informations sur ce site : [Accéder au didacticiel (anglais)](
https://www.mrtekno.net/2019/08/how-to-access-localhost-xampp-vm.html)


# Partage de serveur - Extenstion "PHP Server" pour VS Code

VS Code permet l'utilisation d'extensions. La place de marché des extensions est accessible en cliquant sur les quatre carrés à gauche de la fenêtre du logiciel. 

1. Recherchez "PHP Server"
![](captures-ecran/php-ext-1.png)
2. Sélectionnez l'extension "PHP Server" et installez-la en cliquant sur le bouton "Install"
![](captures-ecran/php-ext-2.png)

Une fois l'installation effectuée, vous ne verrez aucune modification visuelle dans VS Code, toutefois, vous avez accès à un nouveau menu contextuel lorsque vous ferez un clic droit dans un fichier PHP. Mais avant d'expérimenter ceci, nous allons devoir faire quelques modifications dans les options de l'extension.

1. Retournez dans le menu "Extension", cherchez et sélectionnez "PHP Server"
2. Cliquez sur la roue dentée et sélectionnez "Extension Settings"
![](captures-ecran/php-ext-3.png)
3. Remplacez "localhost" par votre adresse ip locale (voir plus haut pour savoir comment la récupérer)
![](captures-ecran/php-ext-4.png)

L'extension est maintenat prête. Vous pouvez donc aller ouvrir un fichier .php du projet avec VSCode puis faire un clic droit. Sélectionnez l'option "PHP Server: Serve project".
![](captures-ecran/php-ext-5.png)

Normalement, un onglet va être ouvert dans votre navigateur par défaut. Et des utilisateurs externes pourront accéder à votre projet via votre adresse ip, et ce, tant que votre serveur tournera.

> Note : Si l'utilisation de cette extension vous dispense de mettre votre dossier de travail dans le dossier `www/` ou `htdocs/`. Il est impératif, dans le cadre de la SAE, d'avoir un serveur SQL qui tourne. **Conséquemment, vous devez lancer le logiciel WAMP/MAMP/XAMPP pour voir un serveur SQL.**

## Erreur "PHP not found"
L'erreur "PHP not found" peut être levée par l'extension "PHP server", cette erreur, très facile à corriger, est liée au fait que l'extension ne trouve pas PHP sur l'ordinateur. Pour ce faire, il faudra retourner dans les paramètres de l'extension et mettre le chemin vers l'exécutable PHP. Si vous avez installé WAMP, l'exécutable se trouve dans le dossier `wamp64/bin/php/phpX.X.X/php.exe`
> Vous devrez remplacer phpX.X.X par une des versions de PHP isntallée sur votre ordinateur. Préférez la plus récente et supérieure ou égale à la version 7.0.0.

Récupérez le chemin puis mettez-le dans le paramètre "phpserver PHP Path".
![](captures-ecran/phpserve-error.jpg)
Et si vous avez mis le bon chemin, vous pouvez lancer le serveur sans problèmes.

---
L'accès à votre travail local peut également être accessible à distance, mais ceci nécessite des outils externes comme localtunnel (gratuit).
- [Accéder au site de localtunnel](https://localtunnel.github.io/www/)