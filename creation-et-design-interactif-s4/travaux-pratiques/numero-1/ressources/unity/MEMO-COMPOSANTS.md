# Mémo composants/classes

Dans le but de vous aider à mieux retenir le rôle des différents composants que nous avons exploré, voici un document qui résume leur rôle. A noter tout de même que ce document n'est pas exhaustif et vise à mettre en lumière les points clés de ces composants. Nous vous invitons toujours à vous aider de la documentation si vous avez besoin de plus d'informations.

# GameObject

Objet de base de tous les éléments dans une scène Unity, le GameObject est la classe que vous utiliserez le plus. De conteneur des sprites de votre joueur à l'affichage des points de vie. Le GameObject est indispensable.
Un GameObject est toujours embarqué avec le composant `Transform`, ce dernier gère la Position, la Rotation et l'Échelle d'un objet, pour éviter d'avoir de mauvaises surprise pensez toujours à réinitialiser (Reset) un Gameobject après avoir ajouté à votre scène, ça vous assure qu'il part de l'origine de votre scène ou de son parent.

En effet, il est possible d'imbriquer un GameObject dans un autre, un peu comme vous le feriez dans Photoshop avec le système de groupes. Ce système possède plusieurs rôles :

- Permettre à des GameObject de se déplacer ensemble. Par exemple, un objet lié au joueur
- Servir de "dossiers" pour grouper plusieurs GameObjects et donc organiser votre scène. En effet, un GameObject ne peut contenir qu'un seul composant : Transform

En plus de pouvoir changer son nom, il est possible de changer le tag ainsi que le calque (layer) d'un GameObject.

## Tag

Un tag permet de récupérer un GameObject depuis n'importe quel Script. Par défaut, un GameObject n'a pas de tag, vous devez le définir via la fenêtre `Inspector`. Généralement on associera le tag "Player" aux joueurs et "Enemy" aux ennemis. Bien évidemment, vous pouvez en ajouter de nouveaux.

A noter qu'il est préférable de chercher un GameObject par tag que par son nom pour des questions de performances. De plus, toujours pour des questions de performances, il est préférable de cacher le résultat de cette opération.

Exemple :

```c#
// [...]
// Bonne pratique : Le résultat de FindWithTag() est caché dans une variable
public class ExampleClass : MonoBehaviour
{
    public GameObject target;
    public Vector3 destination;
    
    void Start()
    {
        target = GameObject.FindWithTag("MyTag");
        // [...]
    }

    void Update()
    {
        target = Vector3.Lerp(target.transform.position, destination, 0.5f * Time.deltaTime);
    }
}
// ---------------
// [...]
// Mauvaise pratique : Le résultat de FindWithTag() calculé régulièrement
public class ExampleClass : MonoBehaviour
{
    public GameObject target;
    public Vector3 destination;

    void Update()
    {
        target = GameObject.FindWithTag("MyTag");
        target = Vector3.Lerp(target.transform.position, destination, 0.5f * Time.deltaTime);
    }
}
```

Par ailleurs, vous comparerez souvent le tag d'un GameObject avec un tag attendu, là encore, pour des question de performances, il faudra penser à utiliser la méthode `CompareTag()` plutôt qu'une égalité stricte `==`. 

Exemple :
```c#
// Bonne pratique : on utilise la méthode CompareTag()
private void OnCollisionEnter2D(Collision2D other)
{
    if (other.gameObject.CompareTag("Player"))
    {
        // Code
    }
}

// Mauvaise pratique : on utilise l'égalité stricte
private void OnCollisionEnter2D(Collision2D other)
{
    if (other.gameObject.tag == "Player")
    {
        // Code
    }
}
```
> Notez bien que la méthode `CompareTag()` est sensible à la case, conséquemment "Player" et "player" sont deux termes différents pour la méthodes. Faites attention.

## Layer (ou calque en français)
Les layers définissent les interactions entre les GameObjects de votre scène. Tout comme les tags, un GameObject ne peut avoir qu'un seul et un unique layer et est interchangeable aussi bien via le code ou le panneau `Inspector`. Et vous pouvez en ajouter de nouveaux dans la limite de 32 au maximum (2^32).

Les interactions peuvent être de plusieurs ordres. Par exemple, durant nos cours, nous avons défini ce qui est ou non grâce aux layers.

De plus, ils permettent de finir des "groupes" physique de GameObjects. Par exemple, si vous ne souhaitez pas que des ennemis ne puissent pas se gêner en se déplacement, il faudra les mettre dans le même layer puis indiquer à Unity qu'au sein de ce layer les éléments peuvent se traverser. Ceci se fait grâce à la matrice de collision qui se trouve dans le menu `Edit > Project Settings` puis panneau `Physics 2D` et onglet `Layer collision matrix`.

![](./printscreens/memo-layer-collision-matrix.jpg)
Dans l'exemple ci-dessus, on peut voir que la case est décochée à l'intersection du layer "Enemies". Par conséquent, Unity ignorera les collisions entre tous les GameObjects de ce layer.

Ce mécanisme est très utile si vous souhaitez rendre invincible votre joueur durant quelques instants pour lui permettre de traverser certains layers.

Enfin sachez que les layers sont utilisés notamment avec les Raycasts pour définir avec quoi vous pouvez interagir.
 
# Rigidbody2D
Utilisable uniquement dans un environnement 2D, le composant Rigidbody2D met un GameObject sous contrôle du moteur physique d'Unity. Ainsi tout GameObject avec un Rigidbody2D possèdera une masse et sera donc attiré par la gravité. Ainsi, en absence de `Collider2D` un GameObject avec un Rigidbody2D fera une chute infinie. Avoir des notions de physique de base aide à mieux comprendre le comportement d'un Rigidbody2D.

Ce composant fonctionne souvent de pair avec un `Collider2D`, donc si vous mettez un `Rigidbody2D` n'oubliez pas le `Collider2D` sur le même composant. Sinon, ça ne sert plus ou moins à rien.

Unity propose trois types de comportements pour la physique d'un élément sous la propriété `bodyType` :
- Dynamic : Valeur par défaut. L'élément est soumis à la gravité et est affecté par les mouvements des autres. Ainsi deux GameObjects avec un Rigidbody2D Dynamic peuvent se pousser mutuellement si leur masse leur permet. Un Rigidbody2D Dynamic peut se déplacer.
- Kinematic : N'est pas soumis à la gravité. Toutefois il peut se déplacer via les propriétés `velocity` ou `angularVelocity`. Cette valeur est souvent utilisée pour réaliser des plateformes mouvantes ou tout simplement un ascenseur. Notez bien qu'un Rigidbody2D Kinematic ne peut pas interagir avec un Rigidbody2D Static ou Rigidbody2D Kinematic. Autrement dit, il les traversera
- Static : Dernière valeur possible : Static. Comme son nom l'indique, un Rigidbody2D Static a pour but de rester statique. Il n'a pas été pensé pour être déplacé. Si c'est le cas, il est préférable de changer son bodyType avant de revenir à la valeur Static

Dans certains cas, il se peut que votre Rigidbody2D (avec un Collider2D) traverse des éléments alors que ce n'est pas prévu. Ceci est lié à la valeur de la propriété "collisionDetectionMode" ("Collison Detection" dans l'inspecteur), par défaut, la valeur est "Discrete" pour des questions de performances. Mais il est préférable de changer la valeur en "Continuous" pour votre joueur.