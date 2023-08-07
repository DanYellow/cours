# Mémo composants/classes

Dans le but de vous aider à mieux retenir le rôle des différents composants que nous avons vu jusqu'à présent, voici un document qui résume leur rôle. A noter tout de même que ce document n'est pas exhaustif et vise à mettre en lumière les points clés de ces composants. Nous vous invitons toujours à vous aider de la documentation si vous avez besoin de plus d'informations et d'exemples.

# GameObject

Objet de base de tous les éléments dans une scène Unity, le GameObject est la classe que vous utiliserez le plus. De conteneur des sprites de votre joueur à l'affichage des points de vie. Le GameObject est indispensable.
Un GameObject est toujours embarqué avec le composant `Transform`, ce dernier gère la Position, la Rotation et l'Échelle d'un objet, pour éviter tout comportement inattendu, pensez toujours à réinitialiser (Reset) un Gameobject après avoir ajouté à votre scène, ça vous assure qu'il part de l'origine de votre scène ou de son parent.

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
        target.position = Vector3.Lerp(target.transform.position, destination, 0.5f * Time.deltaTime);
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
        target.position = Vector3.Lerp(target.transform.position, destination, 0.5f * Time.deltaTime);
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

# Transform
Composant par défaut de tout GameObject, **le composant `Transform` ne peut pas être retiré d'un GameObject**. Il représente les composantes : Position,Rotation et Échelle d'un objet

> Pour éviter d'avoir de mauvaises surprises, pensez toujours à réinitialiser (Reset) un Gameobject après avoir ajouté à votre scène.

La position d'un GameObject existe dans deux repères un dit "global" (appelé "world" par Unity) et un autre "local". Les deux sont égaux lorsqu'un GameObject est à la racine de la hiérarchie d'une scène, ceci a son importance lorsqu'un GameObject est imbriqué. En effet, lorsque c'est le cas, Unity ne calcule plus la position du GameObject par rapport à l'origine de la scène mais par rapport à l'origine de son parent direct. Ainsi, c'est la position locale qui est affichée dans l'inspecteur.
![](./printscreens/memo-layer-collision-matrix.jpg)

De ce fait, il existe les propriétés `localPosition` et `position`, la première représant la position local et l'autre globale. Ce raisonnement reste le même pour la rotation et l'échelle d'un GameObject.

Enfin sachez qu'il existe des méthodes pour convertir une position d'un espace à un autre (local/world)
 
# Rigidbody2D
Utilisable uniquement dans un environnement 2D, le composant Rigidbody2D soumet un GameObject au moteur physique d'Unity. Ainsi tout GameObject avec un Rigidbody2D possèdera une masse et sera donc attiré par la gravité. Ainsi, en absence de `Collider2D` un GameObject avec un Rigidbody2D fera une chute infinie. Avoir des notions de physique de base aide à mieux comprendre le comportement d'un Rigidbody2D.

Ce composant fonctionne souvent de pair avec un `Collider2D`, donc si vous mettez un `Rigidbody2D` n'oubliez pas le `Collider2D` sur le même composant. Sinon, ça ne sert plus ou moins à rien.

Unity propose trois types de comportements pour la physique d'un élément sous la propriété `bodyType` :
- Dynamic : Valeur par défaut. L'élément est soumis à la gravité et est affecté par les mouvements des autres. Ainsi deux GameObjects avec un Rigidbody2D Dynamic peuvent se pousser mutuellement si leur masse leur permet. Un Rigidbody2D Dynamic peut se déplacer.
- Kinematic : N'est pas soumis à la gravité ni aux forces externes (impossibilité d'être poussé). Toutefois il peut se déplacer via les propriétés `velocity` ou `angularVelocity`. Cette valeur est souvent utilisée pour réaliser des plateformes mouvantes ou tout simplement un ascenseur. Notez bien qu'un Rigidbody2D Kinematic ne peut pas interagir avec un Rigidbody2D Static ou Rigidbody2D Kinematic. Autrement dit, il les traversera
- Static : Dernière valeur possible : Static. Comme son nom l'indique, un Rigidbody2D Static a pour but de rester statique. Il n'a pas été pensé pour être déplacé. Si c'est le cas, il est préférable de changer son bodyType avant de revenir à la valeur Static

