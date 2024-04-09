const listInputFile = document.querySelectorAll("[data-upload-file]");
const listDragNDropArea = document.querySelectorAll("[data-drag-n-drop-area]");
const listDragNDropError = document.querySelectorAll("[data-incorrect-upload]");

const toggleDragAndDropIndicator = (element, show = true) => {
    if (show) {
        element.classList.remove("paused");
    } else {
        element.classList.add("paused");
    }
};

listDragNDropArea.forEach((item) => {
    toggleDragAndDropIndicator(item, false);
});

listDragNDropError.forEach((item) => {
    item.classList.add("hidden");
    item.querySelector("button").addEventListener("click", (e) => {
        item.classList.add("hidden");
    });
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
            [...e.dataTransfer.items].forEach((file, i) => {
                const input = listInputFile[i];
                const listAuthorizedFileType = input.getAttribute("accept");

                if (
                    file.kind === "file" &&
                    listAuthorizedFileType.includes(file.type.split("/")[1])
                ) {
                    input.setAttribute("files", e.dataTransfer.files);
                    input.files = e.dataTransfer.files;
                    document
                        .querySelector(
                            `[data-incorrect-upload="${item.dataset.dragNDropArea}"]`
                        )
                        .classList.add("hidden");
                } else {
                    document
                        .querySelector(
                            `[data-incorrect-upload="${item.dataset.dragNDropArea}"]`
                        )
                        .classList.remove("hidden");
                }
            });
        }
    });
});
