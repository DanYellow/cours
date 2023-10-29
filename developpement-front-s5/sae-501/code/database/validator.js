const imageValidator = (image) => {
    const listAllowedMimeType = ["image/png", "image/jpg", "image/jpeg"]

    if (!listAllowedMimeType.includes(image.mimetype)) {
        return 'Format incorrect uploadé'
    }

    const fileLimit = 1024 * 1024 * 0.8; // 800kB
    if (image.size > fileLimit) {
        return "Image trop lourde. 800kb maximum"
    }

    return null
}

const isEmptyValidator = (val) => val?.length > 0

export {
    imageValidator,
    isEmptyValidator
}