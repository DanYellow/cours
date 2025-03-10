# Mémo GIT
Pour certaines commandes, il vous sera proposé une alternative à la ligne de commandes avec VS Code.

- [Mémo GIT](#mémo-git)
  - [git ou github ?](#git-ou-github-)
  - [Commandes](#commandes)
    - [Initialisation du projet](#initialisation-du-projet)
    - [Cloner le dépôt (repository) - git clone](#cloner-le-dépôt-repository---git-clone)
    - [Ajouter des fichiers à l'historique - git add](#ajouter-des-fichiers-à-lhistorique---git-add)
    - [Enregistrer les modifications - git commit](#enregistrer-les-modifications---git-commit)
    - [Mettre à jour le dépôt distant - git push](#mettre-à-jour-le-dépôt-distant---git-push)
  - [Récupérer l'historique distant - git pull](#récupérer-lhistorique-distant---git-pull)
    - [Gérer les merges (fusion d'historiques)](#gérer-les-merges-fusion-dhistoriques)
  - [Extras](#extras)
    - [Autoriser d'autres collaborateurs](#autoriser-dautres-collaborateurs)
    - [Gérer les conflits](#gérer-les-conflits)
    - [Changer le terminal de VS Code (Windows uniquement)](#changer-le-terminal-de-vs-code-windows-uniquement)
    - [Liens utiles](#liens-utiles)

> **Important : Si vous souhaitez utiliser git pour la SAE, il faut impérativement éditer les fichier .env.local.dev et .env.local.prod et non .env.dev et .env.prod. Ne pas le faire vous expose à des failles de sécurité critiques.**
>
> **Si ça arrive, changez immédiatement le mot de passe de votre base de données chez votre hébergeur.**

Git est un outil qui est un standard dans le milieu du développement. C'est un outil libre et gratuit. Dans les grandes lignes, c'est un logiciel permettant de gérer des version d'un logiciel, fichier ou encore site web.

Si vous êtes sur macOS, git est installé par défaut, si vous êtes sous Windows, il faudra l'installer via le logiciel gratuit git bash.
- [Télécharger git bash](https://gitforwindows.org/)

## git ou github ?
Cette confusion a souvent lieu. Il est préférable de clarifier ce point dès maintenant. Pour faire simple, git est la technologie, un outil, github est un site web, et certainement le plus populaire pour utiliser git. De ce fait, il est possible d'utiliser git sans passer par github, l'interface sera différente mais l'utilisation de git, elle, ne changera pas. Ne l'oubliez pas. Pensez aussi à [créer votre compte sur github](https://github.com/signup), si ce n'est pas déjà fait.

> Ce document a été pensé autour de git et github, mais comme dit juste en haut, mis à part l'interface, tout outil basé sur git fonctionne plus ou moins de la même façon notamment au niveau des lignes de commandes.

## Commandes
> git possède de nombreuses commandes, ce document ne listera que les commandes principales, celles dont vous aurez le plus besoin. Les autres, vous aurez l'occasion de les découvrir durant vos périgrignations avec git.
>
> A noter qu'il existe des variantes concernant certaines commandes qui font plus ou moins la même chose, ne soyez pas étonné(e) si vous y faites face.

### Initialisation du projet
Première étape d'un projet git : l'initialisation. **Cette étape n'est à faire qu'une seule fois par projet.** Pour simplifier les choses, il est préférable de faire cette étape depuis github plutôt que la ligne de commandes.
|![](./captures-ecran/git-1.png)|
|:--:|
|*Allez sur le site github, connecté. Cliquez sur le "+" et sélectionnez "New repository" (dépôt en français)*|

|![](./captures-ecran/git-2.png)|
|:--:|
|*Définissez un nom unique (par rapport à la liste de vos dépôts existants). Puis cliquez sur "Create repository"*|

|![](./captures-ecran/git-3.png)|
|:--:|
|*Voilà, votre repository est prêt. La page est ainsi car il n'y a pas encore de fichiers ajoutés*|

> Vous avez maintenant initialisé votre projet, toutefois, il n'est pas sur votre ordinateur encore, c'est ce que nous allons voir dans la partie suivante.

### Cloner le dépôt (repository) - git clone
Dans le vocabulaire de git, l'action de "cloner" consiste à télécharger sur son ordinateur le contenu d'un dépôt. Pour ce faire, il faudra utiliser la ligne de commandes et la commande suivante :
```bash
git clone URL-du-depot.git
```
> Note : VS Code intègre un terminal, il est accessible via le menu `Terminal > New Terminal`. L'avantage de cette méthode c'est que VS Code ouvre la console directement dans votre projet, c'est plus pratique. Malheureusement quand vous clonez un dépôt, il n'existe pas encore sur votre ordinateur, mais on peut _tricher_ en procédant de la façon suivante créant un dossier vide. :
> - Créez un dossier vide sur votre ordinateur
> - Glisser ce dossier dans VS Code
> - Ouvrez la console et clonez le dépôt avec la commande `git clone URL-du-depot.git .` (le point est important)
>
> Et voilà, vous avez cloné votre dépôt.

Appuyez ensuite sur la touche "entrée". Félicitations, vous avez cloné votre projet sur votre ordinateur.

> **N'effectuez un clonage de dépôt, si et seulement si, le projet n'est pas sur votre ordinateur.**

Note 2 : Dans le cas où votre dépôt a déjà des fichiers, l'interface change et l'endroit où trouver l'url pour cloner le dépôt change d'emplacement :

![](./captures-ecran/git-14.png)

### Ajouter des fichiers à l'historique - git add
Une fois le projet cloné glissez-déposez tout le contenu du dossier de la SAE dans le dossier récemment où vous avez cloné le projet via la commande `git clone`.

Git permet de garder un historique des fichiers au sens d'un dépôt (ajout, suppression, modification). Toutefois, git crée un registre uniquement des fichiers qu'il connait. Après avoir déplacé tous les fichiers de la SAE 203 dans le dossier, vous avez du remarquer sur la gauche de VS Code une pastille avec un nombre, ce nombre représente le nombre de fichiers ajoutés/modifiés dans votre dépôt. Cliquez dessus.

|![](./captures-ecran/git-4.png)|
|:--:|
|*La pastille à gauche nous indique le status de notre projet git*|

La partie "Source control" garde une trace actuelle de votre dernière modification. Dans la liste des fichiers, vous remarquerez qu'il y a la lettre "U" d'affichée. Ce "U" signifie "Unstagged", cet état signifie que ce fichier n'est pas lié à git, il n'est pas dans l'historique.

|![](./captures-ecran/git-5.png)|
|:--:|
|*Ici notre fichier `index.html` bien que dans le dossier de notre dépôt, il est marqué comme **U**nstagged. Il faut y remédier.*|

<details open>
    <summary>Ligne de commande</summary> <br/>
Pour ajouter nos fichiers à l'historique, il faut utiliser la commande suivante dans le terminal :

```bash
git add .
```
</details>

<details>
    <summary>VS Code</summary> <br/>
Pour ajouter nos fichiers à l'historique, il vous suffit de cliquer sur le signe "+" qui groupe tous les fichiers modifiés

![](./captures-ecran/git-15.jpg)

> Note : il est possible de choisir quel fichier ajouter en cliquant sur le signe "+" qui est à côté de chaque nom de fichier.
</details>


|![](./captures-ecran/git-6.png)|
|:--:|
|*Après avoir ajouté nos fichier via la commande `git add .` ou l'ajout via VS Code, notre U de Unstagged s'est transformé en A pour Added*|

Notre fichier `index.html` est ajouté dans l'historique toutefois nous n'avons encore rien enregistré, c'est ce que nous allons voir dans la partie suivante.

### Enregistrer les modifications - git commit

L'engistrement d'une modification est appelée `commit`, voyez cette action comme étant l'insertion d'une action dans un registre, comme le schéma ci-dessous :

```mermaid
---
title: Example de diagramme git
---
gitGraph
    commit
    commit
    commit
    commit
    commit
    commit
    commit
    commit
```

Chaque point indique un "point de sauvegarde". Main est le nom de la branche de base de git, elle est également parfois appelée "Master".

<details open>
    <summary>Ligne de commande</summary> <br/>
Cette action s'effectue via la commande :

```bash
git commit -am "Contenu du commit"
```
> Les guillemets peuvent être simples ou doubles. Si vous réutilisez le même type de commit dans un message, n'oubliez pas d'échapper les guillemets avec l'anti-slash (\\).

Et on valide le commit en appuyant sur entrée.
</details>

<details>
    <summary>VS Code</summary> <br/>
Dans VS Code, il vous suffit d'écrire le contenu de votre commit dans l'onglet "Source Control" <img alt="" src="captures-ecran/source-control-vs-code-icon.png" /> et de valider son contenu en cliquant sur "Commit".

![](./captures-ecran/git-16.jpg)

</details>

Il est préférable d'avoir un contenu de message clair, ceci vous permettra de comprendre très facilement ce qui a été effectué pour cette ligne du registre, et ce, sans même regarder votre code.

> Pour un message de commit clair, nous vous conseillons d'écrire un message qui répond à la phrase suivante "This commit will..." ou en français "Ce commit (fera)...". Dans le cas de nos exemples, l'ajout de notre fichier "index.html", le message du commit peut être "Ajout de la page d'accueil".

Pour terminer cette partie, rappelez-vous qu'un commit est gratuit, n'hésitez pas à commiter régulièrement. Notamment quand vous accomplissez une grande avancée sur votre projet : ajout de fichiers, fonctionnalités...

Commiter souvent, ça vous permet de plus facilement "retourner" dans le temps en cas d'erreur.

### Mettre à jour le dépôt distant - git push
Jusqu'à présent, nous avons ajouté et enregistré nos fichiers dans l'historique de git, néanmoins, ces modifications sont locales, il faut donc mettre à jour l'historique distant. On parlera de "push" dans le vocabulaire de git.

<details open>
    <summary>Ligne de commande</summary> <br/>
Cette action s'effectue via la commande :

```bash
git push origin
```

Et on n'oublie pas de valider l'action en appuyant sur entrée.
</details>

<details>
    <summary>VS Code</summary> <br/>
Dans VS Code, survolez "Source control", cliquez sur les trois points (...) et cliquez sur "Push" comme dans la capture ci-dessous.

![](./captures-ecran/git-17.jpg)

</details>

L'action de "Push" va envoyer sur le serveur distant tous les commits effectués qui n'ont pas encore été envoyés.

> Important : git refusera un push si votre historique local n'est pas à jour, il faudra impérativement effectuer un tirage de branch avant. Voir chapitre [récupérer l'historique distant](#git-pull).

Lors de votre premier push, il n'est pas improbable que github vous demande des autorisations, elles permettent de manipuler sans restrictions le registre, autorisez-les.


## <a name="git-pull"></a>Récupérer l'historique distant - git pull
Si vous changez d'ordinateur ou travaillez d'avec d'autres, votre historique local ne sera certainement pas à jour s'il y a eu des modifications entre-temps. Pour les récupérer, rien de plus simple :

<details open>
    <summary>Ligne de commande</summary> <br/>
Cette action s'effectue via la commande :

```bash
git pull origin
```

Et on n'oublie pas de valider l'action en appuyant sur entrée.
</details>

<details>
    <summary>VS Code</summary> <br/>
Dans VS Code, survolez "Source control", cliquez sur les trois points (...) et cliquez sur "Pull" comme dans la capture ci-dessous.

![](./captures-ecran/git-18.jpg)

</details>

Ce chapitre met fin à cette présentation brève de git, vous avez l'essentiel pour commencer à l'utiliser. Avec le temps, vous découvrirez d'autres commandes tout aussi utiles.

### Gérer les merges (fusion d'historiques)
Lorsque que vous effectuez un pull, git effectue une fusion des historiques. Il peut arriver que git vous demande comment gérer cette action (voir image ci-dessous). Généralement, il n'est pas utile de mentionner les raisons du merge. Ainsi pour remettre la console dans son état inital, il vous suffit d'écrire `:q` (et appuyer sur `Entrée`) dans la console.
|![](./captures-ecran/git-10.png)|
|:--:|
|*Quand git fait ça, c'est qu'il est en train d'effectuer un merge. Faites `:q`. Et ça sera réglé.*|

## Extras

### Autoriser d'autres collaborateurs
Si n'importe qui peut cloner (`git clone`) votre projet, tout le monde n'est pas autorisé à pousser sur votre dépôt, par défaut. Pour permettre aux autres membres de votre groupe de pousser sur votre historique distant, il faudra changer les permissions de votre dépôt sur le site github. Suivez la démarche suivante :

|![](./captures-ecran/git-7.png)|
|:--:|
|*Allez dans le menu "Settings" de notre dépôt*|

|![](./captures-ecran/git-8.png)|
|:--:|
|*Puis le menu "Collaborators"*|

|![](./captures-ecran/git-9.png)|
|:--:|
|*Cliquez sur "Add People" et ajoutez les noms de compte de vos collaborateurs.*|

Notes :
- Vos collaborateurs devront valider leur participation au projet (un e-mail de validation sera envoyé)
- Les projets dans lesquels vous collaborez sont dans le menu `Paramètres > Repositories`. [Également accessible via cette URL](https://github.com/settings/repositories).

### Gérer les conflits
Aussi performant soit-il, git peut parfois se brouiller quand il fusionne des historiques, ça s'appelle un conflit. Ils interviennent la plupart du temps quand plusieurs développeurs ont édité les mêmes lignes de code.

Ainsi, on se retrouve avec un code non interprétable correctement par un compilateur ou le navigateur, ce qui provoque des comportements inattendus.

La résolution des conflits doit se faire manuellement. Pour signaler un conflit git ajoute de multiples chevrons dans le code (`<<<<<<<<<<`). Il faut donc les rechercher dans le code et sélectionner les parties de code qui nous intéresse.

Heureusement, VS Code possède une fonctionnalité de recherche globale.
|![](./captures-ecran/git-11.png)|
|:--:|
|*Après avoir sélectionné l'outil de recherche, on recherche `<<<<<<` pour trouver nos conflits*|

VS Code liste les fichiers avec des conflits, il vous suffira sélectionner chacun des fichiers en conflit et les résoudre.

### Changer le terminal de VS Code (Windows uniquement)
On a vu précédemment qu'il était possible d'utiliser le terminal directement depuis l'interface de VS Code (`Terminal > New Terminal`), toutefois, si vous êtes sous Windows, le terminal utilisé est l'invite de commandes. C'est "bien", mais le terminal de git bash est bien meilleur. Pour l'utiliser par défaut dans VS Code suivez la démarche suivante :

|![](./captures-ecran/git-12.png)|
|:--:|
|*Ouvrez la "Command Palette" avec le raccourci `ctrl+shift+p" et cherchez "terminal select". Sélectionnez "Terminal: Select Default Profile"*|

|![](./captures-ecran/git-13.png)|
|:--:|
|*Sélectionnez "Git Bash". Et voilà, git bash est maintenant votre terminal par défaut dans VS Code*|

### Liens utiles
- [Documentation officielle en français](https://git-scm.com/book/fr/v2)
- [Anti-sèche git en anglais](./Atlassian-Git-Cheatsheet.pdf)
