const paginationShortcut = document.querySelector("[data-pagination-shortcut]");
const listPaginationShortcutButtons = document.querySelectorAll(
    "[data-toggle-pagination-shortcut-btn]"
);

const clearAnchors = () => {
    listPaginationShortcutButtons.forEach((item) => {
        item.querySelector("span").textContent = "…";
        item.style["anchor-name"] = "none";
    });
};

listPaginationShortcutButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
        const currentItemSpanTag = e.currentTarget.querySelector("span");

        if (currentItemSpanTag.textContent === "…") {
            clearAnchors();
            currentItemSpanTag.textContent = "✖";
            e.currentTarget.style["anchor-name"] = "--paginationShortcutAnchor";
            paginationShortcut.classList.remove("!hidden");
        } else {
            currentItemSpanTag.textContent = "…";
            paginationShortcut.classList.add("fade-out");
            paginationShortcut.addEventListener("transitionend", (e) => {
                if (e.target.matches(".fade-out")) {
                    paginationShortcut.classList.remove("fade-out");
                    paginationShortcut.classList.add("!hidden");
                    e.currentTarget.style["anchor-name"] = "none";
                }
            });
        }
    });
});
