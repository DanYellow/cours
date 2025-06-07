const quotesJSON = /(")({.+})(")/g;

const generateSourceCode = ($el, inner = true) => {
    let sourceCode = $el[inner ? "innerHTML" : "outerHTML"];
    sourceCode = sourceCode.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    sourceCode = sourceCode.trim();
    sourceCode = sourceCode.replace(quotesJSON, "'$2'");

    return sourceCode;
}

document.querySelectorAll("[data-generate-source-code]").forEach((e) => {
    const template = document.querySelector('[data-tpl-id="source-code"]');
    const target = document.importNode(template.content, true);

    target.querySelector("code").innerHTML = generateSourceCode(e);

    e.after(target);
});

document
    .querySelector("[data-display-source-code]")
    .addEventListener("change", (e) => {
        document
            .querySelectorAll("[data-source-code]")
            .forEach(
                ($el) =>
                    ($el.style.display = e.currentTarget.checked
                        ? "block"
                        : "none")
            );
    });

const codeSampleExample = document.querySelector('[data-generate-source-code="code-example"] [data-code-sample]')

const codeSampleExampleClone = codeSampleExample.cloneNode(true);
codeSampleExampleClone.hidden = true;
delete codeSampleExampleClone.dataset.codeSample;
document.body.appendChild(codeSampleExampleClone);

const listInputs = document.querySelectorAll("[data-modify-sample-code]");

const dictOptions = {
    "title": "Exemple de code",
    "displayLineCode": true,
    "linesHighlighted": "4, 11, 5",
    "allowCopy": true,
    "linesLinked": [[4, 11]],
    "language": "JavaScript",
}


const dictFunctions = {
    "title": (isEnabled, $el) => {
        const title = prev($el, ".header-code-sample").querySelector(".title");
        title.hidden = !isEnabled;
    },
    "displayLineCode": (isEnabled, $el) => {
        $el.querySelectorAll(".line-number").forEach((line) => {
            if (isEnabled) {
            line.attributeStyleMap?.delete("display");
        } else {
            line.style.display = "none";
        }
        })
    },
    "linesHighlighted": (isEnabled, $el) => {
        const baseColor = "rgba(255, 255, 255, 0.07)";
        const color = window.matchMedia('(prefers-color-scheme: dark)').matches ?
                baseColor :
                `rgb(from ${baseColor} calc(255 - r) calc(255 - g) calc(255 - b))`
        $el.querySelectorAll(".code-line-highlighted").forEach((line) => {
            line.style.setProperty(
                '--line-highlighted-start-color',
                isEnabled ? color : "transparent"
                '--line-highlighted-start-color',
                isEnabled ? lineHighlightedStartColor : "transparent"
            );
        })
    },
    "allowCopy": (isEnabled, $el) => {
        const copyButton = prev($el, ".header-code-sample").querySelector(".copy-button");
        copyButton.hidden = !isEnabled;
        if (isEnabled) {
            copyButton.attributeStyleMap?.delete("display");
        } else {
            copyButton.style.display = "none";
        }
    },
    "linesLinked": (isEnabled, $el) => {

    },
    "language": (isEnabled, $el) => {
        $el.dataset.language = isEnabled ? dictOptions["language"] : "";
    },
}

function next(el, selector) {
    const nextEl = el.nextElementSibling;
    if (!selector || (nextEl && nextEl.matches(selector))) {
        return nextEl;
    }
    return null;
}

function prev(el, selector) {
    const prevEl = el.previousElementSibling;
    if (!selector || (prevEl && prevEl.matches(selector))) {
        return prevEl;
    }
    return null;
}

listInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
        const optionSelected = e.currentTarget.dataset.modifySampleCode;
        const codeSampleExampleOptions = JSON.parse(codeSampleExample.dataset.codeSample);

        if (e.currentTarget.checked) {
            codeSampleExampleOptions[optionSelected] = dictOptions[optionSelected];
        } else {
            delete codeSampleExampleOptions[optionSelected];
        }

        dictFunctions[optionSelected](e.currentTarget.checked, codeSampleExample);
        codeSampleExample.dataset.codeSample = JSON.stringify(codeSampleExampleOptions);
        codeSampleExampleClone.dataset.codeSample = JSON.stringify(codeSampleExampleOptions);

        codeSampleExampleClone.removeAttribute("hidden");
        next(document.querySelector('[data-generate-source-code="code-example"]'), "[data-source-code]")
            .querySelector(".code-exemple").innerHTML = generateSourceCode(codeSampleExampleClone, false);
        codeSampleExampleClone.hidden = true;
    })
})
