// Validation rules

const imageValidator = (image) => {
    const listAllowedMimeType = ["image/png", "image/jpg", "image/jpeg"];

    if (
        !listAllowedMimeType.includes(image?.mimetype || image.type)
    ) {
        return "Format incorrect uploadé";
    }

    const oneMo = 1024 * 1024;
    const fileLimit = oneMo * 0.8; // 800kB
    if (image.size > fileLimit) {
        return `Image trop lourde (${(image.size / oneMo).toFixed(2)}MB). 800kb maximum`
    }

    return null;
};

export { imageValidator };
