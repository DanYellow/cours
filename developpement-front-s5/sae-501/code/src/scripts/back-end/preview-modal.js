import closeModalEvents from "./close-modal";
import { delegateEvtHandler } from "../utils";

const listPreviewCurrentImageBtn = document.querySelectorAll(
    "[data-preview-current-image-button]"
);
const modal = document.querySelector("[data-modal]");

const modalTemplate = document.querySelector("[data-tpl-id='preview-image']");
const modalTemplateContent = modalTemplate.content.cloneNode(true);

const listImageModal = modalTemplateContent.querySelectorAll("[data-image]");
const imageDimensions = modalTemplateContent.querySelector("[data-image-dimensions]");
const imageSize = modalTemplateContent.querySelector("[data-image-size]");
const imageMime = modalTemplateContent.querySelector("[data-image-mime]");
const imageName = modalTemplateContent.querySelector("[data-image-name]");

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "kB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const getImageInfos = async (img) => {
    const blobQuery = await fetch(img.src);
    const blob = await blobQuery.blob();

    const imgInstance = new Image();
    imgInstance.src = img.src;
    await imgInstance.decode();

    return {
        width: imgInstance.width,
        height: imgInstance.height,
        size: blob.size,
        mime: blob.type,
        name: img.src.replace(/^.*[\\/]/, ""),
    };
};

delegateEvtHandler(modal, "click", "[data-enlarge-image-btn]", (e) => {
    ["!bg-transparent", "!shadow-none", "!h-screen"].forEach((cssClass) => modal.classList.toggle(cssClass));
    modal.querySelector("[data-main-content]").classList.toggle("opacity-0");

    ["opacity-0", "pointer-events-none", "h-0"].forEach((cssClass) => modal.querySelector("[data-reduce-image-btn]").classList.toggle(cssClass));

    // modal.querySelector("[data-image-data]").classList.toggle("opacity-0");
    // modal.querySelector("[data-image-data]").classList.remove("!hidden")
    if (modal.dataset.hasTransitionEvent !== "true") {
        
    }

    // modal.querySelector("[data-modal-title]").classList.toggle("!hidden");
    // modal.querySelector("[data-container-image]").classList.toggle("!w-full");
    // modal.querySelector("[data-enlarge-text]").classList.toggle("-translate-y-[200%]");
});

modal.addEventListener("transitionend", (e) => {
    e.target.dataset.hasTransitionEvent = true;
    if (e.target.matches(".\\!bg-transparent")) {
        modal.querySelector("[data-main-content]").classList.add("!hidden");
    } else {
        modal.querySelector("[data-main-content]").classList.remove("!hidden");
    }
    // modal.querySelector("[data-main-content]").classList.toggle("!hidden");
});

delegateEvtHandler(modal, "click", "[data-reduce-image-btn]", (e) => {
    ["!bg-transparent", "!shadow-none", "!h-screen"].forEach((cssClass) => modal.classList.toggle(cssClass));
    modal.querySelector("[data-main-content]").classList.toggle("opacity-0");
    ["opacity-0", "pointer-events-none"].forEach((cssClass) => modal.querySelector("[data-reduce-image-btn]").classList.toggle(cssClass));
    modal.querySelector("[data-main-content]").classList.toggle("!hidden");
    // ["opacity-0", "pointer-events-none"].forEach((cssClass) => modal.classList.toggle(cssClass));
});

listPreviewCurrentImageBtn.forEach((item) => {
    item.addEventListener("click", async (e) => {
        const dataAttr = e.currentTarget.dataset.previewCurrentImageButton;
        const previewType = e.currentTarget.dataset.previewType;
        
        let img = document.querySelector(`[data-current-image="${dataAttr}"]`);
        
        if (previewType === "blob") {
            img = document.querySelector(`[data-preview-upload="${dataAttr}"]`);
        }
        // imageModalContainer.closest("a")?.href = img.src;
        // imageModalContainer.src = img.src;
        listImageModal.forEach((item) => item.src = img.src)

        const imgData = await getImageInfos(img);

        imageName.textContent = imgData.name;
        imageName.title = imgData.name;
        imageDimensions.textContent = `${imgData.width} x ${imgData.height}`;
        imageSize.textContent = `${formatBytes(imgData.size)}`;
        imageMime.textContent = imgData.mime;
        
        while (modal.firstChild) {
            modal.removeChild(modal.firstChild);
        }
        modal.append(modalTemplateContent.cloneNode(true));
        modal.showModal();

        closeModalEvents();
    });
});
