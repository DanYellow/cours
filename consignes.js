const DOM = {
    listCodeSamples: document.querySelectorAll("[data-code-sample]"),
}

const getFirstTabName = (tabList) => {
    const firstTab = tabList.querySelectorAll("[data-tab-name]")[0];
    firstTab.classList.add("active");
    firstTab.setAttribute("aria-selected", "true");
    firstTab.removeAttribute("tabIndex");

    return firstTab.dataset.tabName;
}

const openTab = (e) => {
    const currentTabContainer = e.target.closest('[role="tablist"]')
    currentTabContainer.querySelectorAll("[data-tab-content]").forEach((item) => {
        item.style.display = "none";
        item.setAttribute("role", "tabpanel");
    });

    currentTabContainer.querySelectorAll("[data-tab-name]").forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
    });

    currentTabContainer.querySelector(
        `[data-tab-content="${e.target.dataset.tabName}"]`
    ).style.display = "block";

    const currentTab = currentTabContainer.querySelector(
        `[data-tab-name="${e.target.dataset.tabName}"]`
    )
    currentTab.style.display = "block";
    currentTab.classList.add("active");
    currentTab.setAttribute("aria-selected", "true");
    currentTab.removeAttribute("tabIndex");

    currentTabContainer.querySelectorAll('[role="tablist"]').forEach((tablist, tabSystemIdx) => {
        const firstTabName = getFirstTabName(tablist);

        if (tablist.querySelectorAll("[data-tab-content]").length) {
            tablist.querySelector(`[data-tab-content="${firstTabName}"]`).style.display = "block";
        }
    })
};

document.querySelectorAll('[role="tablist"]').forEach((tablist, tabSystemIdx) => {
    tablist.querySelectorAll("[data-tab-name]").forEach((item, idx) => {
        item.addEventListener("click", openTab);
        item.classList.add("select-tab");
        item.setAttribute("role", "tab");
        item.setAttribute("aria-selected", "false");
        item.setAttribute("aria-controls", `tab-system-${tabSystemIdx}-tab-${idx}`);

        item.id = `tab-${tabSystemIdx}-tab-${idx}`;
    });

    const firstTabName = getFirstTabName(tablist);

    if (tablist.querySelectorAll("[data-tab-content]").length) {
        tablist.querySelector(`[data-tab-content="${firstTabName}"]`).style.display = "block";
        tablist.querySelectorAll("[data-tab-content]").forEach((tabContent, idx) => {
            tabContent.setAttribute("role", "tabpanel");
            tabContent.setAttribute("tabindex", "0");
            tabContent.setAttribute("aria-labelledby", `tab-${tabSystemIdx}-tab-${idx}`);
            tabContent.setAttribute("id", `tab-system-${tabSystemIdx}-tab-${idx}`);
        });
    }
});

const url = new URL(window.location);

const accordionIndex = Number(url.searchParams?.get("a") || 0);
const listInstructionSummary = document.querySelectorAll(".consignes-conteneur > summary");

listInstructionSummary.forEach((item, idx) => {
    item.addEventListener("click", () => {
        if(listInstructionSummary[idx].closest("details").open) {
            url.searchParams.delete("a", idx);
        } else {
            url.searchParams.set("a", idx);
        }
        history.replaceState(null, "", url);
    });

    listInstructionSummary[idx].closest("details").open = accordionIndex === idx;
});


