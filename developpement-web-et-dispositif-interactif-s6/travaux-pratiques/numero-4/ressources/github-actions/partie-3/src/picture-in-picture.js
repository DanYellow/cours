import { modal_DOM, modal } from "./utils";

if ("documentPictureInPicture" in window) {
    const togglePictureInPicture = async () => {
        if (window.documentPictureInPicture.window) {
            window.documentPictureInPicture.window.close();
            return;
        } else {
            const pipOptions = {
                initialAspectRatio: modal.clientWidth / modal.clientHeight,
                lockAspectRatio: true,
                copyStyleSheets: true,
            };
            const pipWindow = await documentPictureInPicture.requestWindow(
                pipOptions
            );

            Array.from(document.scripts).forEach((item) => {
                const scriptTag = document.createElement("script");
                scriptTag.src = item.src;
                scriptTag.type = "module";
                pipWindow.document.head.append(scriptTag);
            });

            [...document.styleSheets].forEach((styleSheet) => {
                try {
                    const cssRules = [...styleSheet.cssRules]
                        .map((rule) => rule.cssText)
                        .join("");
                    const style = document.createElement("style");

                    style.textContent = cssRules;
                    pipWindow.document.head.appendChild(style);
                } catch (e) {
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.type = styleSheet.type;
                    link.media = styleSheet.media;
                    link.href = styleSheet.href;
                    pipWindow.document.head.appendChild(link);
                }
            });

            pipWindow.document.body.append(modal);
            modal.close();

            pipWindow.addEventListener("pagehide", () => {
                const dialog = pipWindow.document.querySelector("dialog");
                dialog.removeAttribute("data-picture-in-picture");
                if (dialog) {
                    dialog.close();
                }
                document.body.append(dialog);
                modal.showModal();
            });
        }
    };

    modal_DOM.listTogglePip.forEach((item) => {
        item.addEventListener("click", () => {
            togglePictureInPicture();
        });
    });

    documentPictureInPicture.addEventListener("enter", (event) => {
        const pipWindow = event.window;

        const config = { attributes: false, childList: true };

        const pipObserverCallback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type == "childList") {
                    const pipModal = pipWindow.document.querySelector("dialog");
                    if (pipModal) {
                        pipModal.dataset.pictureInPicture = "";
                        pipModal.showModal();
                    }
                }
            }
        };

        const pipObserver = new MutationObserver(pipObserverCallback);
        pipObserver.observe(pipWindow.document.body, config);
    });
} else {
    modal_DOM.listTogglePip.forEach((item) => {
        item.remove();
    });
}
