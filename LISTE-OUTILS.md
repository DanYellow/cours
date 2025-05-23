# Liste des outils utilisés pour gérer les ressources

## Captures d'écran
- [Cadre pour captures d'écran - screely.com](https://screely.com/editor)
- [Capture d'écran pour code - chalk.ist](https://chalk.ist/?ref=tiny-helpers)
  - [Preset du thème utilisé (clair)](https://chalk.ist/?import=eNpdU9FuGjEQ%2FJXKfQUJWopSHhOpTaU0iUqktI%2BLzwcWPu%2FJ3suFIv69Y3Mcd4Unz%2B6OZ9ZzR%2FVmQrTs1Wo%2BUXKojVqpOphoRE2Upyqdq8riAEis30a1OqoN6X0RuEZxzc4WKF%2BgR7YRQyW5aCZKs%2BPwsjOZR5PUdaO19VNHIgZTuonCVddwVCUHsw3c%2BALtH8v823xG3xsFSxuXWDp4uUzjXFXGyxVdJCl7c2g5DChuNNC68Voakmx2RB4lwNigfZa8N9XGhP86oc68J9dDsEzEI1ad7uPaBBIeUEDyCe3s5RtV1h1Q%2BW5slA8%2F2XMiQuXBbkkaPEC%2FwoSu7V9Yn9%2FgFPAm98Zud3D9abHokFdbyE6tFnMA1nsTnqkoYOo3mmZj6E%2Bamyhn%2FYAH6%2BkH0N8d0IpDMKUzncNOU9xRwe0TsuMo2fDs02vGHbe3yMHlCSU0uZnbB9z2mDd6NZbwZwpitRvYTehLaxGPcEvF9hqlVHglwBWF%2FRi1Hmr661IghyqwfoN%2FCYFNNHfDxHUk7YX2qSZtBY6%2BwHebae%2Bw%2FsAOAlVFepoDDaZzcRz2M7aWQ87pZSesLbkfOufjHYBLOz9LvrTmdHuZznviq%2F5e0tde0jpvH4rmsx67B2tmTjA%2B5Y4Gn4EJv6iwDfDl6fQPprpZAA%3D%3D)

## Mise en page de code
- Surlignement du code :
  - [Surlignement de code - https://highlight.hohli.com/?theme=hybrid](https://highlight.hohli.com/)
    - Thème : hybrid en sombre (il faut parfois changer puis remettre le thème "hybrid")
  - [pinetools.com](https://pinetools.com/syntax-highlighter)
    - Thème : Tomorrow Night Bright - Utilisé pour le javascript et le CSS
  - [codebeautify.org](https://codebeautify.org/code-highlighter)
    - Thème : VS 2015 - Utilisé pour le HTML et assimilés

  Une fois le code html généré récupéré et mis dans le fichier html des consignes de la ressource, il faudra rajouter le data-attribute "data-code-allow-copy" pour rajouter du CSS permettant d'embellir le snippet de code.

### Exemple utilisation

```html
<pre data-code-sample='{"allowCopy": true, "title": "Exemple"}' style="[...]">
  <!-- [...] -->
</pre>
```

La balise `<pre>` utilisée pour afficher proprement un snippet de code prend en paramètre le data-attribute "data-code-sample" qui attend un objet contenant deux clés :
- title : Affiche un titre pour le snippet de code. Optionnel
- allowCopy : Ajoute un bouton "copier" qui copie le code dans le presse-papier. false par défaut

> Note : Si vous n'avez pas besoin de permettre la copie du snippet de code ou d'afficher de titre, vous pouvez mettre juste le data-attribute "data-code-sample".

### Système d'onglets

Pour permettre l'organisation plus souple des ressources des TP, il est possible d'organiser une partie avec des onglets.

Pour fonctionner, il faut **impérativement** importer les ressources suivantes dans le fichier html :

```html
    <link
      rel="stylesheet"
      href="https://danyellow.net/cours-mmi/consignes.css"
    />
    <script src="https://danyellow.net/cours-mmi/consignes.js" defer></script>
```
> Note : Les fichiers originaux sont à la racine de ce dépôt
> - Certaines ressources utilisent encore scripts.js au lieu de consignes.js, vous pouvez faire le remplacement si nécessaire
>
> Note 2 : A chaque modification, ces fichiers sont déployés automatiquement via la CI/CD de GitHub
> Note 3 : Le CSS du système gère aussi bien le dark et que light mode


### Exemple d'utilisation

```html
<div class="tab-wrapper" role="tablist">
  <ul class="list-tabs">
    <li>
      <button class="select-tab" data-tab-name="onglet-a">Onglet 1</button>
    </li>
    <li>
      <button class="select-tab" data-tab-name="onglet-b">
        Onglet 2
      </button>
    </li>
  </ul>
  <ul class="list-tab-content">
    <li class="tab-content" data-tab-content="onglet-a">
      <!-- [...] -->
    </li>
    <li class="tab-content" data-tab-content="onglet-b">
      <!-- [...] -->
    </li>
  </ul>
</div>

```
