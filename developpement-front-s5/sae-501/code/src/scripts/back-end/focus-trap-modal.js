import { createFocusTrap } from "focus-trap";

let focusTrap = null;
const focusTrapModal = document.querySelectorAll("[data-focus-trap-modal]");

focusTrapModal.forEach((item) => {
    item.addEventListener("toggle", (evt) => {
        if (evt.newState === "open") {
            focusTrap = createFocusTrap(item, { escapeDeactivates: false });
            focusTrap.activate();
        } else {
            focusTrap.deactivate();
        }
    });
});
