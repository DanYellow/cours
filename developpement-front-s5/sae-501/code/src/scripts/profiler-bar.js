const profilerBar = document.querySelector("[data-profiler-bar]");
const profilerBarCloseBtn = document.querySelector("[data-profiler-bar] [data-profiler-bar-close-btn]");
const profilerBarOpenBtn = document.querySelector("[data-profiler-bar-open-btn]");

profilerBarCloseBtn.addEventListener("click", () => {
    profilerBar.classList.add("hide");

    profilerBar.addEventListener("transitionend", (e) => {
        if (e.target.matches(".hide")) {
            profilerBarOpenBtn.classList.add("show");
        }
    });
});

profilerBarOpenBtn.addEventListener("click", () => {
    profilerBar.classList.remove("hide");
    profilerBarOpenBtn.classList.remove("show");
});
