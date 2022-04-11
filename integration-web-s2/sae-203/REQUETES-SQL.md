# Requêtes SQL

Le but de cette partie est de voir brièvement le fonctionnement des requêtes SQL avec le langage de programmation PHP. Le fonctionnement est plus ou moins semblable à ce que vous avez vu sous Microsoft Access, c'est juste la syntaxe qui change.

## Connexion à la base de données

Pour lire nos données, il nous faut impérativement un accès à une base de données. Dans le cadre du projet, vous n'aurez pas à vous s'occuper de cette partie. La connexion est déjà faite dans le fichier `ressources/includes/connexion-bdd.php` toutefois, il faudra modifier les paramètres de connexion (utilisateur et mot de passe) avec les vôtres. Pour le développement local, vous modifierez le fichier .env.dev et pour la mise en production, vous modifierez le fichier .env.prod.

## Sélectionner des entrées

Pour récupérer nos entrées depuis la base de données, nous allons devoir utiliser le langage SQL, on parle de `requête` quand on souhaite communiquer avec la base de données. Une `requête`est un instruction pour la base de données.

Effectuons notre première requête : Sélectionnons tous les articles présents dans la base.

```sql
SELECT * FROM article
```

La `requête` ci-dessus pourrait se traduire en "Récupère-moi toutes les lignes de la table article". Voilà ce qu'on peut retenir de notre requête :

- Les mots-clés `SELECT` et `FROM`
  - `SELECT` : Il signifie littéralement "sélectionne"
  - `FROM` : Indique dans quel table on veut effectuer notre opération ici "article"
- Le caractère "*" qui signifie "tout". Dans notre cas, ce sont toutes les valeurs de chaque ligne. Si on souhaite préciser les champs, il suffit de les nommer est les séparer par une virgule. Par exemple :
  - `SELECT champ1, champ2,... FROM table`
- L'écriture en majuscules des mots-clés (ici `SELECT` et `FROM`). Ce n'est pas obligatoire, mais par convention, on fait comme ça en MySQL

Nous avons notre requête, elle fonctionne très bien en MySQL, toutefois, il faudrait qu'on puisse utiliser son résultat dans notre site et donc php.

##### Première étape : préparation de notre requête.

```php
$articleCommande = $mysqlClient->prepare('SELECT * FROM article');
```

Vous l'avez remarqué, nous avons réutilisé notre requête MySQL dans une méthode `prepare`. On ne va pas entrer dans les détails, mais comprenez bien que ceci est indipensable tout comme ce qui va suivre et vous serez obligé de l'utiliser à chaque fois que vous souhaitez communiquer avec la base.

##### Deuxième étape : exécution de notre requête + récupération des données

La code précédent s'il nous permet d'effectuer une requête, son résultat est inexploitable. Ainsi, nous allons devoir exécuter notre requête puis en récupérer le résultat.

```php
$listeArticlesCommand->execute();
$listeArticles = $listeArticlesCommand->fetchAll();
```

Notre variable `$listeArticles` contient un tableau, et ce même tableau contient des tableaux qui ont chacun la structure suivante :

```php
  array(
    "id" => "valeur",
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

###### Sélectionner avec plus de précision

On a vu plus haut que la requête `SELECT * FROM article` nous permettait de sélectionner tous les éléments contenu dans une table. Sachez qu'il est possible d'apporter plus de précisions dans notre sélection via d'autres mots-clés, il y en a plein d'autres qu'on peut utiliser dans un `SELECT`, mais nous allons nous intéresser au mot-clé `WHERE`. Ce dernier nous permet de sélectionner un élément sur la valeur d'un champ. Par exemple : _Essayons de récupérer un élément ayant la valeur 42 pour le champ id dans la table article_.

```php
$articleCommande = $mysqlClient->prepare('SELECT * FROM article WHERE id = :id');

$articleCommande->execute([
  "id" => 42
]);
$article = $articleCommande->fetch();
```

Analysons le code ligne par ligne.

```php
$articleCommande = $mysqlClient->prepare('SELECT * FROM article WHERE id = :id');
```

Notre `SELECT` reste identique, nous avons juste rajouté le `WHERE` et précisé quel champ nous allons effectuer le filtre. Pour des questions de sécurité, il ne faut jamais faire une contaténation pour une requête, vous vous exposez aux injections SQL. Le `:id` est un élément qui sera substitué par notre valeur après.

```php
$articleCommande->execute([
  "id" => 42
]);
```

Comme tout à l'heure, nous exécutons notre requête, toutefois contrairement à tout à l'heure, nous passons un tableau associatif en paramètre à la méthode `execute()`.
Le fonctionnement est très simple, on définit un ensemble de clef => valeur. Dans notre cas, `:id` va être remplacé par `42`.

Généralement la valeur provient de l'URL de la page. On pourrait s'imaginer que notre 42 soit remplacé par `$_GET["id"]`, on récupèrerait donc le paramètre "id" de l'URL.

```php
$article = $articleCommande->fetch();
```

Cette fois-ci, on appelle la méthode `fetch()` (et non `fetchAll()`) tout simplement car un seul résultat nous intéresse. De fait, notre résultat sera un tableau associatif et non un tableau de tableaux associatifs.

> Note : Si la requête ne retourne rien, `fetch()` retournera faux (booléen "false"). Il faut donc prévenir ce cas dans votre code, un exemple est déjà présent dans les fichiers `administration/auteurs/edition.php` et `administration/squelette/edition.php`

La requête `SELECT * FROM article WHERE id = :id` nous sera utile pour afficher le détail d'un article ou encore pré-remplir le formulaire nous permettant d'éditer un article avec les données existantes.

Notez également que si vous souhaitez sélectionner sur plusieurs champs, il faudra utiliser le mot-clé `WHERE`, par exemple : 
```sql
SELECT * FROM article WHERE id = :id AND titre = :titre
```
Dans ce code ci-dessus, on cherche un article avec une valeur spécifique pour le champ `id` **et** une valeur spécifique pour le champ `titre`. Et si vous souhaitez qu'une des deux conditions soit remplie, il faudra remplacer `AND` par `OR`.

## Insérer des données

Nous avons vu précédemment comment lire des données en provenance de la base de données, maintenant, il est temps de voir comment ajouter des données (après, on verra comment les mettre à jour). `INSERT INTO` est le mot-clé permettant d'ajouter des données à une table, il signifie littéralement "insert dans".

Voici un exemple (cette fois-ci on ajoute un "message")

```sql
INSERT INTO message (nom, prenom, contenu, email, type, date_creation)
            VALUES (:nom, :prenom, :contenu, :email, :type, :date)
