document.querySelectorAll("[data-close-modal]").forEach((item) => {
    item.addEventListener("click", (e) => {
        e.currentTarget.closest("dialog").close()
    })
})