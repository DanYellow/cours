const listInputFile = document.querySelectorAll("[data-upload-file]");

document.body.addEventListener("dragover", (e) => {
    e.preventDefault();
});

document.body.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...e.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
                listInputFile[0].setAttribute("files", e.dataTransfer.files);
                listInputFile[0].files = e.dataTransfer.files;
            }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...e.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
        });
    }
});
