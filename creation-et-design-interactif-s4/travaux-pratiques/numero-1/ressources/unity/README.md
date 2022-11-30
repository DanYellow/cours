# Découverte d'Unity (et de C#)

Nous l'avons vu précédemment, Unity est un logiciel qui a été pensé pour rendre accessible le développement de jeux vidéo pour tout le monde. Il se veut complet et gère une bibliothèque complète qui propose notamment la gestion de la physique ou encore de modèles 3D. Mais si ce n'est pas assez, il est possible d'ajouter de nouvelles fonctionnalités grâce à l'asset store.
- [Accéder à l'asset store](https://assetstore.unity.com/)
> L'asset store propose des outils en tout genre qui peuvent se greffer à Unity tels que des outils pour le logiciel ou encore des personnages clés en main pour vos jeux. Notez bien que tout n'est pas gratuit sur l'asset store.

Pour permettre le développement de jeux vidéo, Unity se repose sur le langage C# (à prononcer cee-sharp), c'est un langage orienté objet fortement typé. Autrement dit, le langage se base sur des classes et chaque élément doit avoir un type et n'a pas le droit d'en changer contrairement à javascript. Si le typage peut être contraignant il permet d'être plus discipliné dans sa façon de coder. Il est donc important de connaître les bases du langage. A noter que le but du cours n'est pas de faire de vous apprendre C# mais Unity. Si le sujet vous intéresse, voici une série de vidéos en français :
- [Liste de lecture sur les bases de C# par Tuto Unity FR](https://www.youtube.com/playlist?list=PLUWxWDlz8PYLKlr6F_fwCs02DH1g2hrgS) - Je vous conseille de regarder au moins les trois premières vidéos. Ceci devrait vous prendre un peu moins de 40 minutes.

> Petit point sur les didacticiels en ligne concernant Unity : S'il y en a beaucoup et permettent d'accomplir des choses impressionantes, le code montré n'est pas forcément le mieux optimisé, faites attention. La programmation de jeux vidéo, en plus d'être un domaine complexe, est un domaine où on va chercher la meilleure optimisation. Oui, un jeu qui a des soucis de performances, ce n'est pas cool. La vidéo suivante l'illustre très bien (en anglais).

[![clickbaited](https://i3.ytimg.com/vi/BJvoaBeqVm0/hqdefault.jpg)](https://www.youtube.com/watch?v=BJvoaBeqVm0 "clickbaited")


## Variables 
Comme tout langage de programmation le C# permet de créer des variables, la syntaxe est la suivante (sans les crochets):
```cs
[type] [nom de variable];
```
- type : Définit la nature d'une variable. Autrement dit, les actions que peut effectuer la variable. Par exemple, si on définit une varible de type entier (int), il n'est pas possible d'utilisr des méthodes liées à une chaîne de caractères (string). Notez bien qu'en C#, contrairement au javascript, **le typage est obligatoire** et immuable. Un entier ne peut pas devenir une chaîne de caractères et vice-versa. Durant le cours, nous aurons l'occasion de voir plein de types et même de créer les nôtres
- nom de variable : si le nom est arbitraire, certains sont interdits et bien évidemment on nommera nos variables avec un nom explicite, c'est pratique pour s'y retrouver

Voici des exemples de variables :
```cs
int anneesBUT = 3;
string playerName = "player1";

// Un tableau de chaînes de caractères
string[] listFormations = {"MMI", "TC", "GE2I", "MT2E"};
```

### Liste ou tableau ?
Petit point : En C# (et d'autres langages de programmation), il existe une différence entre les tableaux et les listes. Si les deux permettent de contenir un ensemble d'éléments **du même type**, il existe une subtile différence : la taille d'un tableau (array) est finie. Une fois défini, il n'est pas possible d'ajouter ou retirer des éléments à un tableau. Alors qu'une liste a une dimension dynamique.

```cs
// Equivalent du code ci-dessus mais avec une liste, nous pouvons donc ajouter ou retirer des éléments grâce aux méthodes .Add() et .Remove()
List<string> listFormations = new List<string>(){"MMI", "TC", "GE2I", "MT2E"};
```
- [Différence Liste et Tableau en C# - anglais](https://www.shekhali.com/c-array-vs-list)


## Fonctions
```cs
[niveau de visibilité] [type de retour] NomDeFonction([paramètres ([type] paramètre1), ([type] paramètre2)])
{
    // Instructions
}
``` 
- Niveau de visibilité : Peut avoir la valeur "protected", "public", "private" et autres. Dans le cadre du cours nous utiliserons principalement :
    - public : la fonction est accessible dans l'inspecteur d'Unity. On peut la lire (et la modifier) depuis n'importe où dans notre projet
    - private : **la fonction n'est accessible qu'au sein de la classe** qui la définit et seule cette dernière peut la modifier
        - Par défaut, les fonctions sont privées en C#, mais pensez à le préciser.
- Type de retour : le principe est le même que le type de variable sauf que c'est ce que la fonction va retourner. A noter qu'une fonctione ne peut retourner qu'un seul type à la fois et si votre fonction ne doit rien retourner, on mettra la valeur "void"
- NomDeFonction : Comme les variables, le nom est arbitraire mais certains noms sont interdits et bien évidemment on nommera nos fonctions avec un nom explicite. A noter qu'en C# les fonctions commencent par une majuscule, par convention
- Les paramètres : tout comme les variables, ils doivent avoir un type et sont séparés par une virgule. **Et les paramètres ne sont accessibles que dans la fonction qui les définit**

Par exemple, une fonction qui affiche dans la console la somme de deux entiers. **Elle ne renvoie rien** :
```cs
public void Addition(int num1, int num2)
{
    int sum = num1 + num2;
    Debug.Log("Résultat somme : " + sum);
}
```

> La méthode `Debug.Log()` permet d'afficher des choses dans la console d'Unity (Window > General > Console). Notez que si vous voulez afficher une chaîne de caractères dans la méthode, **il faut impérativement utiliser des guillemets doubles (")**. Par ailleurs, toutes les instructions en C# doivent impérativement se terminer par un point-virgule (;).

Voici le même exemple, mais cette fois-ci, **notre fonction retourne le résultat** :
```cs
public int Addition(int num1, int num2)
{
    // On précise qu'on retourne un entier
    return num1 + num2;
}

int sum = Addition(5, 6);
Debug.Log("Résultat somme : " + sum);
```

Dans ce document, nous n'allons pas voir les `if/else` ou encore boucles `for` ou `while` car la syntaxe est la même comparée aux autres langages que vous avez pu voir durant votre BUT. Toutefois si vous avez un trou de mémoire, sachez que la chaîne Youtube Tuto Unity FR aborde ces sujets dans sa liste de lecture "Apprendre le C#".
- [Voir liste de lecture sur les bases de C# par Tuto Unity FR](https://www.youtube.com/playlist?list=PLUWxWDlz8PYLKlr6F_fwCs02DH1g2hrgS) 

> Comme les noms de variables, les nom de fonctions doivent avoir un nom unique

# Script Unity de base

```cs
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MyClass : MonoBehaviour
{
    // Appelée (la méthode) avant le premier appel de la méthode "Update"
    void Start()
    {
        // Les commentaires peuvent être précédés de deux barres obliques (//) ou entre "/*" "*/". 
        // Cette dernière façon permet de faire des commentaires sur plusieurs lignes
    }

    // Appelée (la méthode) une fois par frame (ou image)
    void Update()
    {
    }
}
```
Ci-dessus vous avez une classe de base, de type MonoBehavior, à chaque fois que vous allez créer un nouveau script depuis Unity, vous aurez au minimum le code ci-dessus (sans les commentaires en français). Vous pouvez bien évidemment supprimer ou ajouter des lignes en fonction de vos besoins.
> **Le nom de classe (ici MyClass) et le nom du fichier doivent toujours correspondre (casse comprise) sinon Unity lèvera une erreur.** Dans notre cas, la classe MyClass est contenu dans un fichier appelé MyClass.cs. **Par convention, on mettra tous nos scripts Unity dans un dossier Scripts contenu lui-même dans le dossier Assets/,** ce dernier est déjà généré par Unity lorsque vous créez un nouveau projet.

### Déclaration de classe : `public class MyClass : MonoBehaviour`
Cette ligne nous permet de définir notre classe. Tout ce qui est avant `:` nous est familier car la syntaxe est identique à celle des variables et méthodes, ici on utilise le type `class`. En revanche la synaxe `: MonoBehaviour` nous est nouvelle, elle désigne l'héritage. Autrement dit, notre classe `MyClass` possède les caractéristiques de la classe `MonoBehaviour`, c'est ce qui nous permet d'utiliser les méthodes `Start()` ou `Update()`.  

### Méthode : `Start() {}`
La méthode Start() est appelée lorsque le script est instancié. Par exemple, dans votre jeu vous pourriez définir les points de vie par défaut de votre personnage.

### Méthode : `Update() {}`
La méthode Update est appelée toutes les frames/images. Ainsi si votre jeu tourne à 60 images par seconde (ou fps/frames per second), ceci signifie que la méthode Update() sera appelée 60 fois durant une seule et unique seconde, et ce, pour chaque script possédant la méthode `Update()`. C'est dans cette méthode que vous vérifierez les touches appuyées. Par exemple :

```cs
/* [...] */
void Update()
{
    // Ici on appelle le contenu du "if"
    // quand la touche V du clavier est appuyée
    if (Input.GetKeyDown(KeyCode.V))
    {
        // Mes instructions
        Debug.Log("J'ai appuyé sur la touche V");
    }
}
```

Enfin, notez les choses suivantes sur les classes :
- Les méthodes telles que `Start()` ou `Update()` sont propres à la classe `MonoBehaviour`, de ce fait, elles sont automatiquement appelées
- Toutes les classes n'ont pas à hériter de `MonoBehaviour`
    - Nous aurons l'occasion de réaliser des classes n'héritant pas de MonoBehaviour
- Il est possible de définir plusieurs classes dans le même fichier
- Vous pouvez définir des propriétés propres à une classe. Par convention, on les met au début de la classe. Nous aurons l'occasion de voir ceci durant le cours
- `MonoBehaviour` possède d'autres méthodes (nous en utiliseront d'autres), prenez bien en compte que ces méthodes ont un ordre d'appel
    - [Voir ordre d'exécution des méthodes de `MonoBehaviour` (anglais)](https://docs.unity3d.com/Manual/ExecutionOrder.html)

# Exercice
Dans le but de découvrir le C#, vous allez écrire quelques lignes de code. **Retenez bien qu'Unity ne peut exécuter un script que s'il est lié à un GameObject.**
Créez donc un GameObject depuis le panneau "Hierarchy" (Clic droit > Create Empty) ou encore depuis le menu Game Object > Create Empty. Puis dans la fenêtre "Inspector", cliquez sur "Add Component" et écrivez le nom de votre script (au choix) puis cliquez sur "New script". 

---
> Il est possible de développer en C# avec n'importe quel logiciel. Toutefois, nous vous recommendons d'utiliser un logiciel qui gère Unity, ceci vous permettra d'avoir l'auto-complétion des différentes méthodes et classes pour ainsi être plus productif.
Si vous utilisez Visual Studio (pas VS Code, c'est différent) tout sera géré nativement. Si vous souhaitez utiliser VS Code ou Sublime Text, il faudra installer des extensions :
- [Extension VS Code - Unity Tools](https://marketplace.visualstudio.com/items?itemName=Tobiah.unity-tools)
- [Didacticiel Unity et Sublime Text - anglais](https://www.youtube.com/watch?v=a-kE-CmjftE)
---

Réalisez les choses suivantes (n'oubliez pas d'afficher le résultat avec la méthode `Debug.Log()`)
- Un nombre décimal
- Une chaîne de caractères
- Un tableau contenant des nombres
- Une fonction qui **retourne** "Bonjour" + la chaine de caractères passée en paramètre
    - N'oubliez pas d'appeler la fonction et d'utiliser le mot-clé "return"
- Une fonction qui **retourne** un entier passé en paramètre et le multiplie par lui-même
    - N'oubliez pas d'appeler la fonction et d'utiliser le mot-clé "return"
- Une fonction qui fait ce que vous souhaitez mais qui est appelée quand on appuie sur une touche
    - Ce code devra impérativement être exécuté au sein de la méthode "Update()", sinon ça ne fonctionnera pas (voir exemple plus haut)

Cette petite mise en bouche n'est là que pour vous faire prendre la main sur le langage C#. Durant ce cours, nous aurons l'occasion de faire un petit jeu en 2D où nous aborderons les notions suivantes (liste non exhaustive) :
- Gestion des sprites 2D
- Gestion du son / physique
- Animation

Enfin, n'oubliez pas qu'Unity est outil très complet, nous n'aurons pas l'occasion de tout voir à l'occasion des cours. Alors n'hésitez pas à vous renseigner un peu sur le web pour développer le jeu qui vous plait. N'hésitez pas à utiliser les outils mis à votre disposition pour créer des ressources pour vos créations :
- [Tiled Map Editor](https://thorbjorn.itch.io/tiled)
- [libresprite (version gratuite et moins complète d'aesprite)](https://libresprite.github.io/#!/)

Nous verrons dans les grandes lignes, l'interface d'Unity. Néanmoins, si vous voulez voir ceci en vidéo, vous avez ceci : 
- [Voir présentation de l'interface d'Unity par Tuto Unity FR](https://www.youtube.com/watch?v=Ef6KMvYNwj8)


## Propriétés de classes
Pour terminer, petit mémo sur les propriétés de classes en C#. Il faut se rappeler que les variables ont une portée qui leur est spécifique. Ainsi, si vous définissez une variable dans une méthode, elle **n'existe que** dans la méthode, c'est là qu'entre en jeu les propriétés de classes. C'est un type de variables qui peuvent être globales ou non à votre projet. Leur syntaxe est semblable aux variables à la différence que vous pouvez définir leur visibilité. Exemple :

```cs
[niveau de visibilité] [type] [nom de variable];
```
- Niveau de visibilité : On l'a vu précemment
    - Par défaut les propriétés sont "private", mais il est préférable de le préciser
- Type et nom de variable : On l'a vu précemment


Par convention, ces propriétés de classes dont définies au début d'une classe. Exemple :
```cs
/* [...] */
public class MyClass : MonoBehaviour
{
    // Ces propriétés sont accessibles partout au sein de notre classe "MyClass"
    public string university = "CY Paris Université";
    private int nbYearsBUT = 3;

    void Start()
    {
        // Note : Avec le site $, il est possible d'afficher une variable dans une chaîne de caractères
        Debug.Log($"nbYearsBUT {nbYearsBUT}");
    }

    void MyMethod() {
        nbYearsBUT = 7;
    }
    /* [...] */
}
```
