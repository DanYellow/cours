import {
    clamp,
} from "./utils";

export default (modal, drag, resetPosition) => {
    let isDraggingDown = false;
    let firstTouchPos = 0;
    let firstTouchTime = 0;
    let distanceDelta = 0;

    const closeModalThreshold = 0.7;
    const quickCloseModalThreshold = 0.1;
    const modalOriginalBackdropBlur = parseInt(window.getComputedStyle(modal).getPropertyValue("--details-modal-blur")) || 4;
    const modalOriginalAnimationSpeed = window.getComputedStyle(modal).getPropertyValue("--animation-speed");

    drag.addEventListener('touchstart', e => {
        isDraggingDown = true;
        firstTouchPos = e.touches[0].pageY;
        firstTouchTime = new Date().getTime();

        modal.style.setProperty("--details-modal-blur", `${modalOriginalBackdropBlur}px`);
        modal.style.setProperty("--animation-speed", 0);
        modal.style.overflow = "hidden";
        modal.dataset.hasBeenTouched = true;
    }, { passive: true });

    drag.addEventListener('touchmove', e => {
        if (isDraggingDown) {
            const diff = e.touches[0].pageY - firstTouchPos;
            modal.style.translate = `0 ${diff}px`;

            distanceDelta = (diff / window.innerHeight).toFixed(2)
            modal.style.opacity = 1 - (distanceDelta / 3);

            const modalBackdropBlur = clamp(
                modalOriginalBackdropBlur - (distanceDelta * 5),
                0,
                modalOriginalBackdropBlur
            );
            modal.style.setProperty("--details-modal-blur", `${modalBackdropBlur}px`);

            if (diff / window.innerHeight > closeModalThreshold) {
                modal.style.setProperty("--animation-speed", modalOriginalAnimationSpeed);
                modal.style.translate = "0 100vh";
            }
        }
    }, { passive: true });

    drag.addEventListener('touchend', e => {
        const timeDiff = new Date().getTime() - firstTouchTime;
        const distanceDiff = e.changedTouches[0].pageY - firstTouchPos;
        modal.style.overflow = "revert";
        modal.style.setProperty("--animation-speed", modalOriginalAnimationSpeed);

        if (
            timeDiff < 250 &&
            distanceDiff / window.innerHeight > quickCloseModalThreshold
        ) {
            modal.style.translate = "0 100vh";
        } else {
            resetPosition();
        }
    });
}
