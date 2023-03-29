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
- Réaliser un guide au format pdf de contenant :
    - La démarche déploiement imagé expliquant commenter installer le thème / site et le mettre en ligne
    - L'explication des fonctionnalités

# Votre liste à faire
- [x] Lire les consignes
- [ ] Intégrer le contenu du catalogue du client 
- [ ] Développer son thème enfant basé sur le design réalisé en cours
- [ ] Déployer son site en ligne


# FAQ - Foire Aux Questions
- **Je n'ai pas de serveur pour mettre mon site en ligne. Existe-t-il un hébergeur gratuit ?**

    Il existe l'hébergeur ([accéder au site](https://www.infinityfree.net/)), il propose un espace disque conséquent (5 GB - Prestashop prend près de 500 MB) et plusieurs bases de données. 

- **Je ne vois pas ma boutique**

    Avez-vous désactivé le mode maintenance ou ajouté votre adresse IP (`back-office > Mode maintenance (en haut à droite) > Activer boutique`) ? **Préférez la seconde option pour la SAE.**

- **Existe-il un moyen plus rapide d'uploader mon site ?**

    Si vous trouvez que ça prend trop de temps d'uploader votre site local, il est possible d'installer directement Prestashop sur votre serveur (comme nous avons fait en cours). Il faudra penser à exporter votre catalogue pour le réimporter sur votre back-office sur votre site. 
    
    Attention : Pensez aussi à mettre vos images sur votre serveur. Sinon, vous aurez les produits (et autres), mais pas leurs images associées. Elles se trouvent dans le dossier `img/`. [En savoir plus sur l'importation / exportation de catalogue Prestashop](https://www.codeur.com/tuto/prestashop/importer-exporter-catalogue-produit-prestashop/).
