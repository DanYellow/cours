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

##### Première étape : création de notre requête.

```php
$requete_brute = 'SELECT * FROM article';
```
On définit sous forme d'une chaîne de caractères notre requête. Ici nous souhaitons récupérer tous les éléments de la table "article".

##### Deuxième étape : exécution de notre requête + récupération des données

Ensuite, il nous faut exécuter la requête avec la fonction `mysqli_query()`. Elle prend deux paramètres au minimum (dans l'ordre), la connexion à la base de données et la requête sous forme de chaîne de caractères (on en a une déjà, la variable `$requete_brute`). Pour la connexion à la base de données, il s'agit de la réponse de la fonction `mysqli_connect()`. Si on exécute notre fonction `mysqli_query()`, nous aurons le code suivant :

```php
$resultat_brut = mysqli_query($mysqli_connexion, $requete_brute);
```
La requête a été exécutée, mais malheureusement, on ne peut rien faire avec. La variable `$resultat_brut` ne contient que des résultats bruts, pour afficher le contenu de la table "article", il faudra utiliser la fonction `mysqli_fetch_array()` qui prend en paramètre obligatoire le résultat de la fonction `mysqli_query()`. Elle retourne un tableau ou un tableau de tableaux, dépendamment du nombre de résultats.

```php
$resultat = mysqli_fetch_array($resultat_brut);
```

Notre variable `$resultat` contient un tableau, et ce même tableau contient des tableaux qui ont chacun la structure suivante :

```php
  array(
    "id" => "valeur",
    "titre" => "valeur",
    "chapo" => "valeur",
    "image" => "valeur",
    "..."
  )
```

Vu que `$resultat` est un tableau, nous pouvons itérer dedans comme suit :

```php
  while ($article = mysqli_fetch_array($resultat_brut)) {
    // On affiche le titre + chapo de chaque article un à un
    echo "{$article['titre']} {$article['chapo']}";
    // ...
  }
```

Vous trouvez cet exemple au complet dans le fichier `index.php` et une adaptation dans le fichier `administration/auteurs/index.php`. Pour lister les articles ainsi que les messages dans le backoffice, il faudra donc adapter ce code.

###### Sélectionner avec plus de précision

On a vu plus haut que la requête `SELECT * FROM article` nous permettait de sélectionner tous les éléments contenu dans une table. Sachez qu'il est possible d'apporter plus de précisions dans notre sélection via d'autres mots-clés, il y en a plein d'autres qu'on peut utiliser dans un `SELECT`, mais nous allons nous intéresser au mot-clé `WHERE`. Ce dernier nous permet de sélectionner un élément sur la valeur d'un champ. Par exemple : _Essayons de récupérer un élément ayant la valeur 42 pour le champ id dans la table article_.

```php
$id = 42;
$requete_brute = "SELECT * FROM article WHERE article.id = $id";

$resultat_brut = mysqli_query($mysqli_connexion, $requete_brute);
$article = mysqli_fetch_array($resultat_brut);
```

Analysons le code ligne par ligne.

```php
$id = 42;
$requete_brute = "SELECT * FROM article WHERE article.id = $id";
```

Notre requête reste identique comparé au premier exemple, nous avons juste rajouté le `WHERE` et précisé quel champ nous allons effectuer le filtre et la valeur que nous souhaitons pour la colonne `id`, dans notre cas "42". Généralement la valeur provient de l'URL de la page. On pourrait s'imaginer que notre 42 soit remplacé par `$_GET["id"]`, on récupèrerait donc le paramètre "id" de l'URL.

Pour des questions de sécurité, il est toujours préférable de s'assurer que la valeur passée en paramètre soit correcte. Nous verrons plus tard au cours du cursus d'autres méthodes plus sécuritaires pour effectuer ce genre de requêtes.

> Attention, le langage php ne peut pas interpéter une variable si elle est entre guillemets simples, ainsi, écrire `'SELECT * FROM article WHERE article.id = $id'` engendrera un bug. **Il faut mettre des guillemets doubles.**


```php
$resultat_brut = mysqli_query($mysqli_connexion, $requete_brute);
$article = mysqli_fetch_array($resultat_brut);
```

Ensuite, nous exécutons notre requête, récupérons le résultat brute et le transformons grâce à la fonction `mysqli_fetch_array()`, vu que la requête ne retourne qu'un résultat, la variable `$article` ne contiendra qu'un tableau associatif (appelé aussi dictionnaire).

> Note : Si la requête ne retourne rien, `mysqli_fetch_array()` retournera "NULL". Il faut donc prévenir ce cas dans votre code, un exemple est déjà présent dans les fichiers `administration/auteurs/edition.php` et `administration/squelette/edition.php`

La requête `SELECT * FROM article WHERE id = :id` nous sera utile pour afficher le détail d'un article ou encore pré-remplir le formulaire nous permettant d'éditer un article avec les données existantes.

Notez également que si vous souhaitez sélectionner sur plusieurs champs, il faudra utiliser le mot-clé `AND`, par exemple :
```sql
SELECT * FROM article WHERE id = :id AND titre = :titre
```
Dans ce code ci-dessus, on cherche un article avec une valeur spécifique pour le champ `id` **et** une valeur spécifique pour le champ `titre`. Et si vous souhaitez qu'une des deux conditions soit remplie, il faudra remplacer `AND` par `OR`.

> Notez que MySQL sera toujours plus performant sur les requêtes où on recherche par clé primaire.

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
- `VALUES(...)` on liste les valeurs qu'on veut insérer.
**Si votre colonne est de type "TEXT" ou "VARCHAR()", il faudra mettre chaque valeur, même si ce sont des variables, entre guillemets.**

> **Point important :** l'ordre des champs dans la première parenthèses doit être identique à celui dans la deuxième parenthèse, sinon vous ne mettrez pas les valeurs dans les bons champs. Au final, ça nous donne ceci :

```php
// Code php pour ajouter un message dans la table "message" :
  $insertion_requete_brute = "
    INSERT INTO message(nom, prenom, contenu, email, type, date_creation)
    VALUES ('$nom', '$prenom', '$message', '$email', '$type', '$date')
  ";

  // On exécute la requête
  $resultat_brut = mysqli_query($mysqli_link, $insertion_requete_brute);
```

> **Attention :** Pensez toujours à nettoyer des données avant de les envoyer en base. Utilisez la fonction `htmlentities()` sur les variables que vous allez entrer en base pour vous prévenir d'un éventuel piratage de votre site.

Le code ci-dessus est déjà présent et fonctionnel dans le fichier `contact.php`.

## Éditez vos données

Parfois (souvent même), vous devrez mettre à un jour un élément déjà présent dans la base de données, c'est là qu'entre en jeu le mot-clé `UPDATE`.
Il est toujours préférable de l'utiliser avec le mot-clé `WHERE`, en absence de ce dernier, vous mettrez à jour toute la table sélectionnée et ce n'est pas forcément ce que vous souhaitez faire.

```sql
UPDATE auteur
SET nom = :nom, prenom = :prenom, avatar = :avatar
WHERE id = :id;
```

- `UPDATE auteur` : le mot-clé permet d'indiquer que nous allons mettre à jour la table "auteur"
- `SET` : on liste l'ensemble des champs que l'on souhaite mettre à jour, il est donc possible de mettre à jour qu'un seul champ
- `WHERE` : on indique quel élément doit être modifié. Pour rappel, en absence du `WHERE` dans ce contexte, **vous modifierez toute la table**

> **Attention :**  Sauf cas très, très spécifiques, vous ne devrez jamais mettre à jour la valeur du champ "id"

Maintenant le code PHP (ici on met à jour un auteur)

```php
$nom = htmlentities($_POST["nom"]);
$prenom = htmlentities($_POST["prenom"]);
$avatar = htmlentities($_POST["avatar"]);
$id =  $_POST["id"];

$maj_requete_brute = "
    UPDATE auteur
    SET nom = '$nom', prenom = '$prenom', avatar = '$avatar'
    WHERE id = $id
";

// On exécute la requête
$resultat_brut = mysqli_query($mysqli_link, $insertion_requete_brute);
```

Rien de bien nouveau dans ce code. On récupère les valeurs du formulaire pour ensuite envoyer à la base de données. Comme pour `INSERT INTO`, on n'oublie pas de sécuriser les données avec la fonction `htmlentities()`.

Ici la valeur pour le champ "id" provient d'un champ caché dont la valeur (attribut "value") est égale à valeur du paramètre d'url "id".

Ce code est issu du fichier `administration/auteurs/edition.php`, il est incomplet, vous devez le compléter.

## Associer des tables

Dans certains cas, il est possible que vous ayez besoin des données de plus d'une table à la fois. Dans ce cas, il faudra utiliser des jointures.
> Note : il existe plusieurs types de jointures, mais nous aurons besoin que d'un seul type de jointure dans la SAE (`LEFT JOIN`).

La jointure `LEFT JOIN` permet de récupérer tous les résultats de la table de gauche (`LEFT`) pour les faire correspondre à ceux d'une autre table si les conditions sont remplies. Une requête de type `LEFT JOIN` se présente de la façon suivante :

```php
$jointure_requete_brute = "
    SELECT * FROM article
    LEFT JOIN auteur
    ON article.auteur_id = auteur.id;
";
```
Dans la requête ci-dessus, nous recherchons tous les éléments de la table `article` et associons à chacun des résultat son auteur (table `auteur`) grâce à la colonne `auteur_id` pour la table `article` et la colonne `id` pour la table `auteur`. De ce fait, nous aurons comme résultat, pour chaque entrée du tableau, le résultat suivant (en ayant bien évidemment exécuté la requête avant) :
```php
  array(
    "id" => "valeur",
    "titre" => "valeur",
    "chapo" => "valeur",
    "image" => "valeur",
    "...",
    "nom" => "valeur",
    "prenom" => "valeur",
    "...",
  );
```
A noter qu'il est possible de définir des alias pour chacune des colonnes pour éviter des conflits de noms. Vous trouverez un exemple de `LEFT JOIN` ainsi que d'alias de nom dans le fichier `administration/articles/index.php`.

Il est possible de remplacer `LEFT JOIN` par de multiples requêtes. Toutefois la jointure est plus lisible et peut être plus performante dans certains cas.

Pour terminer, notez qu'il est possible d'utiliser le mot-clé `WHERE` dans une jointure. Exemple :
```sql
SELECT * FROM article
LEFT JOIN auteur
ON article.auteur_id = auteur.id
WHERE article.id = :id
```

> - [En savoir plus sur les jointures MySQL - français](https://aymeric-auberton.fr/academie/mysql/jointure)

## En résumé

- `INSERT INTO ... VALUES ...` : ajout d'une nouvelle entrée
- `UPDATE ... WHERE ...` : modification d'une ou plusieurs entrées
  - On ne met jamais à jour la valeur de l'id
- `SELECT` : Sélection d'éléments
  - `WHERE` : permet de filter selon un critère
- `LEFT JOIN` : Association de plusieurs tables


Voilà, c'est terminé, nous avons vu dans les grandes lignes les requêtes SQL que vous devez utiliser pour réaliser la SAÉ, ces connaissances vous servirons également pour vos autres projets.
