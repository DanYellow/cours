import {
    clamp,
} from "./utils";

export default (modal, drag, resetPosition) => {
    let isDraggingDown = false;
    let firstTouchPos = 0;
    let firstTouchTime = 0;
    let distanceDelta = 0;

    const quickCloseModalTime = 250;
    const closeModalThreshold = 0.7;
    const quickCloseModalThreshold = 0.1;
    const backdropOpacityFactor = 1.5;
    const backdropBlurFactor = 4;
    const animationSpeedFactor = 3;

    const modalOriginalBackdropBlur = parseInt(window.getComputedStyle(modal).getPropertyValue("--details-modal-blur"));
    const modalOriginalAnimationSpeed = window.getComputedStyle(modal).getPropertyValue("--animation-speed");

    const listPulldownModalIndicator = modal.querySelectorAll("[data-pulldown-indicator]");

    drag.addEventListener('touchstart', e => {
        isDraggingDown = true;
        firstTouchPos = e.touches[0].pageY;
        firstTouchTime = new Date().getTime();

        modal.style.setProperty("--details-modal-blur", `${modalOriginalBackdropBlur}px`);
        modal.style.setProperty("--animation-speed", 0);
        modal.style.overflow = "hidden";
        modal.dataset.isClosing = false;

        listPulldownModalIndicator.forEach(item => {
            item.style.backgroundColor = window.getComputedStyle(modal).getPropertyValue("--darken-bg-color");
            item.classList.remove(...["rotate-0!"] );
        });
    }, { passive: true });

    drag.addEventListener('touchmove', e => {
        listPulldownModalIndicator.forEach(item => {
            item.classList.add(...["rotate-0!"] );
        });

        if (isDraggingDown) {
            const diff = e.touches[0].pageY - firstTouchPos;
            modal.style.translate = `0 ${diff}px`;

            distanceDelta = (diff / window.innerHeight);
            modal.style.opacity = 1 - (distanceDelta / backdropOpacityFactor);

            const modalBackdropBlur = clamp(
                modalOriginalBackdropBlur - (distanceDelta * backdropBlurFactor),
                0,
                modalOriginalBackdropBlur
            );

            modal.style.setProperty("--details-modal-blur", `${modalBackdropBlur}px`);
        }
    }, { passive: true });

    drag.addEventListener('touchend', e => {
        const timeDiff = new Date().getTime() - firstTouchTime;
        const distanceDiff = e.changedTouches[0].pageY - firstTouchPos;

        listPulldownModalIndicator.forEach(item => {
            item.style.backgroundColor = "revert-layer";
            item.classList.remove(...["rotate-0!"] );
        });
        modal.style.overflow = "revert";

        if (
            (timeDiff < quickCloseModalTime &&
            distanceDiff / window.innerHeight > quickCloseModalThreshold) ||
            distanceDiff / window.innerHeight > closeModalThreshold
        ) {
            modal.dataset.isClosing = true;
            modal.style.setProperty("--animation-speed", `${parseFloat(modalOriginalAnimationSpeed) / animationSpeedFactor}s`);
            modal.style.translate = "0 100vh";
        } else {
            modal.style.setProperty("--animation-speed", modalOriginalAnimationSpeed);
            resetPosition();
        }
    });

    modal.addEventListener("close", () => {
        listPulldownModalIndicator.forEach(item => {
            item.classList.remove(...["rotate-0!"] );
        });
    });
}
