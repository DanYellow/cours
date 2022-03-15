# Requêtes SQL

Le but de cette partie est de voir brièvement le fonctionnement des requêtes SQL avec le langage de programmation PHP. Le fonctionnement est plus ou moins semblable à ce que vous avez vu sous Microsoft Access, c'est juste la syntaxe qui change.

## Connexion à la base de données

Pour lire nos données, il nous faut impérativement un accès à une base de données. Dans le cadre du projet, vous n'aurez pas à vous s'occuper de cette partie. La connexion est déjà faite dans le fichier `ressources/includes/connexion-bdd.php` toutefois, il faudra modifier les paramètres de connexion (utilisateur et mot de passe) avec les vôtres.

## Sélectionner des entrées

Pour récupérer nos entrées depuis la base de données, nous allons devoir utiliser le langage SQL, on parle de `requête` quand on souhaite communique avec la base. Effectuons notre première requête : Sélectionnons tous les articles présents dans la base.

```sql
SELECT * FROM article
```

La `requête` ci-dessus pourrait se traduire en "Récupère-moi toutes les lignes de la table article". Voilà ce qu'on peut retenir de notre requête :
- Les mots-clés `SELECT` et `FROM`
  - `SELECT` : Il signifie littéralement "sélectionne"
  - `FROM` : Indique dans quel table on veut effectuer notre opération ici "article"
- Le caractère "*" qui signifie "tout". Dans notre cas, ce sont toutes les valeurs de chaque ligne
- L'écriture en majuscule des mots-clés (ici `SELECT` et `FROM`). Ce n'est pas obligatoire, mais par convention, on fait comme ça en MySQL

Nous avons notre requête, elle fonctionne très bien en MySQL, toutefois, il faudrait qu'on puisse utiliser son résultat dans notre site et donc php. 

Première étape : préparation de notre requête.

```php
$articleCommande = $mysqlClient->prepare('SELECT * FROM article');
```
Vous l'avez remarqué, nous avons réutilisé notre requête MySQL dans une méthode `prepare`. On ne va pas entrer dans les détails, mais comprenez bien que ceci est indipensable tout comme ce qui va suivre.

Deuxième étape : exécution de notre requête + récupération des données

La code précédent s'il nous permet d'effectuer une requête, son résultat est inexploitable. Ainsi, nous allons devoir exécuter notre commande puis en récupérer le résultat.
```php
$listeArticlesCommand->execute();
$listeArticles = $listeArticlesCommand->fetchAll();
```

Notre variable `$listeArticles` contient un tableau, et ce même tableau contient des tableaux qui ont chacun la structure suivante : 
```php
  array(
    "titre" => "valeur",
    "chapo" => "valeur",
    "image" => "valeur",
    "..."
  )
```

Vu que `$listeArticles` est donc un tableau, nous pouvons itérer dedans comme suit : 

```php
  foreach ($listeArticles as $article) { 
    // On affiche le titre + chapo de chaque article un à un
    $echo $article["titre"] . " " . $article["chapo"];
    // ...
  }
```

Vous trouvez cet exemple au complet dans le fichier `index.php` et une adaptation dans le fichier `administration/auteurs/index.php`. Pour lister les articles ainsi que les messages dans le backoffice, il faudra donc adapter ce code.
