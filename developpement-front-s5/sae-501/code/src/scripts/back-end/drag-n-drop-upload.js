const listInputFile = document.querySelectorAll("[data-upload-file]");
const listDragNDropArea = document.querySelectorAll("[data-drag-n-drop-area]");

const toggleDragAndDropIndicator = (element, show = true) => {
    if (show) {
        element.classList.remove("paused");
    } else {
        element.classList.add("paused");
    }
};

window.foo = () => {
    listDragNDropArea.forEach((item) => {
        toggleDragAndDropIndicator(item, false);
    });
};

listDragNDropArea.forEach((item) => {
    toggleDragAndDropIndicator(item, false);
});

listDragNDropArea.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        e.preventDefault();

        toggleDragAndDropIndicator(item, true);
    });
});

["dragend", "dragleave"].forEach((event) => {
    listDragNDropArea.forEach((item) => {
        item.addEventListener(event, (e) => {
            e.preventDefault();

            toggleDragAndDropIndicator(item, false);
        });
    });
});

listDragNDropArea.forEach((item) => {
    item.addEventListener("drop", (e) => {
        e.preventDefault();
        toggleDragAndDropIndicator(item, false);

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
});