const generateCopyCodeButton = ($el) => {
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copier";
    copyButton.style.padding = "0.5rem";
    copyButton.style.display = "flex";
    copyButton.style.gap = "0.2rem";
    copyButton.style.justifyContent = "center";
    copyButton.style.alignSelf = "start";

    const imgButton = document.createElement("img");
    imgButton.style.transition = "width 350ms";
    imgButton.style.width = "0";
    imgButton.alt = "";

    copyButton.append(imgButton);

    copyButton.addEventListener("click", () => {
        $el.classList.add("copie");
        copyButton.inert = true;
        navigator.clipboard.writeText(
            $el.innerText.replaceAll(regexLineCode, "")
        )
        imgButton.style.width = "0.95rem";

        imgButton.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0ic2l6ZS01Ij4NCiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYuNzA0IDQuMTUzYS43NS43NSAwIDAgMSAuMTQzIDEuMDUybC04IDEwLjVhLjc1Ljc1IDAgMCAxLTEuMTI3LjA3NWwtNC41LTQuNWEuNzUuNzUgMCAwIDEgMS4wNi0xLjA2bDMuODk0IDMuODkzIDcuNDgtOS44MTdhLjc1Ljc1IDAgMCAxIDEuMDUtLjE0M1oiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4NCjwvc3ZnPg0K";
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            imgButton.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0id2hpdGUiIGNsYXNzPSJzaXplLTUiPg0KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNi43MDQgNC4xNTNhLjc1Ljc1IDAgMCAxIC4xNDMgMS4wNTJsLTggMTAuNWEuNzUuNzUgMCAwIDEtMS4xMjcuMDc1bC00LjUtNC41YS43NS43NSAwIDAgMSAxLjA2LTEuMDZsMy44OTQgMy44OTMgNy40OC05LjgxN2EuNzUuNzUgMCAwIDEgMS4wNS0uMTQzWiIgY2xpcC1ydWxlPSJldmVub2RkIiAvPg0KPC9zdmc+DQo=";
        }

        setTimeout(() => {
            $el.classList.add("fin-copie");
            $el.classList.remove("copie");
            imgButton.style.width = "0";
            copyButton.inert = false;
        }, 1500);
    });

    return copyButton;
}

const generateHighlightedLines = (linesToHighlight, lineHeight, linesLinked, codeSample) => {
    if (!linesToHighlight.length) {
        return;
    }

    lineHeight = Math.ceil(lineHeight);

    let output = "";
    codeSample.getHTML().split("\n").forEach((line, idx) => {
        const lineNumber = idx + 1;
        const nextLine = linesToHighlight.includes(lineNumber) ?
            `<div data-number="${lineNumber}" class="code-line-highlighted">${line}</div>` :
            `${line}\n`
        ;
        output += nextLine;
    });

    codeSample.innerHTML = output;

    codeSample.querySelectorAll(".code-line-highlighted").forEach((item) => {
        item.addEventListener('mouseover', e => {
            const lineGroup = e.currentTarget.dataset.lineGroup;
            document.querySelectorAll(`.code-line-highlighted[data-line-group="${lineGroup}"]`).forEach((line) => {
                line.classList.add("hover");
            });
        })

        item.addEventListener('mouseout', e => {
            const lineGroup = e.currentTarget.dataset.lineGroup;
            document.querySelectorAll(`.code-line-highlighted[data-line-group="${lineGroup}"]`).forEach((line) => {
                line.classList.remove("hover");
            });
        })
    })

    linesLinked.forEach((item, idx) => {
        item.forEach((line) => {
            const lineHighlighted = document.querySelector(`.code-line-highlighted[data-number="${line}"]`);
            if (lineHighlighted) {
                lineHighlighted.dataset.lineGroup = idx;
            }
        })
    })
}

const regexCopyText = /copier$/i;
const regexLineCode = /^\d+/gim;
const regexBeginningSpace = /^ /gm;

const rootElement = document.querySelector(':root');
const rootElementStyle = getComputedStyle(rootElement);

