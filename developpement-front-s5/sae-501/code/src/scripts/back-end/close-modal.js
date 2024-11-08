import { delegateEventHandler } from "../utils";

const closeModal = (e) => {
    e.target.closest("dialog[open]").close();
};

delegateEventHandler(document, "click", "[data-close-modal]", closeModal);
