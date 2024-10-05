const slider = document.querySelector("[data-slider]");
const fontSizeText = document.querySelector("[data-font-size]");
const rootFontSizeText = document.querySelectorAll("[data-root-font-size]");
const sliderValueText = document.querySelector("[data-slider-value]");
const htmlDoc = document.querySelector("html");

console.dir(sliderValueText)
const updateValues = (val) => {
    fontSizeText.innerHTML = val.value * 1.5;
    sliderValueText.innerHTML = val.value;
    rootFontSizeText.forEach((item) => {
        item.innerHTML = val.value;
    });
    htmlDoc.style.fontSize = `${val.value}px`;
};

updateValues(slider);

slider.oninput = function () {
    updateValues(this);
};
