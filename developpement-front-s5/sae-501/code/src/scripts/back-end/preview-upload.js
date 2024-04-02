const listUploadFileInput = document.querySelectorAll("[data-upload-file]");
const listUploadFilePreview = document.querySelectorAll(
    "[data-preview-upload]"
);
const listClearUploadFileBtn = document.querySelectorAll(
    "[data-delete-preview-upload-button]"
);

const previewUpload = (e) => {
    const element = e.currentTarget;
    const file = element.files[0];
    const uploadName = element.dataset.uploadFile;

    const imgRelated = document.querySelector(
        `[data-preview-upload="${uploadName}"]`
    );
    if (file && imgRelated) {
        // imgRelated.setAttribute('src', URL.createObjectURL(file));
        imgRelated.src = URL.createObjectURL(file);
    }
};

const srcAttributeObserver = (mutationList) => {
    mutationList.forEach((mutation) => {
        if (mutation.type === "attributes") {
            const deleteBtn = document.querySelector(
                `[data-delete-preview-upload-button="${mutation.target.dataset.previewUpload}"]`
            );

            const newValue = mutation.target.getAttribute("src");
            deleteBtn.classList.toggle("hidden", newValue === "");
        }
    });
};

const observer = new MutationObserver(srcAttributeObserver);

listUploadFileInput.forEach((item) => {
    item.addEventListener("change", previewUpload);
});

listUploadFilePreview.forEach((item) => {
    observer.observe(item, {
        attributes: true,
    });
});

listClearUploadFileBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
        const input = document.querySelector(
            `[data-upload-file="${e.target.dataset.deletePreviewUploadButton}"]`
        );
        input.value = input.defaultValue;
    });
});
