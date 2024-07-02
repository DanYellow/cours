const listDragNDropArea = document.querySelectorAll("[data-drag-n-drop-area]");
const listDragNDropError = document.querySelectorAll("[data-incorrect-upload]");

const toggleDragAndDropIndicator = (element, show = true) => {
    const hoverClass = Array.from(element.querySelector("label").classList)
        .find((cssClass) => cssClass.includes("hover"))
        ?.split(":")[1];
   

    if (show) {
        element.classList.remove("paused");
    } else {
        element.classList.add("paused");
        if (hoverClass) {
            element.querySelector("label").classList.remove(String(hoverClass));
        }
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

        const hoverClass = Array.from(item.querySelector("label").classList)
            .find((cssClass) => cssClass.includes("hover"))
            ?.split(":")[1];
        if (hoverClass) {
            item.querySelector("label").classList.add(String(hoverClass));
        }

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
            const input = item.querySelector("[data-upload-file]");

            input.setAttribute("files", e.dataTransfer.files);
            input.files = e.dataTransfer.files;
        }
    });
});
