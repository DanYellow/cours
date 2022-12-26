# Composition plûtot qu'héritage

Il est important de comprendre qu'Unity promeut un système de composition au lieu d'un système d'héritage. Autrement dit, au lieu d'écrire des scripts spécialisés pour chaque type d'ennemi qui ont une base commune (héritage). Dans le cadre du cours, nous ferons des scripts dédiés pour chaque fonctionnalité (composition). Par exemple, pour un GameObject de type ennemi pourrait avoir les scripts suivants :
- Un script pour le déplacement
- Un script pour la santé
- Un script pour les attaques
...

La composition rend le code beaucoup plus flexible. Elle permet très facilement de réutiliser un bout une fontionnalité ailleurs ou tout simplement d'en ajouter ou en retirer une à l'envie. Ce qui fait qu'avec la structure précédente, nous pourrions avoir :
- Un ennemi qui attaque sans se déplacer
- Un ennemi qui se déplace uniquement
...

Car avec l'héritage, l'hybridation de fonctionnalités est très complexe et peut nécessiter un nombre conséquent de classes mais surtout apporter une complexité. 

Attention tout de même, l'héritage n'est pas une chose à bannir mais plutôt à utiliser avec parcimonie vu qu'Unity nous propose la composition. Car quoiqu'il arrive, nous utiliserons quand même l'héritage vu que nos scripts hériteront de `MonoBehaviour` et plus tard de `ScriptableObject`. En tous les cas, si ces notions vous semblent complexes, ne vous inquétiez pas, nous pratiquerons (beaucoup) tout ça.
- [En savoir plus la différence entre la composition et l'héritage - anglais](https://gamedevbeginner.com/how-to-use-script-composition-in-unity)

La composition peut également prendre forme avec les interfaces. Pour faire très simple, une interface (souvent préfixée par un i majuscule) est un contrat que passe une classe avec l'interface pour implémenter ses fonctionnalités (souvent des méthodes) et ensuite définir son comportement individuellement. Par exemple, deux GameObjects complètement différents (ennemi et objets, par exemple) peuvent avoir une interface nommée `IDamageable` avec une méthode `TakeDamage(int damage)` qui aura un comportement interne à leur classe respective. Si une classe implémente une interface, elle doit impérativement déclarer **publiquement** toutes les méthodes (et autres) que l'interface déclare. Exemple :
```c#
using UnityEngine;

public interface IDamage
{
    // On ne définit que la signature de la méthode, pas son contenu
    void TakeDamage(int damage)
}
```

```c#
using UnityEngine;
using System.Collections;

public class MyClass : MonoBehaviour, IDamage
{
    public void TakeDamage(int damage) {
        Debug.Log($"Take {damage}");
    }
}
```


**A noter qu'une interface ne peut pas être instanciée.** Et que si une classe peut implémenter autant d'interfaces qu'elle le souhaite, elle ne peut pas hériter de plusieurs classes.
- [En savoir plus sur les interfaces en C# avec Unity - anglais (moins de 5 minutes)](https://www.youtube.com/watch?v=50_qBoKGKxs)

> La partie sur les interfaces n'est là qu'à titre indicatif, nous n'aurons pas l'occasion de les utiliser sauf si votre projet de SAE s'y prête.
