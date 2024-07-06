import axios from "axios";

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
            errorMessageModal.textContent = error.response.data.error || "Erreur";
            errorMessageModal.classList.remove("hidden");
        }).finally(() => {
            deleteItemModalBtn.disabled = false;
            closeModalBtn.disabled = false;
        })
})

document.querySelectorAll('[data-delete-url]').forEach((item) => {
    item.addEventListener("click", displayDeleteItemModal)
});
