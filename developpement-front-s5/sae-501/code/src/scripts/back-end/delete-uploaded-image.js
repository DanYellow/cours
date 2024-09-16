const listDeleteCurrentImageBtn = document.querySelectorAll(
    "[data-delete-current-image-button]"
);
const deletionModal = document.querySelector("[data-image-deletion-modal]");
const deleteItemModalBtn = document.querySelector(
    "[data-image-deletion-modal] [data-delete-item]"
);
const imageModalContainer = document.querySelector(
    "[data-image-deletion-modal] [data-image]"
);

const imageObserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
        if (mutation.type === "attributes") {
            const deleteBtn = document.querySelector(
                `[data-delete-current-image-button="${mutation.target.dataset.currentImage}"]`
            );

            const newValue = mutation.target.getAttribute("src");
            deleteBtn.classList.toggle("hidden", newValue === "");
        }
    });
});

deleteItemModalBtn.addEventListener("click", (e) => {
    const dataAttr = e.currentTarget.dataset.deleteCurrentImageButtonModal;
    const input = document.querySelector(
        `[data-current-image-checkbox="${dataAttr}"]`
    );
    input.checked = true;

    const img = document.querySelector(
        `[data-current-image="${dataAttr}"]`
    );
    img.src = "";

    const btnPreview = document.querySelector(
        `[data-preview-current-image-button="${dataAttr}"][data-preview-type="image"]`
    );
    btnPreview.classList.add("hidden");

    imageObserver.observe(img, {
        attributes: true,
    });

    document.querySelector(`[data-delete-current-image-button="${dataAttr}"]`).classList.add("hidden");
    document.querySelector(`[data-preview-current-image-button="${dataAttr}"]`).classList.add("hidden");
});

listDeleteCurrentImageBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
        const dataAttr = e.currentTarget.dataset.deleteCurrentImageButton;
        deleteItemModalBtn.dataset.deleteCurrentImageButtonModal = dataAttr;
        deletionModal.showPopover();
        const img = document.querySelector(
            `[data-current-image="${dataAttr}"]`
        );
        imageModalContainer.src = img.src;
    });
});