```

Analysons tout ça :

- `INSERT INTO message` on indique dans quelle table, nous allons insérer les données
- On liste entre parenthèses les champs qui vont recevoir une donnée
- `VALUES(...)` on liste les valeurs qu'on veut insérer. Comme dit précédemment **on ne doit jamais concaténer une requête SQL avec des données externes**, c'est pour ça qu'on utilise des placeholders, ces clefs précédées de deux-points `:`

> **Point important :** l'ordre des champs dans la première parenthèses doit être identique à celui dans la deuxième parenthèse, sinon vous ne mettrez pas les valeurs dans les bons champs. Au final, ça nous donne ceci :

```php
// Requête pour envoyer un message :
  $insertionMessageRequete = "
    INSERT INTO message(nom, prenom, contenu, email, type, date_creation)
    VALUES (:nom, :prenom, :contenu, :email, :type, :date)
  ";

  // On prépare la requête
  $messageCommande = $clientMySQL->prepare($insertionMessageRequete);

  // On exécute la commande et on place nos valeurs avec les mêmes clefs que définies dans la méthode "VALUES" de notre requête
  $messageCommande->execute([
            'nom' => "",
            'prenom' => "",
            'contenu' => "",
            // ...
        ]);
```

> **Attention :** Pensez toujours à nettoyer des données avant de les envoyer en base. Utilisez la fonction `htmlentities()` sur les variables que vous allez entrer en base pour vous prévenir d'un éventuel piratage de votre site.

Le code ci-dessus est déjà présent dans le fichier `contact.php`, toutefois il reste à le compléter.

## Éditez vos données

Parfois (souvent même), vous devrez mettre à un jour un élément dans la base de données, c'est là qu'entre en jeu le mot-clé `UPDATE`. 
Il est toujours préférable de l'utiliser avec le mot-clé `WHERE`, en absence de ce dernier, vous mettrez à jour toute la table sélectionnée et ce n'est pas forcément ce que vous souhaitez faire.

```sql
UPDATE auteur
SET nom = :nom, prenom = :prenom, avatar = :avatar
WHERE id = :id;
```

- `UPDATE auteur` : le mot-clé permet d'indiquer que nous allons mettre à jour la table "auteur"
- `SET` : la syntaxe ressemble plus ou moins à ce qu'on a vu avec notre `SELECT ... WHERE` sauf qu'on a plus de clef. On liste juste l'ensemble des champs que l'on souhaite mettre à jour, il est donc possible de modifier qu'un seul champ
- `WHERE` : on indique quel élément doit être modifié. Pour rappel, en absence du `WHERE` dans ce contexte, **vous modifierez toute la table**

> **Attention :**  Sauf cas très, très spécifiques, vous ne devrez jamais mettre à jour la valeur du champ "id"

Maintenant le code PHP (ici on met à jour un auteur)

```php
$majAuteurCommande = $clientMySQL->prepare("
    UPDATE auteur
    SET nom = :nom, prenom = :prenom, avatar = :avatar
    WHERE id = :id
");

$majAuteurCommande->execute([
    "nom" => htmlentities($_POST["nom"]),
    "prenom" => htmlentities($_POST["prenom"]),
    "avatar" => htmlentities($_POST["avatar"]),
    "id" => $_POST["id"]
]);
```

Rien de bien nouveau dans ce code. On récupère les valeurs du formulaire pour ensuite envoyer à la base de données. Comme pour `INSERT INTO`, on n'oublie pas de sécuriser les données avec la fonction `htmlentities()`.

Ici la valeur pour le champ "id" provient d'un champ caché dont la valeur (attribut "value") est égale à valeur du paramètre d'url "id".

Ce code est issu du fichier `administration/auteurs/edition.php`, il est incomplet, vous devez le compléter.

## En résumé

- `INSERT INTO ... VALUES ...` : ajout d'une nouvelle entrée
- `UPDATE ... WHERE ...` : modification d'une ou plusieurs entrées
  - On ne met jamais à jour la valeur de l'id
- `SELECT` : Sélection d'éléments
  - `WHERE` : permet de filter selon un critère


Voilà, c'est terminé, nous avons vu dans les grandes lignes les requêtes SQL que vous devez utiliser pour réaliser la SAÉ, ces connaissances vous servirons également pour vos autres projets. 


