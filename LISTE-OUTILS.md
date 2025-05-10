# Liste des outils utilisés pour gérer les ressources

- [Cadre pour captures d'écran - screely.com](https://screely.com/editor)
- [Capture d'écran pour code - chalk.ist](https://chalk.ist/?ref=tiny-helpers)
  - [Preset du thème utilisé (clair)](https://chalk.ist/?import=eNpdU9FuGjEQ%2FJXKfQUJWopSHhOpTaU0iUqktI%2BLzwcWPu%2FJ3suFIv69Y3Mcd4Unz%2B6OZ9ZzR%2FVmQrTs1Wo%2BUXKojVqpOphoRE2Upyqdq8riAEis30a1OqoN6X0RuEZxzc4WKF%2BgR7YRQyW5aCZKs%2BPwsjOZR5PUdaO19VNHIgZTuonCVddwVCUHsw3c%2BALtH8v823xG3xsFSxuXWDp4uUzjXFXGyxVdJCl7c2g5DChuNNC68Voakmx2RB4lwNigfZa8N9XGhP86oc68J9dDsEzEI1ad7uPaBBIeUEDyCe3s5RtV1h1Q%2BW5slA8%2F2XMiQuXBbkkaPEC%2FwoSu7V9Yn9%2FgFPAm98Zud3D9abHokFdbyE6tFnMA1nsTnqkoYOo3mmZj6E%2Bamyhn%2FYAH6%2BkH0N8d0IpDMKUzncNOU9xRwe0TsuMo2fDs02vGHbe3yMHlCSU0uZnbB9z2mDd6NZbwZwpitRvYTehLaxGPcEvF9hqlVHglwBWF%2FRi1Hmr661IghyqwfoN%2FCYFNNHfDxHUk7YX2qSZtBY6%2BwHebae%2Bw%2FsAOAlVFepoDDaZzcRz2M7aWQ87pZSesLbkfOufjHYBLOz9LvrTmdHuZznviq%2F5e0tde0jpvH4rmsx67B2tmTjA%2B5Y4Gn4EJv6iwDfDl6fQPprpZAA%3D%3D)
- Surlignement du code :
  - [Surlignement de code - https://highlight.hohli.com/?theme=hybrid](https://highlight.hohli.com/)
    - Thème : hybrid en sombre (il faut parfois changer puis remettre le thème "hybrid")
  - [pinetools.com](https://pinetools.com/syntax-highlighter)
    - Thème : Tomorrow Night Bright - Utilisé pour le javascript et le CSS
  - [codebeautify.org](https://codebeautify.org/code-highlighter)
    - Thème : VS 2015 - Utilisé pour le HTML et assimilés
  - Une fois le code html généré récupéré et mis dans les consignes, il faudra rajouter le data-attribute "data-code-allow-copy" pour rajouter du CSS permettant d'embellir le snippet de code

## Exemple insertion code surligné

La balise &lt;pre> utilisée pour afficher proprement un snippet de code prend en paramètre le data-attribute "data-code-sample" qui attend un objet contenant deux clés :
- title : Affiche un titre pour le snippet de code (optionnel)
- allowCopy : Ajoute un bouton "copier" qui copie le code dans le presse-papier. True par défaut

<pre><code id="htmlViewer" style="color:rgb(220, 220, 220); font-weight:400;background-color:rgb(30, 30, 30);background:rgb(30, 30, 30);display:block;padding: .5em;"><span style="color:rgb(220, 220, 220); font-weight:400;">&lt;</span>pre data<span style="color:rgb(220, 220, 220); font-weight:400;">-</span>code<span style="color:rgb(220, 220, 220); font-weight:400;">-</span>sample<span style="color:rgb(220, 220, 220); font-weight:400;">=</span>&#x27;{<span style="color:rgb(214, 157, 133); font-weight:400;">&quot;title&quot;</span>: <span style="color:rgb(214, 157, 133); font-weight:400;">&quot;Mon titre&quot;</span>, <span style="color:rgb(214, 157, 133); font-weight:400;">&quot;allowCopy&quot;</span>: <span style="color:rgb(86, 156, 214); font-weight:400;">true</span>}&#x27; style<span style="color:rgb(220, 220, 220); font-weight:400;">=</span><span style="color:rgb(214, 157, 133); font-weight:400;">&quot;[...]&quot;</span><span style="color:rgb(220, 220, 220); font-weight:400;">&gt;</span>[<span style="color:rgb(220, 220, 220); font-weight:400;">...</span>]<span style="color:rgb(220, 220, 220); font-weight:400;">&lt;/</span>pre<span style="color:rgb(220, 220, 220); font-weight:400;">&gt;</span></code></pre>
