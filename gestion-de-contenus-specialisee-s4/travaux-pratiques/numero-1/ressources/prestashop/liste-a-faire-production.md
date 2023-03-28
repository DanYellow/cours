# Liste à faire avant la publication du site

Pour vous permettre de mettre en ligne votre site Prestashop dans les meilleures conditions, il y a une liste de choses à faire, la liste n'est pas forcément ordonnée et exhaustive :

- Récupérer ses identifiants FTP et de base de données
- Exporter votre base de données depuis phpmyadmin puis la réimporter dans le phpmyadmin de votre hébergeur
    - Une fois la base de données importée sur le serveur distant, il faudra mettre à jour la table `shop_url` (il est probable que la table ait un préfixe). Dans cette table, les colonnes suivantes devront être mise à jour : 
        - domain : Vous mettez le nom de domaine de votre site. Si votre domaine est "exemple.com", vous mettez cette valeur dans la colonne.
        - domain_ssl : Idem que pour "domain"
        - physical_url : Mettez le nom du dossier qui contient votre site prestashop (les fichiers que vous avez uploadé). Si les fichiers sont contenus dans un dossier appelé "mon-prestashop", il faudra mettre comme valeur `/mon-prestashop/`. Si tout est à la racine du serveur, écrivez juste `/`
- Uploader votre site. Pour des questions de simplicité, déplacez tous les fichiers sauf les dossiers suivants :
    - `var/` (Il faut quand même le dossier mais pas son contenu)
- Mettre à jour la configuration de la base de données dans le fichier `app/config/parameters.php`, mettez à jour les clés suivantes :
    - database_host : serveur de votre base de données
    - database_port : port du serveur de votre base de données
    - database_name : nom de votre base de données
    - database_user : nom de l'utilisateur de la base de données
    - database_password : mot de passe de l'utilisateur de la base de données
- Mettre à jour la configuration du serveur mail dans le fichier `app/config/parameters.php`, mettez à jour les clés suivantes :
    - mailer_host : serveur mail
    - mailer_user : l'adresse qui va envoyer les e-mails
    - mailer_password : mot de passe de l'adresse e-mail
> Note : si vous utilisez github pour héberger votre site, ne mettez jamais les mots de passe et même nom d'utilisateur dessus. Créez une version dist de votre fichier. Par exemple `app/config/parameters.dist.php` et localement vous mettrez les bonnes valeurs.
- Désactivez le cache et la barre de debug (facultatif pour le dernier). Toujours dans le fichier `app/config/parameters.php`. Opérez les changements suivants :
    - ps_cache_enable: false => true
    - use_debug_toolbar: true => false
> Lors du test de votre site, si vous avez une erreur, une page blanche. Réactivez "use_debug_toolbar" pour voir les erreurs.
- Dans le back-office, allez dans le menu `Paramètres avancés > Performances`, activez le cache de Smarty (haut de page) et celui général (bas de page). 
- Améliorez le SEO. Toujours dans le back-office, `Paramètres de la boutique > Trafic et SEO`. Activez l'option "URL simplifiée".
- **Enfin, il faudra ajouter la gestion du SSL, ceci est indispensable si votre site permet l'achat en ligne. Sinon, vous exposez à une faille de sécurité grave et à une violation de la loi.** Allez dans `Paramètres de la boutique > Paramètres généraux > Activer le SSL`.
> Dépendamment de votre hébergeur, il est possible que le SSL ne soit pas forcément disponible. Nous n'allons pas forcément tenir compte de ce point, mais si vous devez mettre un site marchand en ligne pour utilisation commerciale, il faut absolument avoir le SSL d'activé.