DOM.listCodeSamples.forEach((item) => {
    const codeSampleData = JSON.parse(item.dataset?.codeSample || "{}");
    const codeTitle = codeSampleData?.title || "";
    const allowCopy = codeSampleData?.allowCopy || false;
    const displayLineCode = codeSampleData?.displayLineCode || false;
    const linesHighlighted = (
        Array.isArray(codeSampleData?.linesHighlighted) ?
            codeSampleData?.linesHighlighted.filter(Number.isInteger) :
            (String(codeSampleData?.linesHighlighted || ""))
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item.length)
                .map((item) => Number(item))
                .filter(Number.isInteger)
    );

    const isNestedArray = Array.isArray(codeSampleData?.linesLinked) && codeSampleData?.linesLinked.flat().length != codeSampleData?.linesLinked.length;
    const linesLinked = isNestedArray ?
        codeSampleData?.linesLinked.map(a => a.filter(Number.isInteger)) :
        [];

    const language = codeSampleData?.language;

    const greenColor = getComputedStyle(document.documentElement).getPropertyValue("--green-code");

    item.classList.add("code-snippet");
    item.style.borderRadius = "0 0 0.5rem 0.5rem";

    item.style.border = `1px solid ${greenColor}`;
    item.style.paddingInline = "1rem";
    item.style.paddingBlock = "0.75rem";
    item.style.fontSize = "1.25rem";
    item.style.marginBottom = "1.25rem";
    item.style.marginTop = "0";
    item.style.position = "relative";
    item.style.backgroundColor = rootElementStyle.getPropertyValue('--background-color-code');
    item.style.overflowX = "auto";

    item.style.removeProperty("font-family");

    if (item.querySelector(":scope > ol")) {
        item.querySelector(":scope > ol").style.marginBlock = "0";
    }

    if (displayLineCode) {
        // Display line code
        item.innerHTML = item.getHTML().split('\n').map((line, index) => `<span class="line-number">${index + 1}</span>${line}`).join('\n')
        item.addEventListener("copy", (e) => {
            const selection = document.getSelection();
            e.clipboardData.setData("text/plain", selection.toString());
            e.preventDefault();
        });

        const listLineNumbers = Array.from(item.querySelectorAll(".line-number"));
        listLineNumbers.at(0).classList.add("first");
        listLineNumbers.at(-1).classList.add("last");
    }

    generateHighlightedLines(linesHighlighted, item.firstElementChild.offsetHeight, linesLinked, item);

    if (language && !("language" in item.dataset)) {
        item.dataset.language = language;
    }

    if (!allowCopy && codeTitle.trim() === "") {
        item.style.marginTop = "1.25rem";
        item.style.borderRadius = "0.5rem";

        return;
    }

    const codeHeader = document.createElement("header");
    codeHeader.style.backgroundColor = greenColor;
    codeHeader.classList.add("header-code-sample");

    const parentNodeCode = item.parentNode;
    parentNodeCode.insertBefore(codeHeader, item);

    item.style.userSelect = "all";

    if (codeTitle.trim() !== "") {
        const codeTitleTag = document.createElement("p");
        codeTitleTag.textContent = codeTitle;
        codeTitleTag.classList.add("title", "fire-code");

        codeHeader.append(codeTitleTag);
    }

    if(allowCopy) {
        codeHeader.append(generateCopyCodeButton(item));
    }

    item.addEventListener("transitionend", () => {
        if (item.classList.contains("fin-copie")) {
            item.classList.remove("fin-copie");
        }
    });
});

const getChildren = ($el) => {
    const listChildren = [];
    const recursor = ($el) => {
        if($el.childNodes.length) {
            $el.childNodes.forEach((child) => {
                if (child.childNodes.length) {
                    listChildren.push(child);
                    recursor(child);
                }
            });
        }
    }

    recursor($el);
    return listChildren;
}

const invertCodeSampleColors = () => {
    DOM.listCodeSamples.forEach((item) => {
        item.style.color = `rgb(from ${item.style.color} calc(255 - r) calc(255 - g) calc(255 - b))`;

        const listChildren = getChildren(item);
        listChildren.forEach((child) => {
            const currentColor = child?.style?.color;
            if (currentColor) {
                child.style.color = `rgb(from ${currentColor} calc(255 - r) calc(255 - g) calc(255 - b))`;
            }

            const currentBGColor = window.getComputedStyle(child).getPropertyValue('--start-color')
            if (currentBGColor) {
                child.style.setProperty(
                    '--start-color',
                    `rgb(from ${currentBGColor} calc(255 - r) calc(255 - g) calc(255 - b))`
                );
            }
        });
    });
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    invertCodeSampleColors();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    invertCodeSampleColors();
});
