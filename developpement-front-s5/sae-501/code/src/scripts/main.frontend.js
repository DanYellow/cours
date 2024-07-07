import "/src/styles/base.css";
import "/src/styles/hero.scss";
import "/src/styles/index.scss";
import "/src/styles/tailwind.css";

import "./store-scroll-position.utils";

const htmlBGColor = window
    .getComputedStyle(document.documentElement, null)
    .getPropertyValue("background-color");
document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", htmlBGColor);
