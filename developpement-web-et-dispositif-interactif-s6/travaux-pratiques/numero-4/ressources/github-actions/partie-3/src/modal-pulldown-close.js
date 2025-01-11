import {
    clamp,
} from "./utils";

export default (modal, drag, resetModal) => {
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
    }, { passive: true });

    drag.addEventListener('touchmove', e => {
        e.preventDefault();
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

        if (
            timeDiff < 500 &&
            distanceDiff / window.innerHeight > quickCloseModalThreshold
        ) {
            modal.style.setProperty("--animation-speed", modalOriginalAnimationSpeed);
            modal.style.translate = "0 100vh";
        }
    })
}
