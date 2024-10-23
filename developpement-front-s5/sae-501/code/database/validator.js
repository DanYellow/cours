// Validation rules

const imageValidator = (image, listAllowedMimeType = ["image/png", "image/jpg", "image/jpeg"], maxSizeFactor = 0.8) => {
    if (
        !listAllowedMimeType.includes(image?.mimetype || image.type)
    ) {
        return "Format incorrect uploadé";
    }

    const oneMo = 1024 * 1024;
    const fileLimit = oneMo * maxSizeFactor; // 800kB
    if (image.size > fileLimit) {
        const limitHundred = Math.floor(maxSizeFactor * 1024 / 100) * 100;
        return `Fichier trop lourd (${(image.size / oneMo).toFixed(2)}MB). ${limitHundred}kb maximum.`;
    }

    return null;
};

export { imageValidator };
