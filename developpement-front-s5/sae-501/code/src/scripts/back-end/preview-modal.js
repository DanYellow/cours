const listPreviewCurrentImageBtn = document.querySelectorAll(
    "[data-preview-current-image-button]"
);
const previewModal = document.querySelector("[data-image-preview-modal]");

const imageModalContainer = previewModal.querySelector("[data-image]");

const oneMo = 1024 * 1024;

const getImageInfos = async (img) => {
    const blobQuery = await fetch(img.src);
    const blob = await blobQuery.blob();

    const imgInstance = new Image();
    imgInstance.src = img.src;
    await imgInstance.decode();
    console.log(imgInstance, blob)
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

        previewModal.querySelector("[data-img-name]").textContent = imgData.type;
        previewModal.querySelector("[data-img-dimensions]").textContent = `${imgData.width}x${imgData.height}`;
        previewModal.querySelector("[data-img-size]").textContent = `${(imgData.size / oneMo).toFixed(2)}MB`;
        previewModal.querySelector("[data-img-mime]").textContent = imgData.mime;

        previewModal.showModal();
    });
});
