import axios from "axios";
import { createFocusTrap } from "focus-trap";

const deletionModal = document.querySelector("[data-deletion-modal]")
const closeModalBtn = document.querySelector("[data-deletion-modal] [data-close-modal]")
const deleteItemModalBtn = document.querySelector("[data-deletion-modal] [data-delete-item]")
const errorMessageModal = document.querySelector("[data-deletion-modal] [data-error-modal]")

let focusTrap = null;

const displayDeleteItemModal = (e) => {
    deleteItemModalBtn.dataset.deleteItem = e.currentTarget.dataset.deleteUrl
    deletionModal.querySelector("[data-modal-item-name]").textContent = e.currentTarget.dataset.deleteName
}

closeModalBtn.addEventListener("click", () => {
    errorMessageModal.classList.add("hidden")
    focusTrap.deactivate()
})

deleteItemModalBtn.addEventListener("click", async (e) => {
    deleteItemModalBtn.disabled = true;
    closeModalBtn.disabled = true;

    await axios
        .delete(e.currentTarget.dataset.deleteItem)
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            errorMessageModal.classList.remove("hidden")
            errorMessageModal.textContent = error.response.data.error || "Erreur"
        }).finally(() => {
            deleteItemModalBtn.disabled = false;
            closeModalBtn.disabled = false;
            focusTrap.deactivate();
        })
})

document.querySelectorAll('[data-delete-url]').forEach((item) => {
    item.addEventListener("click", displayDeleteItemModal)
})

deletionModal.addEventListener("toggle", (evt) => {
    if (evt.newState === "open") {
        focusTrap = createFocusTrap(deletionModal);
        focusTrap.activate();
    } else {
        focusTrap.deactivate()
    }
})
