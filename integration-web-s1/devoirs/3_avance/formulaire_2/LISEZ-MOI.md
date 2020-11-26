# Devoir 1 sur les formulaires

Le but de ce devoir est de tester vos connaissances sur les formulaires à travers ce que nous avons pu voir en cours et dans les leçons.

## But de cet exercice

Afficher un formulaire contenant les champs suivants :

- Nom du site : champ texte
  - clé : nom_site
  - obligatoire : oui
  - placeholder : exemple.com
- Url du site : champ url
  - clé : url_site
  - obligatoire : oui
  - placeholder : http://example.com
- Courriel du webmaster : champ email
  - clé : email_webmaster
  - obligatoire : oui
  - placeholder : holden.caulfield@yopmail.com
- Téléphone du webmaster : champ téléphone
  - clé : tel_webmaster
  - obligatoire : non
  - placeholder : numéro de votre choix
- target : liste
  - clé : "target"
  - obligatoire : oui
  - Liste valeurs :
    - Choisir une valeur (value vide)
    - Même onglet -> \_self
    - Autre onglet / fenêtre -> \_blank
  - Utiliser un [générateur pour la liste](https://accessify.com/tools-and-wizards/developer-tools/insta-select/)

Les données doivent passer dans le corps de la requête. Bien évidemment le formulaire doit être accessible, il ne donc faut pas oublier la balise `<label>` et les attributs qui vont avec.
N'oubliez pas flexbox, c'est un très bon allié pour la mise en page, et pour vous aider, vous avez les classes `.conteneur-champ` et `.conteneur-choix` (pour les inputs type radio/checkbox + label) qui sont déjà prêtes pour ça.

[Documentation de la balise `<input>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input)

Pour vous assurer que vous avez bien réalisé les consignes, voici une liste de contrôles que vous pouvez cocher au fur et à mesure de votre progression :

- [x] Lecture des consignes
- [ ] Ajout du champ "Nom du site"
- [ ] Ajout du champ "Url du site"
- [ ] Ajout du champ "Email du webmaster"
- [ ] Ajout du champ "Téléphone du webmaster"
- [ ] Ajout du champ "target"

# Allez plus loin

Si _le mieux est l’ennemi du bien_, on peut quand même se permettre d'aller un peu plus loin.

- [ ] Afficher de façon personnalisée le choix sélectionnée dans la liste déroulante. On ne doit plus voir la flèche à droite du `<select>` elle doit être remplacée par une image (vectorielle ou matricielle)
  - Rappelez-vous qu'on peut imbriquer des balises, changer la taille des balises grâce à la propriété `width` et cacher les éléments qui dépassent grâce à la déclaration `overflow: hidden`
- [ ] Indiquer les champs (labels de champ) optionels
- [ ] Autoriser uniquement les adresses https:// pour le champ "url_site"
- [ ] La longueur maximale de l'url doit être de 42 caractères
