const closeModal = (e) => {
    e.currentTarget.closest("dialog").close();
};

document.querySelectorAll("[data-close-modal]").forEach((item) => {
    item.removeEventListener("click", closeModal);
    item.addEventListener("click", closeModal);
});

export default () => {
    document.querySelectorAll("[data-close-modal]").forEach((item) => {
        item.removeEventListener("click", closeModal);
        item.addEventListener("click", closeModal);
    });    
};
