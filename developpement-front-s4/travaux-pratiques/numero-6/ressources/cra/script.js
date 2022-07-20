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

    document.querySelectorAll("[data-tab-content]")[0].style.display = "block";
    document.querySelectorAll("[data-tab-name]")[0].classList.add("active")

    document.querySelectorAll("[data-tab-name]").forEach((item) => {
        item.addEventListener("click", openTab);
    });
};

initTabSystem()