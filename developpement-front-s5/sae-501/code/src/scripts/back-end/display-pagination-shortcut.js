const paginationShortcut = document.querySelector("[data-pagination-shortcut]");
const listPaginationShortcutButtons = document.querySelectorAll(
    "[data-toggle-pagination-shortcut-btn]"
);

const clearAnchors = () => {
    listPaginationShortcutButtons.forEach((item) => {
        item.textContent = "…";
        item.style["anchor-name"] = "none";
    });
};

listPaginationShortcutButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
        
        if (e.currentTarget.textContent === "…") {
            clearAnchors();
            e.currentTarget.textContent = "✖";
            e.currentTarget.style["anchor-name"] = "--paginationShortcutAnchor";
            paginationShortcut.classList.remove("!hidden");
        } else {
            e.currentTarget.textContent = "…";
            e.currentTarget.style["anchor-name"] = "none";
            paginationShortcut.classList.add("!hidden");
        }
    });
});