Dans certains cas, il se peut que votre Rigidbody2D (avec un Collider2D) traverse des éléments alors que ce n'est pas prévu. Ceci est lié à la valeur de la propriété "collisionDetectionMode" ("Collison Detection" dans l'inspecteur), par défaut, la valeur est "Discrete" pour des questions de performances. Mais il est préférable de changer la valeur en "Continuous" pour votre joueur.

En bref, on appliquera un `Rigidbody2D` à un GameObject lorsqu'on souhaite qu'un objet soit soumis à la physique.

Pour terminer, abordons les propriétés `gravityScale` et `mass` de la classe `Rigidbody2D`. D'abord, la propriété `mass`, représentant la masse d'un GameObject, n'a aucune incidence sur son attraction par la gravité. La seule incidence qu'il porte est sur sa capacité à être déplacé par une force.

La propriété `gravityScale` définit à quel point un objet sera attiré par la gravité. **Plus cette valeur est élevée, plus le GameObject atterrira rapidement.** Par exemple, si vous souhaitez faire un jeu de tir avec la caméra au-dessus, il faudra mettre la valeur 0 pour la propriété `gravityScale`, ainsi votre GameObject ne tombera jamais.

# Collider2D

Composant souvent lié à un Rigidbody2D, Unity propose plusieurs types de `Collider2D`, la différence se trouve au niveau de leur forme. Ainsi un `Collider2D` peut être un carré, un cercle ou même un polygone. Cependant leur fonctionnement reste le même : permettre à un objet 2D d'exister auprès d'autres GameObject.

Un `Collider2D` peut être un solide ou non, le cas échéant, on dira que c'est un "trigger". De fait, un autre GameObject peut rentrer dedans.

> Point important : un `Collider2D` ne peut pas interagir avec un autre GameObject qui ne possède pas de Rigidbody2D. Par exemple, si vous souhaitez que votre joueur puisse ramasser des pièces. Il faut mettre un `Collider2D` sur votre pièce, et un `Collider2D` **et** un Rigidbody2D.

Trigger ou non, un `Collider2D` possède trois états :
- Enter : Un GameObject vient de rentrer ou on lui entre dedans
- Exit : Un GameObject sort ou quelque chose en est sorti
- Stay : Un GameObject est en contact avec un autre ou est dans quelque chose

Dépendamment de votre choix (Trigger ou non), ce ne sont pas les mêmes évènements qui seront appelés. Si c'est un trigger, ce sont les méthodes de la famille `OnTriggerEnter2D`, `OnTriggerExit2D` et `OnTriggerStay2D` qu'il faudra utiliser. Si ce n'est pas un trigger, il faudra utiliser les méthodes `OnCollisionEnter2D`, `OnCollisionExit2D` et `OnCollisionStay2D`.

# C# Script

Composant écrit par vos soins, un `C# Script` est un composant vierge, par défaut. Son comportement sera défini par vos soins. Pour des questions d'organisation, il est préférable de mettre vos scripts dans un dossier "Scripts/" lui-même dans le dossier "Assets/".

Le même `C# Script` peut être appliqué sur n'importe quel GameObject. En interne, Unity crée une instance de ce `C# Script` comme nous le ferions avec un autre langage de programmation.

Par défaut, un `C# Script` hérite de la classe `MonoBehaviour`, c'est ce qui nous permet notamment de faire appel aux méthodes `Start()`, `Update()` ou encore `OnCollisionExit2D()`.

> Seul un `C# Script` héritant de `MonoBehaviour` peut être ajouté à un GameObject. Mais il est possible qu'un `C# Script - MonoBehaviour` fasse appel à des classes non `MonoBehaviour`.

Pour plus d'informations sur `C# Script`, veuillez vous référer au document d'introduction sur Unity.
- [Accéder au document](./README.md)

# Animator

A noter qu'il n'existe pas chemins entre les fichiers comment en HTML. Ainsi, si vous avez crée des sous-dossiers dans votre dossier "Scripts/", il 