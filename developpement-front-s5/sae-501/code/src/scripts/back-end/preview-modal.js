const listPreviewCurrentImageBtn = document.querySelectorAll(
    "[data-preview-current-image-button]"
);
const previewModal = document.querySelector("[data-image-preview-modal]");

const imageModalContainer = previewModal.querySelector("[data-image]");

listPreviewCurrentImageBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
        const dataAttr = e.currentTarget.dataset.previewCurrentImageButton;
        previewModal.showPopover();
        const img = document.querySelector(
            `[data-current-image="${dataAttr}"]`
        );
        imageModalContainer.src = img.src;
    });
});