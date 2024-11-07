const listPreviewCurrentImageBtn = document.querySelectorAll(
    "[data-preview-current-image-button]"
);
const previewModal = document.querySelector("[data-image-preview-modal]");

const imageModalContainer = previewModal.querySelector("[data-image]");
const imageDimensions = previewModal.querySelector("[data-image-dimensions]");
const imageSize = previewModal.querySelector("[data-image-size]");
const imageMime = previewModal.querySelector("[data-image-mime]");
// const imageDimensions = previewModal.querySelector("[data-image-mime]");

const oneMo = 1024 * 1024;

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

        // previewModal.querySelector("[data-img-name]").textContent = imgData.type;
        imageDimensions.textContent = `${imgData.width}x${imgData.height}`;
        imageSize.textContent = `${(imgData.size / oneMo).toFixed(2)}MB`;
        imageMime.textContent = imgData.mime;

        previewModal.showModal();
    });
});
