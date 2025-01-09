const initTabSystem = () => {
    const openTab = (e) => {
        document.querySelectorAll("[data-tab-content]").forEach((item) => {
            item.style.display = "none";
        });

        document.querySelectorAll("[data-tab-name]").forEach((item) => {
            item.classList.remove("active");
        });

        document.querySelector(
            `[data-tab-content="${e.target.dataset.tabName}"]`
        ).style.display = "block";
        document
            .querySelector(`[data-tab-name="${e.target.dataset.tabName}"]`)
            .classList.add("active");
    };

    if (document.querySelectorAll("[data-tab-content]").length) {
        document.querySelectorAll("[data-tab-content]")[0].style.display =
            "block";
        document.querySelectorAll("[data-tab-name]")[0].classList.add("active");
    }

    document.querySelectorAll("[data-tab-name]").forEach((item) => {
        item.addEventListener("click", openTab);
    });
};

initTabSystem();

const initAccordionSystem = () => {
    const url = new URL(window.location);
    const accordionIndex = Number(url.searchParams?.get("a") || 0)

    document.querySelectorAll(".consignes-conteneur > summary").forEach((item, idx) => {
        item.addEventListener("click", () => {
            if(document.querySelectorAll("summary")[idx].closest("details").open) {
                url.searchParams.delete("a", idx);
            } else {
                url.searchParams.set("a", idx);
            }
            history.replaceState(null, "", url);
        });

        document.querySelectorAll("summary")[idx].closest("details").open = accordionIndex === idx;
    });
};

initAccordionSystem();

const regexCopyText = /copier$/i;
document.querySelectorAll("[data-code-sample]").forEach((item) => {
    const allowCopy = JSON.parse(item.dataset?.codeSample || false) === true;
    console.log(allowCopy)
    item.style.border = "1px solid #418862";
    item.style.padding = "1rem";
    item.style.borderRadius = "0.5rem";
    item.style.position = "relative";

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copier";
    copyButton.style.position = "absolute";
    copyButton.style.top = "0.75rem";
    copyButton.style.right = "0.75rem";
    copyButton.style.padding = "0.5rem";
    copyButton.style.display = "flex";
    copyButton.style.gap = "0.2rem";
    copyButton.style.justifyContent = "center";
    item.append(copyButton);

    if (!allowCopy) {
        return;
    }
    const imgButton = document.createElement("img");
    imgButton.alt = "";
    imgButton.style.width = "0.95rem";
    imgButton.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0ic2l6ZS01Ij4NCiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYuNzA0IDQuMTUzYS43NS43NSAwIDAgMSAuMTQzIDEuMDUybC04IDEwLjVhLjc1Ljc1IDAgMCAxLTEuMTI3LjA3NWwtNC41LTQuNWEuNzUuNzUgMCAwIDEgMS4wNi0xLjA2bDMuODk0IDMuODkzIDcuNDgtOS44MTdhLjc1Ljc1IDAgMCAxIDEuMDUtLjE0M1oiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4NCjwvc3ZnPg0K";
    imgButton.style.display = "none";
    copyButton.append(imgButton);

    copyButton.addEventListener("click", (e) => {
        navigator.clipboard.writeText(item.textContent.replace(regexCopyText, ''))
        imgButton.style.display = "inline";

        setTimeout(() => {
            imgButton.style.display = "none";
        }, 1500);
    });
});
