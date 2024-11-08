import { delegateEvtHandler } from "../utils";

const closeModal = (e) => {
    e.target.closest("dialog[open]").close();
};

delegateEvtHandler(document, "click", "[data-close-modal]", closeModal);
