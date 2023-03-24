# SAE 401 - Mettre en place une solution ecommerce et la stratégie associée
> _Les consignes pourront être modifiées et peuvent aborder des notions qui n'ont pas pu être vues en cours pour des questions de temps. La cas échéant ne prenez pas en compte ces consignes là. Toutefois rien ne nous empêche d'essayer._

> **Note : Le projet a été développé avec une ancienne version d'Unity. Néanmoins, vous serez en capacité de l'ouvrir avec une version plus récente.**

Dans le cadre du cours de création et design interatif, nous avons pu découvrir le logiciel Unity, il permet de faire des jeux vidéo de toutes sortes. Le but de cette SAE sera donc de renforcer vos connaissances et d'en découvrir de nouvelles. Le tout dans le but de valider les Apprentissages Critiques (AC) suivants : 

- ~~AC21.01 | Analyser la stratégie de communication ou marketing d’un acteur, d’une organisation au regard d’un secteur ou d’un marché (stratégie, mission, valeurs...)~~
- ~~AC21.02 | Auditer un site web, une marque ou un service, en termes de trafic et de référencement~~
- ~~AC21.04 | Identifier et décrire les parcours client à partir d’enquêtes de terrain~~
- ~~AC21.05 | Cartographier les expériences utilisateur : points de contact, points de friction et de satisfaction, carte d’empathie~~
- ~~AC22.01 | Co-concevoir un produit ou un service (proposition de valeur fonctionnalités...)~~
- AC22.04 | Optimiser le référencement d’un site web, d’un produit ou d’un service
- AC24.01 | Produire des pages et applications Web responsives
- AC24.02 | Mettre en place ou développer un back office
- AC24.05 | Optimiser une application web en termes de référencement et de temps de chargement
- AC24.06 | Configurer une solution d’hébergement adaptée aux besoins
- ~~AC25.02 | Cartographier un écosystème (identification des acteurs, synthèse des propositions de valeur)~~
- ~~AC25.06 | Prendre en compte les contraintes juridiques~~

Dans le cadre de votre SAE 401, vous allez devoir réaliser un site d'e-commerce avec Prestashop pour le client avec qui vous travaillez présentement. Le but est d'utiliser la maquette graphique que vous avez réalisé pour lui donner vie grâce à Prestashop. En plus de l'intégration de votre thème, il vous faudra également : 
- Présenter votre site lors d'une soutenance
- **Fournir le code source du thème**
    - Uniquement le dossier de votre thème enfant
- Mettre en ligne votre site et fournir l'URL de votre site
    - Il ne devra pas être public. Il devra être accessible via un mot de passe. Vous pouvez le protéger avec un fichier .htaccess
- Réaliser un guide de contenant :
    - La démarche déploiement imagé expliquant commenter installer le thème / site et le mettre en ligne
    - L'explication des fonctionnalités

# Votre liste à faire
- [x] Lire les consignes
- [ ] Former votre groupe, plus tôt vous le ferez, plus tôt vous pourrez commencer à travailler sereinement
- [ ] Respecter les attentes


# FAQ - Foire Aux Questions
- **Je n'ai pas de serveur pour mettre mon site en ligne. Existe-t-il un hébergeur gratuit ?**
    
    Il existe l'hébergeur ([accéder au site](https://www.infinityfree.net/)), il propose un espace disque conséquent (5 GB - Prestashop prend près de 500 MB) et plusieurs bases de données. 
- **J'ai commencé mon site en local et je souhaiterais le mettre en ligne. Que dois-je faire ?**

    Commencez par changer la configuration de la base de données. Il est très fort probable que votre couple utilisateur/mot de passe ne soit pas le même une fois en ligne. Il faudra modifier les clés suivantes (à adapter en fonction de votre hébergeur) dans le fichier `app/config/parameters.php` :
    - database_host
    - database_port
    - database_name
    - database_user
    - database_password

    Il vous faudra également exporter votre base de données depuis phpmyadmin pour l'importer sur votre hébergeur ([voir comment exporter une base de données dans phpmyadmin](https://help.nindohost.com/fr/article/comment-importerexporter-une-base-de-donnees-mysql-via-phpmyadmin-17vf0vm/)). Ensuite, toujours dans le fichier `app/config/parameters.php`, opérez les changements suivants :
    - use_debug_toolbar: true => false
    - ps_cache_enable: false => true

    Appliquez les bonnes valeurs pour la configuration du serveur e-mails (clés "mailer_host", "mailer_user" et "mailer_password").

    Et pour terminer uploadez vos fichiers sur votre serveur, à l'exception du contenu du dossier `var/` (Il faut quand même le dossier mais pas son contenu).
- **Mon site est en ligne, il y a des paramètres / options à configurer ?**

    Oui. Il faudra activer les caches de Prestashop. Dans le back-office, allez dans le menu `Paramètres avancés > Performances`, activez le cache de Smarty (haut de page) et celui général (bas de page). 

    Vous devrez changer les URL du site. Toujours dans le back-office, `Paramètres de la boutique > Trafic et SEO`. Activez l'option "URL simplifiée". Restez dans le même menu, un peu plus bas, il y a la section "URL de la boutique", remplissez les bonnes valeurs pour les trois champs proposés. Si vous ne pouvez pas changer les urls dans la section "URL de la boutique", il est possible d'effectuer ces modifications directement dans la base de données, c'est dans la table `VOTRE_PREFIX_shop_url`.

    **Enfin, il faudra ajouter la gestion du SSL, ceci est indispensable si votre site permet l'achat en ligne. Sinon, vous exposez à une faille de sécurité grave et à une violation de la loi.** Allez dans `Paramètres de la boutique > Paramètres généraux > Activer le SSL`.

    > Dépendamment de votre hébergeur, il est possible que le SSL ne soit pas forcément disponible. Nous n'allons pas forcément tenir compte de ce point, mais si vous devez mettre un site marchand en ligne pour utilisation commerciale, il faut absolument avoir le SSL d'activé.

- **Je ne vois pas ma boutique**

    Avez-vous désactivé le mode maintenance ? (`back-office > Mode maintenance (en haut à droite) > Activer boutique`)

- **Existe-il un moyen plus rapide d'uploader mon site ?**

    Si vous trouvez que ça prend trop de temps d'uploader votre site local, il est possible d'installer directement Prestashop sur votre serveur (comme nous avons fait en cours). Il faudra penser à exporter votre catalogue pour le réimporter sur votre back-office sur votre site. 
    
    Attention : Pensez aussi à mettre vos images sur votre serveur. Sinon, vous aurez les produits (et autres), mais pas les images associées. Elles se trouvent dans le dossier `img/`. [En savoir plus sur l'importation / exportation de catalogue Prestashop](https://www.codeur.com/tuto/prestashop/importer-exporter-catalogue-produit-prestashop/).

