const listPreviewCurrentImageBtn = document.querySelectorAll(
    "[data-preview-current-image-button]"
);
const previewModal = document.querySelector("[data-image-preview-modal]");

const imageModalContainer = previewModal.querySelector("[data-image]");

listPreviewCurrentImageBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
        const dataAttr = e.currentTarget.dataset.previewCurrentImageButton;
        const previewType = e.currentTarget.dataset.previewType;
        previewModal.showModal();

        let img = document.querySelector(`[data-current-image="${dataAttr}"]`);

        if (previewType === "blob") {
            img = document.querySelector(`[data-preview-upload="${dataAttr}"]`);
        }
        imageModalContainer.closest("a").href = img.src;
        imageModalContainer.src = img.src;
    });
});
