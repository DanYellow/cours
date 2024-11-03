const profilerBar = document.querySelector("[data-profiler-bar]");
const profilerBarCloseBtn = document.querySelector("[data-profiler-bar] [data-profiler-bar-close-btn]");
const profilerBarOpenBtn = document.querySelector("[data-profiler-bar-open-btn]");
const isProfilerBarCollapsed = localStorage.getItem("is-profiler-bar-collapsed") || false;

if (JSON.parse(isProfilerBarCollapsed) === true) {
    profilerBar.classList.add("hide");
    profilerBarOpenBtn.classList.add("show");
}

profilerBarCloseBtn.addEventListener("click", () => {
    localStorage.setItem("is-profiler-bar-collapsed", true);
    profilerBar.classList.add("hide");
    profilerBar.addEventListener("transitionend", (e) => {
        if (e.target.matches(".hide")) {
            profilerBarOpenBtn.classList.add("show");
        }
    });
});

profilerBarOpenBtn.addEventListener("click", () => {
    localStorage.setItem("is-profiler-bar-collapsed", false);
    profilerBar.classList.remove("hide");
    profilerBarOpenBtn.classList.remove("show");
});
