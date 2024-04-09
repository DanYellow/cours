const listInputFile = document.querySelectorAll("[data-upload-file]");

document.body.addEventListener("dragover", (e) => {
    e.preventDefault();
});

document.body.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...e.dataTransfer.items].forEach((item, i) => {
            const input = listInputFile[i];
            const listAuthorizedFileType = input.getAttribute("accept");
            console.log("item", item, input.getAttribute("accept"))
            if (item.kind === "file" && listAuthorizedFileType.includes(item.type.split('/')[1])) {
                input.setAttribute("files", e.dataTransfer.files);
                input.files = e.dataTransfer.files;
            }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...e.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
        });
    }
});
