import mime from "mime";
import { imageValidator } from "#database/validator.js";

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
    const uploadName = element.dataset.uploadFile;

    const listAllowedMimeType = element.getAttribute("accept").split(",").map((item) => {
        return mime.getType(item);
    });

    const errorMessageContainer = document.querySelector(
        `[data-incorrect-upload="${uploadName}"]`
    );
    const imgRelated = document.querySelector(
        `[data-preview-upload="${uploadName}"]`
    );
    imgRelated.src = "";

    const btnPreview = document.querySelector(
        `[data-preview-current-image-button="${uploadName}"]`
    );

    const errorMessage = imageValidator(file, listAllowedMimeType);
    if (errorMessage) {
        errorMessageContainer.querySelector("[data-error-message]").textContent = errorMessage;
        errorMessageContainer.classList.remove("hidden");
        btnPreview.classList.add("hidden");
        element.value = null;
    } else {
        imgRelated.src = URL.createObjectURL(file);
        errorMessageContainer.classList.add("hidden");
        btnPreview.classList.remove("hidden");
    }
};

const previewImageObserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
        if (mutation.type === "attributes") {
            const deleteBtn = document.querySelector(
                `[data-delete-preview-upload-button="${mutation.target.dataset.previewUpload}"]`
            );

            const btnPreview = document.querySelector(
                `[data-preview-current-image-button="${mutation.target.dataset.previewUpload}"]`
            );

            const newValue = mutation.target.getAttribute("src");
            deleteBtn.classList.toggle("hidden", newValue === "");
            btnPreview.classList.toggle("hidden", newValue === "");
        }
    });
});

const dropImageObserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
        switch (mutation.type) {
            case "attributes":
                previewUpload(mutation);
                break;

            default:
                break;
        }
    });
});

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
        const dataAttr = e.target.dataset.deletePreviewUploadButton;
        const input = document.querySelector(
            `[data-upload-file="${dataAttr}"]`
        );
        const imgRelated = document.querySelector(
            `[data-preview-upload="${dataAttr}"]`
        );

        imgRelated.src = "";
        input.value = input.defaultValue;
    });
});
