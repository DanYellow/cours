(() => {
    const openTab = (e) => {
        const currentTabContainer = e.target.closest('[role="tablist"]')
        currentTabContainer.querySelectorAll("[data-tab-content]").forEach((item) => {
            item.style.display = "none";
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
    };

    document.querySelectorAll('[role="tablist"]').forEach((tablist, tabSystemIdx) => {
        tablist.querySelectorAll("[data-tab-name]").forEach((item, idx) => {
            item.addEventListener("click", openTab);
            item.setAttribute("role", "tab");
            item.setAttribute("aria-selected", "false");
            item.setAttribute("aria-controls", `tab-system-${tabSystemIdx}-tab-${idx}`);

            item.id = `tab-system-${tabSystemIdx}-tab-${idx}`;
        });

        const firstTab = tablist.querySelectorAll("[data-tab-name]")[0];
        firstTab.classList.add("active");
        firstTab.setAttribute("aria-selected", "true");
        firstTab.removeAttribute("tabIndex");

        if (tablist.querySelectorAll("[data-tab-content]").length) {
            tablist.querySelectorAll("[data-tab-content]")[0].style.display = "block";
            tablist.querySelectorAll("[data-tab-content]").forEach((tabContent, idx) => {
                tabContent.setAttribute("role", "tabpanel");
                tabContent.setAttribute("tabindex", "0");
                tabContent.setAttribute("aria-labelledby", `tab-system-${tabSystemIdx}-tab-${idx}`);
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

const regexCopyText = /copier$/i;
document.querySelectorAll("[data-code-sample]").forEach((item) => {
    const allowCopy = JSON.parse(item.dataset?.codeSample || false) === true;
    const greenColor = "oklch(56.99% 0.0936 158.06)";

    item.style.border = `1px solid ${greenColor}`;
    item.style.padding = "1rem";
    item.style["border-bottom-left-radius"] = "0.5rem";
    item.style["border-bottom-right-radius"] = "0.5rem";
    item.style.overflowX = "auto";

    if (!allowCopy) {
        return;
    }

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copier";
    copyButton.style.padding = "0.5rem";
    copyButton.style.display = "flex";
    copyButton.style.gap = "0.2rem";
    copyButton.style.justifyContent = "center";

    const copyButtonHeader = document.createElement("header");
    copyButtonHeader.style.backgroundColor = greenColor;
    copyButtonHeader.style["border-top-left-radius"] = "0.5rem";
    copyButtonHeader.style["border-top-right-radius"] = "0.5rem";
    copyButtonHeader.style.display = "flex";
    copyButtonHeader.style.padding = "0.35rem 0.75rem";
    copyButtonHeader.style.justifyContent = "right";
    copyButtonHeader.append(copyButton);

    const parentNodeCode = item.parentNode;
    parentNodeCode.insertBefore(copyButtonHeader, item);

    const imgButton = document.createElement("img");
    imgButton.style.transition = "width 350ms"
    imgButton.style.width = "0";
    imgButton.alt = "";
    imgButton.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0ic2l6ZS01Ij4NCiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYuNzA0IDQuMTUzYS43NS43NSAwIDAgMSAuMTQzIDEuMDUybC04IDEwLjVhLjc1Ljc1IDAgMCAxLTEuMTI3LjA3NWwtNC41LTQuNWEuNzUuNzUgMCAwIDEgMS4wNi0xLjA2bDMuODk0IDMuODkzIDcuNDgtOS44MTdhLjc1Ljc1IDAgMCAxIDEuMDUtLjE0M1oiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4NCjwvc3ZnPg0K";
    copyButton.append(imgButton);

    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(item.textContent.replace(regexCopyText, ''))
        imgButton.style.width = "0.95rem";

        setTimeout(() => {
            imgButton.style.width = "0";
        }, 1500);
    });
});
