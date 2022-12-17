# ScriptableObjects

Un ScriptableObject est un conteneur de données, les données conservées peuvent être de multiples types :
- Primitives : entier (int), chaînes de caractères (string), tableau (array)...
- Complexe : GameObject, Transform, Vector2, Sprite...

L'un des grands avantages des ScriptableObjects est leur limitation en terme d'empreinte dans la mémoire. En effet, ils limitent la copie d'objets là où un objet MonoBehaviour aurait copié toutes les données dont il aurait besoin. Par exemple, admettons que vous avez la structure suivante :


Est-il besoin que ces deux armes stockent au sein de leur propre classe `MonoBehaviour` les dégâts ou leur prix ? Non. Il est plus intéressant de stocker ces données dans un ScriptableObject, une classe qui ne va gérer que la donnée. 
Au-delà de la diminution de l'usage de la mémoire, les ScriptableObjects possèdent les avantages suivants :
- Ils existent dans les Assets. Pas de réinitialisation lorsqu'on arrête le mode "Play"
    - **Attention : Les ScriptableObjects ne sont pas un moyen de sauvegarder les données du joueur dans un vrai build**
- Limite le couplage entre les GameObjects. On veut le plus possible limiter le couplage dans le code, ça nous permet d'utiliser un GameObject seul sans en importer d'autres dont on n'en aurait pas besoin 
    - Un exemple souvent utilisé est celui des points de vie du joueur. En utilisant un ScriptableObject pour gérer les points de vie du joueur, des GameObjects peuvent lire la valeur pour s'adapter en fonction : ennemis plus aggressifs, mouvement du joueur plus lents, son plus rapide...
- Simple à utiliser. Dans certains studios, ce sont les game designers qui s'occupent de les créer. Les développeurs les utilisant ensuite dans leur code
- Existe au-delà de la scène. Un ScriptableObject est très utile pour faire passer les informations d'une scène à l'autre de façon propre
- Partage de données : vu que les données sont réutilisables et partagées, tout changement sur un ScriptableObject sera appliqué partout

Voici un exemple de code

```cs
using UnityEngine;

public class MyWeapon : ScriptableObject
{

}
```
Dans le code ci-dessus, la grande différence avec les classes que nous avons faites jusqu'à présent c'est qu'elle hérite de `ScriptableObject`. Pour le reste, ça fonctionne plus ou moins comme avant, on définit des propriétés publiques ou privées ainsi que des méthodes elles aussi à niveau de visibilité variable (privé / publique). Notez tout de même que les méthodes `Update()` ou `Awake()` ne sont pas utilisables avec un ScriptableObject néanmoins vous pouvez utiliser la méthode `Awake()` ou encore référencer un ScriptableObject dans un autre.

Sinon, si on reprend le cas de nos armes en ScriptableObject, nous voulons avoir les informations suivantes pour chaque arme :
- damage (int) - dégâts
- cost (int) - prix
- name (string) - nom
- description (string) - description

```cs
using UnityEngine;

public class WeaponData : ScriptableObject
{
    public int damage;
    public int cost;
    public string name;
    [Multiline]
    public string description;
}
```

Une fois notre ScriptableObject définit, vous pouvez créer autant d'armes que vous le souhaitez. Attention tout de même, le code ci-dessous ne vous permettra pas de créer un ScriptableObject pour le moment car il nous manque l'attribut `CreateAssetMenu()` avant la définition de notre classe. Ce qui nous donne, au final, le code suivant :
```cs
[CreateAssetMenu(fileName = "New WeaponData", menuName = "ScriptableObjects/WeaponData")]
using UnityEngine;

public class WeaponData : ScriptableObject
{
    public int damage;
    public int cost;
    public string name;
    [Multiline]
    public string description;
}
```
Rapide explication sur la ligne de code que nous venons d'ajouter :
- CreateAssetMenu() : Méthode propre à Unity permettant d'ajouter des nouveaux éléments au menu `Assets > Create`
- fileName : Nom par défaut lors de la création du ScriptableObject. Le nom peut être changé
- menuName : Endroit où va se trouver la création de notre ScriptableObject dans le menu `Assets > Create`
    - Notez que ce chemin doit être unique, plusieurs ScriptableObject ne peuvent pas avoir le même chemin

Etant donné qu'un GameObject ne peut pas utiliser un ScriptableObject directement, nous passerons par une classe `Monobehaviour` pour gérer le tout.

```cs
using UnityEngine;

public class WeaponItemStore : MonoBehaviour
{ 
    // Reference of our scriptableObject
    public WeaponData weaponData;

    private void OnMouseDown() 
    {
        Debug.Log(weaponData.name); 
        Debug.Log(weaponData.description); 
        Debug.Log(weaponData.cost);
        Debug.Log(datas.description);
    }
}
```
Voilà, avec notre code, nous pouvons afficher les données de notre armes lorsque nous cliquerons dessus.
> La méthode `OnMouseDown()` ne fonctionne que si et seulement si le GameObject a un collider

Plus d'informations sur les ScriptableObjects :
- https://www.youtube.com/watch?v=PVOVIxNxxeQ
- https://docs.unity3d.com/Manual/class-ScriptableObject.html
- https://www.youtube.com/watch?v=WLDgtRNK2VE
- https://learn.unity.com/tutorial/introduction-to-scriptableobjects?language=en#60661f13edbc2a001f55c22b

Dans le cas de notre projet d'initiation, nous avons déjà défini des ScriptableObjects, pour gagner du temps, vous allez les récupérer ici :
- [Télécharger les ScriptableObjects](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FDanYellow%2Fcours%2Ftree%2Fmain%2Fcreation-et-design-interactif-s4%2Ftravaux-pratiques%2Fnumero-1%2Fsamples%2Fbeginner-base%2FAssets%2FScripts%2FScriptableObjects)
Désarchivez le tout puis glissez le dossier dans votre

Jusqu'à présent, nous avons vu les ScriptableObjects pour stocker des données, il est également possible de les utiliser pour créer des évenements, et ce, pour les mêmes raisons que vues précédemment.