const paginationShortcut = document.querySelector("[data-pagination-shortcut]");

document
    .querySelectorAll("[data-toggle-pagination-shortcut-btn]")
    .forEach((item) => {
        item.addEventListener("click", (e) => {
            if (e.currentTarget.textContent === "…") {
                e.currentTarget.textContent = "✖";
                e.currentTarget.style["anchor-name"] = "--myAnchor";
                paginationShortcut.classList.remove("!hidden");
            } else {
                e.currentTarget.textContent = "…";
                e.currentTarget.style["anchor-name"] = "none";
                paginationShortcut.classList.add("!hidden");
            }
        });
    });
