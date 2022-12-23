# ScriptableObjects (abréviation SO)

Un ScriptableObject est un conteneur de données, les données conservées peuvent être de multiples types :
- Primitives : entier (int), chaînes de caractères (string), tableau (array)...
- Complexe : GameObject, Transform, Vector2, Sprite...

L'un des grands avantages des ScriptableObjects est leur limitation en terme d'empreinte dans la mémoire. En effet, ils limitent la copie d'objets là où un objet MonoBehaviour aurait copié toutes les données dont il aurait besoin. Par exemple, admettons que nous souhaitons faire un jeu vidéo avec un marchand proposant des bateaux de combat et donc la structure suivante :
![Alt text](bateaux-SO.jpg)
| **name**        | Trois-mâts | Sous-marin |
|-----------------|---------:|------------|
| **cost**        | 6500     | 7800       |
| **damage**      | 80       | 120        |
| **description** | ...      | ...        |

Est-il besoin que ces deux bateaux stockent au sein de leur propre classe `MonoBehaviour` les dégâts ou leur prix ? Non. Il est plus intéressant de stocker dans un endroit les données et utiliser, en fonction, ces données dans la même classe. Et pour les données, nous allons utiliser un ScriptableObject. Alors oui, nous aurions pu utiliser une classe `Boat` et changer la configuration pour chaque type, mais ça serait fastidieux.

