const listClipboardUploadButton = document.querySelectorAll("[data-clipboard-upload]")

const pasteClipboard = async (e) => {
    const element = e.currentTarget
    const name = element.dataset.clipboardUpload

    const clipboardContents = await navigator.clipboard.read();

    const img = clipboardContents.filter((item) => item.types.includes("image/png"))[0]
    if(img) {
        const blob = await img.getType("image/png");

        const file = new File([blob], "img.jpg", { type: blob.type, lastModified:new Date().getTime() });
        const container = new DataTransfer();
        container.items.add(file);

        const inputFile = document.querySelector(`[data-upload-file="${name}"]`)

        inputFile.files = container.files
        inputFile.dispatchEvent(new Event('change'))
    }
}

listClipboardUploadButton.forEach((item) => {
    if(!navigator.clipboard.read) {
        item.remove()
    }
    item.addEventListener("click", pasteClipboard)
})