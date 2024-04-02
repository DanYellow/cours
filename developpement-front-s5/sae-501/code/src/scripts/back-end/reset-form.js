const form = document.querySelector("[data-form]")

form?.addEventListener("reset", (e) => {
    const listImgs = e.target.querySelectorAll("[data-preview-upload]")
    listImgs.forEach((item) => {
        item.src = "";
    })    
})