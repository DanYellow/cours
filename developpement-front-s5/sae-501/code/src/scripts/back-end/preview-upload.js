const listUploadFileInput = document.querySelectorAll("[data-upload-file]");
const listUploadFilePreview = document.querySelectorAll(
    "[data-preview-upload]"
);
const listClearUploadFileBtn = document.querySelectorAll(
    "[data-delete-preview-upload-button]"
);

const previewUpload = (e) => {
    const element = e.target;
    const file = element.files[0];
    console.log("f", element)
    const uploadName = element.dataset.uploadFile;

    const imgRelated = document.querySelector(
        `[data-preview-upload="${uploadName}"]`
    );
    if (file && imgRelated) {
        imgRelated.src = URL.createObjectURL(file);
    }
};

const previewImageObserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
        if (mutation.type === "attributes") {
            const deleteBtn = document.querySelector(
                `[data-delete-preview-upload-button="${mutation.target.dataset.previewUpload}"]`
            );

            const newValue = mutation.target.getAttribute("src");
            deleteBtn.classList.toggle("hidden", newValue === "");
        }
    });
});

const dropImageObserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
        switch (mutation.type) {
            case "attributes":
                console.log("mutation", mutation.target)
                previewUpload(mutation);
                break;
        
            default:
                break;
        }
    })
})

listUploadFileInput.forEach((item) => {
    item.addEventListener("change", previewUpload);
    dropImageObserver.observe(item, {
        attributes: true,
        attributeOldValue: true,
        childList: false,
    });
});

listUploadFilePreview.forEach((item) => {
    previewImageObserver.observe(item, {
        attributes: true,
    });
});

listClearUploadFileBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
        const input = document.querySelector(
            `[data-upload-file="${e.target.dataset.deletePreviewUploadButton}"]`
        );
        const imgRelated = document.querySelector(
            `[data-preview-upload="${e.target.dataset.deletePreviewUploadButton}"]`
        );
        imgRelated.src = ""
        input.value = input.defaultValue;
    });
});
