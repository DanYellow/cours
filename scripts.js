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

    document.querySelectorAll("summary").forEach((item, idx) => {
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
