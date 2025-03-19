import { modal_DOM, modal } from "./utils";

if ("documentPictureInPicture" in window) {
    const togglePictureInPicture = async () => {
        if (window.documentPictureInPicture.window) {
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
                    const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
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
            })

            pipWindow.document.body.append(modal);
            modal.close();

            pipWindow.addEventListener("pagehide", () => {
                const dialog = pipWindow.document.querySelector("dialog");
                dialog.close();
                document.body.append(dialog);
                dialog.showModal();
            });
        }
    };
    modal_DOM.togglePip.addEventListener("click", () => {
        togglePictureInPicture();
    });

    documentPictureInPicture.addEventListener("enter", (event) => {
        const pipWindow = event.window;

        const config = { attributes: false, childList: true };

        const callback = function (mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type == "childList") {
                    const pipModal = pipWindow.document.querySelector("dialog");
                    if (pipModal) {
                        pipModal.showModal();
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(pipWindow.document.body, config);
    });
} else {
    modal_DOM.togglePip.remove();
}
