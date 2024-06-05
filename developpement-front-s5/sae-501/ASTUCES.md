# Astuces

Pour vous aider à mener à bien, le projet intègre des outils dont l'utilisation est facultative. Toutefois, nous vous invitons à lire attentivement ce document.

Ce document n'abordera pas l'utilisation de POSTMAN, vu qu'il y a un document dédié à son utilisation. [Accéder au document de présentation de POSTMAN](./POSTMAN.md).

## Swagger

En complément de Postman, le projet intégère également Swagger, appelé également  OpenAPI. C'est un outil permettant la documentation d'API via une syntaxe propre à l'outil. Vous pourrez trouver des exemples d'utilisation dans les fichiers du dossier `/server/api`. 

Comme Postman, Swagger permet de tester les points d'accès de votre API en effectuant de réelles requêtes. Dans le projet, le Swagger est accessible via la routes `/swagger` ou depuis l'administration dans la partie "debug". Partie "debug" visible uniquement en mode "développement".

## Middleware

Le middleware est un concept clé d'express. Toutefois, le middleware n'est pas propre à express, il existe dans l'informatique en général. C'est un logiciel qui se place entre différentes applications qui leur permettre une meilleure interopérabilité.

Express est fondé sur le concept des middlewares, "une application Express n’est ni plus ni moins qu’une succession d’appels de fonctions middleware". Observons le code suivant :

```js
router.delete('/articles/:id', (req, res, next) => {
   res.send(`Je suis le texte d'un middleware`);
});
```
Dans le code ci-dessus, la fonction anonyme (avec la signature `(req, res, next)`) est un middleware qui sera appelé quand on effectuera une requête de type DELETE pour l'url `articles/:id` où `:id` est un paramètre dynamique. Lors de l'appel, le middleware fera afficher du texte dans le navigateur, il est possible d'effectuer d'autres actions comme afficher un document JSON, télécharger un fichier ou encore passer des informations au middleware suivant. Exemple :

```js
const myMiddleware = (req, res, next) => {
    console.log("I'm a middleware");
    
    // IMPORTANT : Without the following function, the next middleware will never be called
    // leading to a infinite loop
    next();
}

// Before calling our anonymous middleware, the myMiddleware is called before
router.put('/articles/:id', myMiddleware, (req, res, next) => {
   res.send(`Je suis le texte d'un middleware`);
});
```
A noter qu'on peut placer plusieurs middlewares, il suffit juste de les séparer par des virgules.

Le système des middlewares est très puissant et pratique, vous pourrez en savoir plus en consultant la documentation. [Accéder à la documentation des middlewares](https://expressjs.com/fr/guide/using-middleware.html).

### Middleware "namedRoute"

Aussi pratique puisse être express et son système de route, il possède une lacune assez contraignante : il n'est pas possible de nommer les routes. Fonctionnalité qu'on peut voir dans d'autres frameworks comme Symfony (php) ou Django (Python). Très pratique, elle permet de limiter la duplication de code en écrivant dans les templates non pas le chemin d'URL mais une fonction avec le nom de la route et les paramètres à lui passer.

L'avantage de ce système est que si vous changez vos routes, vous n'avez pas besoin de faire des mises à jour dans vos templates. Le projet intégère un middleware nommé "routeName()" (à importer) qui va vous permettre d'utiliser cette fonctionnalité manquante. Vous pourrez en trouver des exemples dans le fichier `server/front-end-router.js`. Néanmoins, voici un exemple d'utilisation :

```js
import routeName from "#server/utils/name-route.middleware.js";

router.get('/:user/articles/:id', routeName("my_route"), (req, res, next) => {
   /* [...] */
});
```
Dans le code ci-dessus, nous avons nommé notre route "my_route" grâce au middleware `routeName()`. Côté nunjucks, vous avez également une fonction `routeName()` dont la signature est un peu différente comparé au middleware. La fonction prend les paramètres suivants :
- Nom de la route
- Paramètres de la route

Si on souhaite faire un lien vers notre route dans nunjucks, ceci donne le code suivant :
```html
<a href="{{ routeName('my_route', {id: 42, user: 'toto'}) }}">My link</a>
```
La fonction nunjucks transformera le code entre les accolades en "/toto/articles/42". A noter que si vous ajoutez des paramètres supplémentaires qui n'existent pas dans la route, ils seront ajoutés en paramètres query string.

> Note : Le middleware `routeName` a été ajouté pour vous aider, son utilisation est facultative.

> Note 2 : Toutes vos routes ainsi que leur nom sont accessibles dans la route `/debug/router`. Route accessible également via l'admin dans la partie "Debug".