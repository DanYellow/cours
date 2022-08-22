# Découverte d'Unity

Nous l'avons vu précédemment, Unity est un logiciel visant à rendre accessible le développement de jeux vidéo. Il se veut complet et gère une bibliothèque complète qui propose notamment la gestion de la physique ou encore de modèles 3D. Mais si ce n'est pas assez, il est possible d'ajouter de nouvelles fonctionnalités grâce à l'asset store.
> [Accéder à l'asset store](https://assetstore.unity.com/)

Pour permettre le développement de jeux vidéo, Unity se repose sur le langage C# (à prononcer cee-sharp), c'est un langage orienté objet fortement typé. Autrement dit, le langage se base sur des classes et chaque élément doit avoir un type et n'a pas le droit d'en changer contrairement à javascript. Si le typage peut être contraignant il permet d'être plus discipliné dans sa façon de coder. Il est donc important de connaître les bases du langage. A noter que le but du cours n'est pas de faire de vous apprendre C# mais Unity. Si le sujet vous intéresse, voici une série de vidéos en français :
- [Tutoriel C# par Tuto Unity FR](https://www.youtube.com/playlist?list=PLUWxWDlz8PYLKlr6F_fwCs02DH1g2hrgS) - Je vous conseille de regarder au moins les 5 premières vidéos

> Petit point sur les tutoriels en ligne concernant Unity, s'il y en a beaucoup et permettent d'accomplir des choses impressionantes, le code montré n'est pas forcément le mieux optimisé, faites attention. Car la programmation de jeux vidéo, en plus d'être un domaine complexe, est un domaine où on va chercher la meilleure optimisation.

## Variables 
Comme tout langage de programmation le C# permet de créer des variables, la syntaxe est la suivante (sans les crochets):
```cs
[niveau de visibilité] [type] [nom de variable];
```
- Niveau de visibilité : Cette partie peut avoir la valeur "protected", "public" ou "private". Dans Unity, vous utilisez principalement :
    - public : la variable est accessible dans l'éditeur d'Unity. Un autre élément peut accéder à la variable
    - private : la variable n'est accessible qu'au sein de la classe et seul cette dernière peut la modifier
> Dans Unity, si une variable est, par défaut, privée, il est souhaitable de mettre son niveau de visibilité
- type : 
- nom de variable : si le nom est arbitraire, certains sont interdits et bien évidemment on nommera nos variables avec un nom explicite

## Fonctions
```cs
[niveau de visibilité] [type de retour] NomDeFonction([type] paramètre1, [type] paramètre2)
{
    // Instructions
}
``` 
- Niveau de visibilité : on l'a vu précemment
- Type de retour : le principe est le même que le type de variable sauf que c'est ce que la fonction va retourner. A noter qu'une fonctione ne peut retourner qu'un seul type à la fois et si votre fonction ne doit rien retourner, on mettra la valeur "void"
- NomDeFonction : Comme les variables, le nom est arbitraire mais certains noms sont interdits et bien évidemment on nommera nos fonctions avec un nom explicite. A noter qu'en C# les fonctions commencent par une majuscule, par convention
- les arguments : tout comme les variables, ils doivent avoir un type et sont séparés par une virgule. Et les arguments ne sont accessibles que dans la fonction pas à l'extérieur

Par exemple, une fonction qui affiche dans la console la somme de deux entiers :
```cs
public void Addition(int num1, int num2)
{
    Debug.Log(num1 + num2);
}
``` 
> La méthode `Debug.Log()` permet d'afficher des choses dans la console. Par ailleurs, toutes les instructions en C# doivent impérativement avoir un point-virgule (;).

Nous n'allons pas voir les `if/else` ou encore boucle `for` car la syntaxe est la même comparée à d'autres langages.

# Script de base

```cs
using System.Collections;
using System.Collections.Generic;

public class MyClass : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        // Les commentaires peuvent s'écrire avec deux barres obliques devant (//) ou entre /* Mon commentaire */. Ceci permet de faire des commentaires sur plusieurs lignes
    }

    // Update is called once per frame
    void Update()
    {
    }
}
```
Ci-dessus vous avez une classe de base dans Unity à chaque fois que vous allez créer un nouveau script, vous aurez au minimum le code ci-dessus. Vous pouvez bien évidemment supprimer ou ajouter des lignes.
> **Le nom de classe (ici MyClass) et le nom du fichier doivent toujours correspondre sinon Unity lèvera une erreur.**

### Méthode Start()
La méthode Start() est appelée

D'ailleurs en parlant de sprite, il est important que nous soyons sur la même longueur d'onde lorsque nous parlerons jeu vidéo. Il est important de savoir qu'il existe deux grandes familles de graphisme dans le jeu vidéo : la 2D et la 3D. Si 

// https://docs.unity3d.com/Manual/ExecutionOrder.html