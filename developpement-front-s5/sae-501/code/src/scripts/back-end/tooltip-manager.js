const listTooltips = document.querySelectorAll("[data-tooltip]");
const listTooltipAnchors = document.querySelectorAll("[data-tooltip-anchor]");

const hideTooltip = (e) => {
    const tooltip = document.querySelector(
        `[data-tooltip="${e.currentTarget.dataset.tooltipAnchor}"]`
    );
    tooltip.classList.add("fade-out");
    tooltip.addEventListener("transitionend", (e) => {
        if (tooltip.matches(".fade-out")) {
            tooltip.classList.remove("fade-out");
            tooltip.classList.add("hidden");
        }
    });
};

const showTooltip = (e) => {
    const tooltip = document.querySelector(
        `[data-tooltip="${e.currentTarget.dataset.tooltipAnchor}"]`
    );
    tooltip.classList.remove("hidden");
};

listTooltipAnchors.forEach((item) => {
    item.style["anchor-name"] = `--${item.dataset.tooltipAnchor}`;
    item.addEventListener("mouseenter", showTooltip);
    item.addEventListener("mouseleave", hideTooltip);
});

listTooltips.forEach((item) => {
    item.style["position-anchor"] = `--${item.dataset.tooltip}`;
});
