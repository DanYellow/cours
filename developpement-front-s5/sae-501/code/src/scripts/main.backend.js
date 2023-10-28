import axios from "axios"

import "/src/styles/base.css";
import "/src/styles/tailwind.css";
import "/src/styles/back-end/index.scss";

const deletionModal = document.querySelector("[data-deletion-modal]")
const closeModalBtn = document.querySelector("[data-deletion-modal] [data-close-modal]")
const deleteItemModalBtn = document.querySelector("[data-deletion-modal] [data-delete-item]")
const errorMessageModal = document.querySelector("[data-deletion-modal] [data-error-modal]")

const displayDeleteItemModal = async (e) => {
    const ressourceData = JSON.parse(e.currentTarget.dataset.itemData)
    deletionModal.classList.remove("hidden")
    deleteItemModalBtn.dataset.deleteItem = e.currentTarget.dataset.deleteUrl
    deletionModal.querySelector("[data-modal-item-name]").textContent = ressourceData.title
}

closeModalBtn.addEventListener("click", () => {
    deletionModal.classList.add("hidden")
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
            errorMessageModal.classList.remove("hidden")
            errorMessageModal.textContent = error.response.data.error || "Erreur"
        }).finally(() => {
            deleteItemModalBtn.disabled = false;
            closeModalBtn.disabled = false;
        })
})

document.querySelectorAll('[data-delete-url]').forEach((item) => {
    item.addEventListener("click", displayDeleteItemModal)
})