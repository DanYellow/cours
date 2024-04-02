const listDeleteCurrentImageBtn = document.querySelectorAll("[data-delete-current-image-button]");

listDeleteCurrentImageBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
        const dataAttr = e.currentTarget.dataset.deleteCurrentImageButton;
        const input = document.querySelector(`[data-current-image-checkbox="${dataAttr}"]`);
        input.checked = true;
        
        const img = document.querySelector(`[data-current-image="${dataAttr}"]`);
        img.src = "";

        e.currentTarget.parentNode.removeChild(e.currentTarget);
    });
});