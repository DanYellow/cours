const DOM = {
    listCodeSamples: document.querySelectorAll("[data-code-sample]"),
}

const regex = /{{\s?template:(\w+)\s?}}/;

const getTemplate = (value) => {
    const tplId = value.match(regex)[1];
    const tpl = document.querySelector(`template[data-template-id="${tplId}"]`)

    return tpl ? tpl.innerHTML : "";
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
    copyButton.classList.add("copy-button")

    const imgButton = document.createElement("img");
    imgButton.style.transition = "width 350ms";
    imgButton.style.width = "0";
    imgButton.alt = "";

    copyButton.append(imgButton);

    copyButton.addEventListener("click", () => {
        $el.classList.add("copie");
        copyButton.inert = true;

        const copyEl = document.createElement('div');
        copyEl.innerHTML = $el.innerHTML;
        for (const div of copyEl.querySelectorAll(".code-line-highlighted")) {
            div.replaceWith(...[...div.childNodes, "\n"]);
        }
        navigator.clipboard.writeText(
            copyEl.innerText.replaceAll(regexLineCode, "")
        );

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

const generateHighlightedLines = (linesToHighlight, lineHeight, linesLinked, codeSample, number) => {
    if (!linesToHighlight.length) {
        return;
    }

    lineHeight = Math.ceil(lineHeight);

    let output = "";
    codeSample.getHTML().split("\n").forEach((line, idx) => {
        const lineNumber = idx + 1;
        const nextLine = linesToHighlight.includes(lineNumber) ?
            `<div data-line-number="${lineNumber}" class="code-line-highlighted">${line}</div>` :
            `${line}\n`
        ;
        output += nextLine;
    });

    codeSample.innerHTML = output;

    codeSample.querySelectorAll("[data-line-number]").forEach((item) => {
        item.addEventListener('mouseover', e => {
            const lineGroup = e.currentTarget.dataset.lineGroup;
            const lineNumber = e.currentTarget.dataset.lineNumber;
            codeSample.querySelectorAll(`.code-line-highlighted[data-line-group="${lineGroup}"]`).forEach((line) => {
                line.classList.add("hover");
            });

            document.querySelectorAll(`[data-code-explanation-table="${number}"] [data-highlighted-lines]`).forEach((row) => {
                if(row.dataset.highlightedLines.split(",").includes(lineNumber)) {
                    row.classList.add("hover");
                }
            });
        })

        item.addEventListener('mouseout', e => {
            const lineGroup = e.currentTarget.dataset.lineGroup;
            const lineNumber = e.currentTarget.dataset.lineNumber;
            codeSample.querySelectorAll(`.code-line-highlighted[data-line-group="${lineGroup}"]`).forEach((line) => {
                line.classList.remove("hover");
            });

            document.querySelectorAll(`[data-code-explanation-table="${number}"] [data-highlighted-lines]`).forEach((row) => {
                if(row.dataset.highlightedLines.split(",").includes(lineNumber)) {
                    row.classList.remove("hover");
                }
            });
        })
    })

    linesLinked.forEach((item, idx) => {
        item.forEach((line) => {
            const lineHighlighted = codeSample.querySelector(`.code-line-highlighted[data-line-number="${line}"]`);
            if (lineHighlighted) {
                lineHighlighted.dataset.lineGroup = idx;
            }
        })
    })
}

const generateFooterCredits = () => {
    const tpl = `
        <footer class="footer">
            <img width="30" src="https://danyellow.net/cours-mmi/favicon.png" alt="logo CYU" />
            <p>${document?.title || ""}</p>
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', tpl);
}
generateFooterCredits();

const generateCodeExplanation = ($el, jsonData, idx) => {
    const getContentLines = (listLines) => {
        let res = "";
        listLines.forEach((line) => {
            res += `
                <code>${document.querySelector(`[data-line-number="${line}"]`).textContent.replaceAll(regexLineCode, "")}</code>
            `
        })

        return res;
    }

    if(!Object.keys(jsonData).length) {
        return;
    }

    const codeSampleData = JSON.parse($el.dataset?.codeSample || "{}");
    let codeTitle = $el.dataset?.title || codeSampleData?.title || "";
    codeTitle = codeTitle.trim().length ? `<a href="#code-sample-${idx}">"${codeTitle}"</a>` : "";

    const generateRows = (lines) => {
        let res = [];
        Object.entries(lines).forEach(([key, value]) => {
            const content = regex.test(value) ? getTemplate(value) : value;
            res.push({
                firstLine: Number(key.split("-").at(0)),
                content: `
                    <tr data-highlighted-lines="${key.split("-").join(",")}">
                        <th scope="row">${key.split("-").join(" - ")}</th>
                        <td>${content}</td>
                    </tr>
                `
            });
        });

        return res;
    }

    let rowsRaw = generateRows(jsonData);
    rowsRaw = rowsRaw.sort(({firstLine:a}, {firstLine:b}) => a-b);

    const rows = rowsRaw.map((item) => item.content);

    const tpl = `
        <table class="code-explanation" data-code-explanation-table="${idx}">
        <caption style="text-align: start;font-size: 1.25rem;font-weight: bold;margin-top: 1rem;">Explication du code ${codeTitle}</caption>
            <thead>
                <tr>
                    <th>Ligne(s)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${rows.join("")}
            </tbody>
        </table>
    `;

    $el.insertAdjacentHTML('afterend', tpl);
}

const regexLineCode = /^\d+/gim;

const rootElement = document.querySelector(':root');
const rootElementStyle = getComputedStyle(rootElement);

const trycatch = (func, fail) => {
    try { return func(); }
    catch(e) { return fail; }
}

DOM.listCodeSamples.forEach((item, idx) => {
    const codeSampleData = JSON.parse(item.dataset?.codeSample || "{}");
    const codeTitle = item.dataset?.title || codeSampleData?.title || "";
    const allowCopy = ("allowCopy" in item.dataset) || codeSampleData?.allowCopy || false;
    const displayLineCode = ("displayLineCode" in item.dataset) || codeSampleData?.displayLineCode || false;
    const jsonId = ("id" in item.dataset) || codeSampleData?.id || ("jsonId" in item.dataset) || codeSampleData?.jsonId || null;

    const linesHighlightedRaw = (item.dataset?.linesHighlighted || codeSampleData?.linesHighlighted)
    const linesHighlighted = (
        Array.isArray(linesHighlightedRaw) ?
            linesHighlightedRaw.filter(Number.isInteger) :
            (String(linesHighlightedRaw || ""))
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item.length)
                .map((item) => Number(item))
                .filter(Number.isInteger)
    );

    const linesLinkedRaw = trycatch(() => JSON.parse(item.dataset?.linesLinked), null) || codeSampleData?.linesLinked;
    const isNestedArray = Array.isArray(linesLinkedRaw) && linesLinkedRaw.flat().length != linesLinkedRaw.length;
    const linesLinked = isNestedArray ?
        linesLinkedRaw.map(a => a.filter(Number.isInteger)) :
        [];

    const language = codeSampleData?.language;

    const greenColor = "var(--green-code)";

    item.classList.add("code-snippet");

    item.style.borderRadius = "0 0 0.5rem 0.5rem";
    item.style.border = `1px solid ${greenColor}`;
    item.style.paddingInline = "1rem";
    item.style.paddingBlock = "0.75rem";
    item.style.fontSize = "1.25rem";
    item.style.marginBottom = "1.25rem";
    item.style.marginTop = "0";
    item.style.position = "relative";
    item.style.backgroundColor = "var(--background-color-code)";
    item.style.overflowX = "auto";

    item.id = `code-sample-${idx}`;

    item.style.removeProperty("font-family");

    if (item.querySelector(":scope > ol")) {
        item.querySelector(":scope > ol").style.marginBlock = "0";
    }

    if (displayLineCode) {
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

    if (jsonId) {
        const jsonData = trycatch(() => JSON.parse(document.querySelector?.(`[data-code-sample-id='${jsonId}'], [data-json-id='${jsonId}']`)?.textContent.trim()), {})
        generateCodeExplanation(item, jsonData, idx);
    }

    if (item.firstElementChild) {
        generateHighlightedLines(linesHighlighted, item.firstElementChild.offsetHeight, linesLinked, item, idx);
    }

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

    if (codeTitle.trim() !== "") {
        const codeTitleTag = document.createElement("p");
        codeTitleTag.textContent = codeTitle;
        codeTitleTag.classList.add("title", "fire-code");

        codeHeader.append(codeTitleTag);
    }

    if(allowCopy) {
        item.style.userSelect = "all";
        codeHeader.append(generateCopyCodeButton(item));
    }

    item.addEventListener("transitionend", () => {
        if (item.classList.contains("fin-copie")) {
            item.classList.remove("fin-copie");
        }
    });
});

document.querySelectorAll('[data-highlighted-lines]').forEach((line) => {
    line.addEventListener("mouseover", (e) => {
        const listHighlightedLines = e.currentTarget.dataset.highlightedLines.split(",");
        listHighlightedLines.map((item) => item.trim()).forEach((lineNumber) => {
            document.querySelector(`[data-line-number="${lineNumber}"]`)?.classList.add("hover");
        });
    })

    line.addEventListener('mouseout', e => {
        const listHighlightedLines = e.currentTarget.dataset.highlightedLines.split(",");
        listHighlightedLines.map((item) => item.trim()).forEach((lineNumber) => {
            document.querySelector(`[data-line-number="${lineNumber}"]`)?.classList.remove("hover");
        });
    })
})

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
        });
    });
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    invertCodeSampleColors();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    invertCodeSampleColors();
});

document.querySelectorAll("[data-formula]").forEach((item) => {
    const listVariablesExplanation = item.querySelectorAll("[data-var-explanation]")

    const tpl = `
        <ul class="formula-explanation">
            __replace__
        </ul>
    `;

    const listItems = [];
    listVariablesExplanation.forEach((formulaEl) => {
        listItems.push(`<li><span class="texte-gras">${formulaEl.textContent}</span> : ${formulaEl.dataset.varExplanation}</li>`)
    });
    item.insertAdjacentHTML('afterend', tpl.replace("__replace__", listItems.join("")));
})


;(() => {
    if (!window.CSS.supports('position-area', 'start')) {
        return;
    }

    const tooltipJsonData = trycatch(() => JSON.parse(document.querySelector?.('[data-anchor-json]')?.textContent.trim()), {})

    Object.entries(tooltipJsonData).forEach(([key, value]) => {
        const anchor = document.querySelector(`[data-anchor="${key}"]`)
        anchor.style.anchorName = `--${key}`;
        anchor.classList.add("anchor");
        anchor.ariaDescribedBy = `anchor-${key}`;

        const content = regex.test(value) ? getTemplate(value) : value;

        const anchorTarget = `
            <div class="tooltip" role="tooltip" id="anchor-${key}" data-anchor-target="${key}" style="position-anchor: --${key};">
                ${content}
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', anchorTarget);

        anchor.addEventListener('mouseover', () => {
            document.body.querySelector(`[data-anchor-target="${key}"]`)?.classList.add("visible");
        });

        anchor.addEventListener('mouseout', () => {
            document.body.querySelector(`[data-anchor-target="${key}"]`)?.classList.remove("visible");
        });
    });
})();

