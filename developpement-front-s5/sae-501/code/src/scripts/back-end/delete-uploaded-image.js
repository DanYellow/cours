const listDeleteCurrentImageBtn = document.querySelectorAll("[data-delete-current-image-button]");

const imageObserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
        if (mutation.type === "attributes") {
            const deleteBtn = document.querySelector(
                `[data-delete-current-image-button="${mutation.target.dataset.currentImage}"]`
            );

            const newValue = mutation.target.getAttribute("src");
            deleteBtn.classList.toggle("hidden", newValue === "");
        }
    });
});


listDeleteCurrentImageBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
        const dataAttr = e.currentTarget.dataset.deleteCurrentImageButton;
        const input = document.querySelector(`[data-current-image-checkbox="${dataAttr}"]`);
        input.checked = true;
        
        const img = document.querySelector(`[data-current-image="${dataAttr}"]`);
        img.src = "";

        imageObserver.observe(img, {
            attributes: true,
        });

        e.currentTarget.classList.add("hidden");
    });
});