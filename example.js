const quotesJSON = /(")({.+})(")/g;
document.querySelectorAll("[data-generate-source-code]").forEach((e) => {
    const template = document.querySelector('[data-tpl-id="source-code"]');
    const target = document.importNode(template.content, true);

    let sourceCode = e.innerHTML;
    sourceCode = sourceCode.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    sourceCode = sourceCode.trim();
    target.querySelector("code").innerHTML = sourceCode.replace(
        quotesJSON,
        "'$2'"
    );

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
console.log(codeSampleExample)

document.querySelectorAll("[data-modify-sample-code]").forEach((input) => {
    input.addEventListener("change", (e) => {

        console.log(codeSampleExample.dataset, e.currentTarget.dataset.modifySampleCode)
    })
})
