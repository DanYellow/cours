import closeModal from "./close-modal";

const listPreviewCurrentImageBtn = document.querySelectorAll(
    "[data-preview-current-image-button]"
);
const modal = document.querySelector("[data-modal]");

const modalTemplate = document.querySelector("[data-tpl-id='preview-image']");
const modalTemplateContent = modalTemplate.content.cloneNode(true);

const imageModalContainer = modalTemplateContent.querySelector("[data-image]");
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

listPreviewCurrentImageBtn.forEach((item) => {
    item.addEventListener("click", async (e) => {
        const dataAttr = e.currentTarget.dataset.previewCurrentImageButton;
        const previewType = e.currentTarget.dataset.previewType;
        
        let img = document.querySelector(`[data-current-image="${dataAttr}"]`);
        
        if (previewType === "blob") {
            img = document.querySelector(`[data-preview-upload="${dataAttr}"]`);
        }
        imageModalContainer.closest("a").href = img.src;
        imageModalContainer.src = img.src;

        const imgData = await getImageInfos(img);

        imageName.textContent = imgData.name;
        imageName.title = imgData.name;
        imageDimensions.textContent = `${imgData.width} x ${imgData.height}`;
        imageSize.textContent = `${formatBytes(imgData.size)}`;
        imageMime.textContent = imgData.mime;
        
        while (modal.firstChild) {
            modal.removeChild(modal.firstChild);
        }
        modal.appendChild(modalTemplateContent.cloneNode(true));
        modal.showModal();

        closeModal();
    });
});
