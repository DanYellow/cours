# Devoir 1 sur les formulaires

Le but de ce devoir est de tester vos connaissances sur les formulaires à travers ce que nous avons pu voir en cours et dans les leçons.

## But de cet exercice

Afficher un formulaire contenant les champs suivants :

- Nom : champ texte
  - clé : nom
  - obligatoire : oui
  - placeholder : Martin
  - valeur par défaut : Laurentin
- Prénom : champ texte
  - clé : prenom
  - obligatoire : oui
  - placeholder : Thomas
  - valeur par défaut : Fabrice
- Diplômes obtenus : case à cocher - Proposer 4 choix minimum
  - clé "diplomes"
  - obligatoire : non
  - valeur pré-selectionnée : baccaleauréat
  - Note : les inputs doivent suivre la forme "nom du diplôme" + "case à cocher"
- Pays d'obtention du dernier diplôme : liste
  - clé : "diplome_pays"
  - obligatoire : non
  - Utiliser un [générateur pour la liste](https://accessify.com/tools-and-wizards/developer-tools/insta-select/)

Le formulaire doit avoir également une image d'en-tête avec écrit par-dessus "Informations personnelles". Entre le texte et l'image, il doit avoir un fond d'opacité de 0.75.

Les données doivent passer dans le corps de la requête. Bien évidemment le formulaire doit être accessible, il ne donc faut pas oublier la balise `<label>` et les attributs qui vont avec.
N'oubliez pas flexbox, c'est un très bon allié pour la mise en page, et pour vous aider, vous avez les classes `.conteneur-champ` et `.conteneur-choix` (pour les inputs type radio/checkbox + label) qui sont déjà prêtes pour ça.

[Documentation de la balise `<input>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input)

Pour vous assurer que vous avez bien réalisé les consignes, voici une liste de contrôles que vous pouvez cocher au fur et à mesure de votre progression :

- [x] Lecture des consignes
- [ ] Ajout du champ "nom"
- [ ] Ajout du champ "prenom"
- [ ] Ajout du champ "diplome"
- [ ] Ajout du champ "diplome_pays"
- [ ] Ajout de l'image d'en-tête
- [ ] Ajout du calque au-dessus de l'image
- [ ] Ajout du texte

# Allez plus loin

Si _le mieux est l’ennemi du bien_, on peut quand même se permettre d'aller un peu plus loin.

- [ ] Indiquer les champs requis en y ajoutant un asterique (\*) au niveau du label et ce sans utiliser de classe, uniquement des pseudo-classe
  - La propriété "order" de flexbox sera d'une grande aide. Pour rappel, si on peut cibler un élément qui en suit un autre, on ne peut pas cibler un élément qui en précède un autre
- [ ] Indiquer que les champs (labels de champ) suivi d'un "\*" sont obligatoires
