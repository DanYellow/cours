const listInputFile = document.querySelectorAll("[data-upload-file]");
const dragNDropIndicator = document.querySelector(
    "[data-drag-n-drop-indicator]"
);

const toggleDragAndDropIndicator = (show = true) => {
    if (show) {
        dragNDropIndicator.classList.add("flex");
        dragNDropIndicator.classList.remove("hidden");
    } else {
        dragNDropIndicator.classList.remove("flex");
        dragNDropIndicator.classList.add("hidden");
    }
};

toggleDragAndDropIndicator(false);

document.body.addEventListener("dragover", (e) => {
    e.preventDefault();

    toggleDragAndDropIndicator(true);
});

["dragend", "dragleave"].forEach((event) => {
    document.body.addEventListener(event, (e) => {
        e.preventDefault();

        toggleDragAndDropIndicator(false);
    });
});

document.body.addEventListener("drop", (e) => {
    e.preventDefault();
    toggleDragAndDropIndicator(false);

    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item, i) => {
            const input = listInputFile[i];
            const listAuthorizedFileType = input.getAttribute("accept");

            if (
                item.kind === "file" &&
                listAuthorizedFileType.includes(item.type.split("/")[1])
            ) {
                input.setAttribute("files", e.dataTransfer.files);
                input.files = e.dataTransfer.files;
            }
        });
    }
});
