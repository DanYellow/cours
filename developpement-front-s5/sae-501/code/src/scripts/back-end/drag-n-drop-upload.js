const listInputFile = document.querySelectorAll("[data-upload-file]");

document.body.addEventListener("dragover", (e) => {
    e.preventDefault();

    e.currentTarget.classList.add("animated-border")
});

;['dragend', 'dragleave'].forEach((event) => {
    document.body.addEventListener(event, (e) => {
        e.preventDefault();
    
        e.currentTarget.classList.remove("animated-border")
    });
})

document.body.addEventListener("drop", (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("animated-border")

    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item, i) => {
            const input = listInputFile[i];
            const listAuthorizedFileType = input.getAttribute("accept");

            if (item.kind === "file" && listAuthorizedFileType.includes(item.type.split('/')[1])) {
                input.setAttribute("files", e.dataTransfer.files);
                input.files = e.dataTransfer.files;
            }
        });
    }
});
