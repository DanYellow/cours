# Base de données et requêtes

Jusqu'à présent, vous avez pu manipuler des bases de données dites "relationelles" avec des outils comme MySQL. Néanmoins, il faudt savoir qu'il existe d'autres systèmes de gestion de base de données comme celles dites "NoSQL".

NoSQL pour "Not only SQL" (« pas seulement SQL » en anglais) désigne un système de gestion de base de données où les données sont stockées non pas dans une table mais dans des documents, une sorte de fichier lui-même contenu dans une collection qu'on peut assimiler à un dossier. Les données sont très peu structurées d'où le nom "NoSQL".

Les systèmes NoSQL, comparés aux SGBDR, possèdent l'avantage de pouvoir gérer des millions d'entités sans problèmes là un système de gestion de bases de données relationnelle (SGBDR) montrerait des faiblesses. De plus, en NoSQL, il est possible, à la volée de changer le schéma de données, ce qui vous permet de définir le modèle de données au fur et à mesure. Enfin, le NoSQL s'avère bien plus performant que les SGBDR pour la montée en charge. Avec MySQL, par exemple, si vous avez un gros traffic, il vous faudra un plus gros serveur, donc vous coûtera plus cher. Alors qu'en NoSQL la montée en charge se gère en ajoutant de nouveaux serveurs, bien moins chers.

Ces avantages ne se font pas sans concessions, premièrement en NoSQL, il n'y a pas de notion d'id, ce qui rend certaines requêtes complexes impossible, faire des imbrications de clauses `WHERE` peut provoquer de gros problèmes de performances. 

- [En savoir plus sur le NoSQL](https://www.oracle.com/fr/database/nosql/what-is-nosql)

Dans le cadre de la SAÉ 501, nous avons fait le choix d'utiliser MongoDB, il faudra l'installer.
- [Télécharger MongoDB](https://www.mongodb.com/try/download/community)

Et pour voir votre base NoSQL, un peu comme PhpMyAdmin, nous vous conseillons le logicie aussi gratuit MongoDB Compass
- [Télécharger MongoDB Compass](https://www.mongodb.com/try/download/compass)
    - Il faut télécharger "MongoDB Compass Download (GUI)", il faut défiler un peu


MongoDB est un standard dans le monde professionnel. Le projet contient quatre collections que voici :

![](./CollectionsDiagram.svg)

Dans ce schéma, il n'y a que trois collections, la quatrième concerne les messages envoyés depuis la page "contact", c'est à vous de la faire, les champs dépendront des besoins du projet.

Une collection contient des schémas, ces schémas ont une sytaxe proche de ce que vous avez vu en MySQL avec un ensemble de champs de divers type. Les différences résident dans la présence du champ "_id" qui remplace "id" en MySQL, ici "_id" n'est pas un nombre qui s'incrémente à chaque nouvelle entrée mais une chaîne de caractères aléatoires qui sert de clé primaire, donc plus performante pour faire une recherche dans une collection. Le champ "__v" quant à lui sert à garder une trace de la version de votre document. Un document étant un "enfant" d'un schéma.

Avec la SAÉ 501, nous allons manipuler MongoDB à travers [Mongoose](https://github.com/Automattic/mongoose), c'est un ORM (Object Relation Mapper), autrement dit un outil qui nous permet de manipuler notre base de données NoSQL à travers des objets, donc plus facilement compréhensible. Le concept des ORM n'est pas propre à MongoDB, il en existe en NoSQL et en SGBDR.

Voilà à quoi ressemble un Schéma avec Mongoose :

```js
// Importation de mongoose
import mongoose, { Schema } from "mongoose";

// Création d'un schéma, le type est indispensable pour chaque champ
// Mongoose gère les champs suivants : https://mongoosejs.com/docs/schematypes.html
const saeSchema = new Schema({
  title: String,
  content: String,
  image: String,
});

// Transformation de notre schéma en Model, classe exploitable pour créer des documents
// Note : "SAE" correspond au nom de la collection dans MongoDB, ce nom sera toujours mis en majuscule et au pluriel 
export default mongoose.model("SAE", saeSchema);
```

Voici la version simplifiée du schéma d'une SAE dans le projet, dans le fichier original (code/database/models/sae.js) il y a également des règles de validation, très simples à comprendre.

Une fois notre modèle défini, nous pouvons l'instancier pour créer des documents de type SAE dans notre projet. Exemple : 

```js
import SAE from './models/sae.js';

const createSAE = async () => {
    // Contient les données sous forme d'un objet
    const payload = {}
    // On prépare un document de type SAE
    const ressource = new SAE(payload);

    // On crée notre document, l'action est asychrone d'où la présence obligatoire du mot-clé "await"
    await ressource.save().then(() => {
        // Ça s'est bien passé
    })
    .catch((err) => {
        // Ça s'est mal passé
    })
}
```
Ce code simplifié issu du fichier "code/server/api-router/sae.js" nous permet de créer une SAE dans la collection associée (saes).

Ainsi à partir des exemples déjà présents, vous devrez créer la collection "messages" permettant de sauvegarder les messages crées depuis le formulaire de contact.

# Requêtes
Pour créer ces messages, il faudra créer des routes. Le projet respecte la philosophie du CRUD (Create, Read, Update, Delete), conséquemment, dépendamment des besoins, il y a une route permettant de créer, récupérer, mettre à jour et supprimer un document. La gestion de requêtes des composées de deux parties :
- API : Réalisée avec axios. Appelée par les pages et pour supprimer un document
    - Toutes les routes commencent par "/api" suivi du nom de la collection. Ex : "api/saes"
- Templates : Appellent l'API pour afficher le contenu des pages

Exemple :

```js
// api.js - version simplifiée
router.get(`/saes`, async (req, res) => {
    // Récupère tous les documents de la collection "saes"
    const listRessources = await SAE.find()
        .orFail()
        .catch(() => {
            return {};
        });

    // Retourne un objet JSON contenant nos
    return res.status(200).json({
        data: listRessources,
    })
});

// template.js
router.get(`/saes`, async (req, res) => {
    let options = {
        method: "GET",
        url: `http://localhost:3000/api/saes`,
    }

    let result = null
    try {
        // Fait une requête vers l'API pour ensuite injecter le résultat dans un template twig
        result = await axios(options);
    } catch (e) {}
    
    res.render("pages/back-end/saes/list.twig", {
        list_saes: result.data,
    });
});
```

Les requêtes d'API du projet sont testables grâce au logiciel gratuit Postman, une collection de requêtes sont présentes dans le fichier "SAE501.postman_collection.json". Vous en saurez plus sur l'utilisation de Postman avec les explications associées.
- [Voir explications sur l'utilisation de Postman](./POSTMAN.md)

De plus, le projet intégre un Swagger qui liste toutes les api du projet, il est accessible uniquement avec le serveur de développement via /api-docs