(() => {
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
})();

(() => {
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
})();

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
    imgButton.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0ic2l6ZS01Ij4NCiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYuNzA0IDQuMTUzYS43NS43NSAwIDAgMSAuMTQzIDEuMDUybC04IDEwLjVhLjc1Ljc1IDAgMCAxLTEuMTI3LjA3NWwtNC41LTQuNWEuNzUuNzUgMCAwIDEgMS4wNi0xLjA2bDMuODk0IDMuODkzIDcuNDgtOS44MTdhLjc1Ljc1IDAgMCAxIDEuMDUtLjE0M1oiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4NCjwvc3ZnPg0K";
    copyButton.append(imgButton);

    copyButton.addEventListener("click", () => {
        $el.classList.add("copie");
        navigator.clipboard.writeText($el.textContent.replace(regexCopyText, ''))
        imgButton.style.width = "0.95rem";

        setTimeout(() => {
            $el.classList.add("fin-copie");
            $el.classList.remove("copie");
            imgButton.style.width = "0";
        }, 1500);
    });

    return copyButton;
}

const regexCopyText = /copier$/i;
document.querySelectorAll("[data-code-sample]").forEach((item) => {
    const codeSampleData = JSON.parse(item.dataset?.codeSample || "{}");
    const codeTitle = codeSampleData?.title || "";
    const allowCopy = codeSampleData?.allowCopy || false;
    const greenColor = getComputedStyle(document.documentElement).getPropertyValue("--green-code");

    item.style.border = `1px solid ${greenColor}`;
    item.style.padding = "1rem";
    item.style.fontSize = "1.25rem";
    item.style.borderRadius = "0 0 0.5rem 0.5rem";
    item.style.marginBottom = "1.25rem";
    item.style.backgroundColor = "rgb(13, 17, 23)";
    item.style.removeProperty("font-family");

    if (item.querySelector(":scope > ol")) {
        item.querySelector(":scope > ol").style.marginBlock = "0";
    }

    item.style.overflowX = "auto";

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

    if (allowCopy) {
        codeHeader.append(generateCopyCodeButton(item));
    }

    item.addEventListener("transitionend", (e) => {
        if (item.classList.contains("fin-copie")) {
            item.classList.remove("fin-copie");
        }
    });
});
