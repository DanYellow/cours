import axios from "axios";

import closeModal from "./close-modal";

const modal = document.querySelector("[data-modal]");
const modalTemplate = document.querySelector("[data-tpl-id='delete-entry']");
const modalTemplateContent = document.importNode(modalTemplate.content, true);

const closeModalBtn = modalTemplateContent.querySelector("[data-close-modal]");
const deleteItemModalBtn = modalTemplateContent.querySelector("[data-delete-item]");
const errorMessageModal = modalTemplateContent.querySelector("[data-error-modal]");

const displayDeleteItemModal = (e) => {
    while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
    }
    modal.appendChild(modalTemplateContent.cloneNode(true));
    modal.showModal();
    closeModal();
    deleteItemModalBtn.dataset.deleteItem = e.currentTarget.dataset.deleteUrl;
    modal.querySelector("[data-modal-item-name]").textContent = e.currentTarget.dataset.deleteName;
};

closeModalBtn.addEventListener("click", () => {
    errorMessageModal.classList.add("hidden");
});

deleteItemModalBtn.addEventListener("click", async (e) => {
    deleteItemModalBtn.disabled = true;
    closeModalBtn.disabled = true;

    await axios
        .delete(e.currentTarget.dataset.deleteItem)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            errorMessageModal.textContent = error.response.data.error || "Erreur";
            errorMessageModal.classList.remove("hidden");
            deleteItemModalBtn.disabled = false;
            closeModalBtn.disabled = false;
        });
});

document.querySelectorAll('[data-modal-id="delete-entry"]').forEach((item) => {
    item.addEventListener("click", displayDeleteItemModal);
});
