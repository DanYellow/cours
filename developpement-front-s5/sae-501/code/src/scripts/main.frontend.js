import "/src/styles/base.css";
import "/src/styles/hero.scss";
import "/src/styles/index.scss";
import "/src/styles/tailwind.css";

const htmlBGColor = window
    .getComputedStyle(document.documentElement, null)
    .getPropertyValue("background-color");
document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", htmlBGColor);

// Keep scroll position between page in navigation for mobile
const sidebar = document.querySelector("[data-navigation]");
const scrollLeft = localStorage.getItem("sidebar-scroll");
if (scrollLeft !== null && sidebar !== null) {
    sidebar.scrollLeft = Number(scrollLeft);
}

window.addEventListener("beforeunload", () => {
    localStorage.setItem("sidebar-scroll", sidebar.scrollLeft);
});