Au-delà de la diminution de l'usage de la mémoire, les ScriptableObjects possèdent les avantages suivants :
- Ils existent dans les Assets. Pas de réinitialisation de valeur si on les modifie (dans le jeu ou l'éditeur) et qu'on arrête le mode "Play"
    - **Néanmoins les ScriptableObjects ne sont pas un moyen de sauvegarder les données du joueur dans un vrai build**
- Limitent le couplage entre les GameObjects. On veut le plus possible limiter le couplage dans le code, ça nous permet d'utiliser un GameObject seul sans en importer d'autres dont on n'en aurait pas besoin 
    - Un exemple souvent utilisé est celui des points de vie du joueur. En utilisant un ScriptableObject pour gérer les points de vie du joueur, des GameObjects peuvent lire la valeur pour s'adapter en fonction : ennemis plus aggressifs, mouvement du joueur plus lents, sont plus rapides... sans pour autant interconnecter tous ces GameObjects
- Simples à utiliser. Dans certains studios, ce sont les game designers qui s'occupent de les créer. Les développeurs les utilisant ensuite dans leur code
- Existent au-delà de la scène. Un ScriptableObject est très utile pour faire passer les informations d'une scène à l'autre de façon propre

> # Pourquoi pas un Singleton ?
> 
> Petit apparté avant de continuer sur les ScriptableObjects, à la lecture de leur description, on pourrait penser qu'un ScriptableObject n'est un _fancy_ Singleton, non ? Les deux permettent de partager des données entre divers classes, oui. Les deux sont uniques au sein d'un projet, oui. Mais les comparaisons s'arrêtent ici. Avec Unity, un Singleton doit impérativement hériter de `Monobehavior` ce qui pose un problème de couplage entre nos GameObjects. Et c'est avant-tout ce problème que nous essayons de résoudre.
> 
> Pour rappel (dans les grandes lignes), un Singleton est une classe qui ne peut être instanciée qu'une seule fois par projet.

Voici un exemple de code

```cs
using UnityEngine;

public class BoatWeaponData : ScriptableObject
{

}
```
Dans le code ci-dessus, la grande différence avec les classes que nous avons faites jusqu'à présent c'est qu'elle hérite de `ScriptableObject`. Pour le reste, ça fonctionne plus ou moins comme avant, on définit des propriétés publiques ou privées ainsi que des méthodes elles aussi à niveau de visibilité variable (private / public). Notez tout de même que les méthodes `Update()` ou `Awake()` ne sont pas utilisables avec un ScriptableObject néanmoins vous pouvez utiliser la méthode `Awake()` ou encore référencer un ScriptableObject dans un autre ScriptableObject.

Sinon, si on reprend le cas de nos armes en ScriptableObject, nous voulons avoir les informations suivantes pour chaque arme :
- damage (int) - dégâts
- cost (int) - prix
- name (string) - nom
- description (string) - description
- sprite (Sprite) - Image

```cs
using UnityEngine;

public class BoatWeaponData : ScriptableObject
{
    public int damage;
    public int cost;
    public string name;
    [Multiline]
    public string description;
    public Sprite sprite;
}
```

Une fois notre ScriptableObject définit, vous pouvez créer autant d'armes que vous le souhaitez. Attention tout de même, le code ci-dessous ne vous permettra pas de créer un ScriptableObject pour le moment car il nous manque l'attribut `CreateAssetMenu()` avant la définition de notre classe. Ce qui nous donne, au final, le code suivant :
```cs
[CreateAssetMenu(fileName = "New BoatWeaponData", menuName = "ScriptableObjects/BoatWeaponData")]
using UnityEngine;

public class BoatWeaponData : ScriptableObject
{
    public int damage;
    public int cost;
    public string name;

    // L'attribut [Multiline] nous permet d'avoir une zone de texte multiligne dans l'inspecteur Unity, un peu comme <textarea> en HTML
    [Multiline] 
    public string description;
    public Sprite sprite;
}
```
Rapide explication sur la ligne de code que nous venons d'ajouter :
- CreateAssetMenu() : Méthode propre à Unity permettant d'ajouter des nouveaux éléments au menu `Assets > Create`. Ici notre ScritableObject
- fileName : Nom par défaut lors de la création du ScriptableObject. Le nom peut être changé
- menuName : Endroit où va se trouver la création de notre ScriptableObject dans le menu `Assets > Create`
    - Notez que ce chemin doit être unique, plusieurs ScriptableObject ne peuvent pas avoir le même chemin

Etant donné qu'un GameObject ne peut pas utiliser un ScriptableObject directement, nous passerons par une classe `Monobehaviour` pour gérer le tout.

> Note : Comme les variables ou les classes, il ne peut pas avoir plusieurs ScriptableObjects avec le même nom, toutefois il peut en avoir du même type. Dans le cas de nos bateaux, on peut donc avoir notre Trois-mâts et notre Sous-Marin qui utilisent la même base de données. Un peu comme dans une table MySQL où chaque ligne représente une ScriptableObject.

```cs
using UnityEngine;

public class BoatWeaponItemStore : MonoBehaviour
{ 
    // Reference of our scriptableObject
    public BoatWeaponData boatWeaponData;

    private void OnMouseDown() 
    {
        Debug.Log(boatWeaponData.name); 
        Debug.Log(boatWeaponData.description); 
        Debug.Log(boatWeaponData.cost);
        Debug.Log(boatWeaponData.description);
        Debug.Log(boatWeaponData.sprite);
    }
}
```
Voilà, avec notre code, nous pouvons afficher les données de notre arme lorsque nous cliquerons dessus.

> La méthode `OnMouseDown()` ne fonctionne que si et seulement si le GameObject a un collider

Plus d'informations sur les ScriptableObjects :
- https://www.youtube.com/watch?v=PVOVIxNxxeQ
- https://docs.unity3d.com/Manual/class-ScriptableObject.html
- https://www.youtube.com/watch?v=WLDgtRNK2VE
- https://learn.unity.com/tutorial/introduction-to-scriptableobjects?language=en#60661f13edbc2a001f55c22b

Dans le cas de notre projet d'initiation, nous avons déjà défini des ScriptableObjects, pour gagner du temps, vous allez les récupérer ici :
- [Télécharger les ScriptableObjects](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fcreation-et-design-interactif-s4%2Ftravaux-pratiques%2Fnumero-1%2Fsamples%2Fbeginner-base%2FAssets%2FScripts%2FScriptableObjects)
Désarchivez le tout puis glissez le dossier dans le dossier `Scripts` de votre projet

Jusqu'à présent, nous avons vu les ScriptableObjects pour stocker des données, il est également possible de les utiliser pour créer des évenements, et ce, pour les mêmes raisons que vues précédemment : limitation du couplage du code...