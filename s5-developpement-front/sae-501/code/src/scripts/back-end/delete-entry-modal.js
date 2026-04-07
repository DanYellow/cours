import { delegateEventHandler } from "#utils";

const modal = document.querySelector("[data-modal]");
const tplId = "delete-entry";
const modalTemplate = document.querySelector(`[data-tpl-id='${tplId}']`);
const modalTemplateContent = document.importNode(modalTemplate.content, true);

const displayDeleteItemModal = (e) => {
    while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
    }
    modal.dataset.modal = tplId;
    modal.append(modalTemplateContent.cloneNode(true));

    modal.querySelector("[data-delete-item]").dataset.deleteItem = e.source.dataset.deleteUrl;
    modal.querySelector("[data-modal-item-name]").textContent = e.source.dataset.deleteName;
};

modal.addEventListener("toggle", (e) => {
    if (e.newState === "open") {
        displayDeleteItemModal(e);
    }
})

delegateEventHandler(modal, "click", "[data-delete-item]", async (e) => {
    if (!modal.open || e.currentTarget.dataset.modal !== tplId) {
        return;
    }

    modal.setAttribute("inert", "");

    const errorMessageModal = modal.querySelector("[data-error-modal]");

    try {
        const deleteUrl = e.target.dataset.deleteItem;
        await fetch(deleteUrl, { method: "DELETE" });
        window.location.reload();
    } catch (error) {
        errorMessageModal.textContent = error.response?.data?.error || "Erreur";
        errorMessageModal.classList.remove("hidden");
        modal.removeAttribute("inert");
    }
});
