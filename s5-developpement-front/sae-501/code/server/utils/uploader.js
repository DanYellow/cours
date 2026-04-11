import path from "path";
import fs from "fs/promises";
import { existsSync } from "node:fs";
import multer from "multer";

import { imageValidator } from "#utils-shared";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(
                file.originalname
            )}`
        );
    },
});

const upload = multer({ storage });

export default upload;

const uploadImage = async (image, upload_dir) => {
    let targetPath = undefined;
    const listErrors = [];
    const error = imageValidator(image);

    if (Object.keys(error) > 0) {
        listErrors.push(error.message);
    } else {
        if (!fs.existsSync(upload_dir)){
            fs.mkdirSync(upload_dir, { recursive: true });
        }

        targetPath = `${upload_dir}${image.filename}`;
        const tempPath = image.path;
        try {
            await fs.copyFile(tempPath, targetPath);
        } catch (err) {
            listErrors.push(err);
        }
    }
    return {
        image_path: targetPath,
        list_errors: listErrors,
        image_name: image.filename,
    };
};

const deleteUpload = (path) => {
    if (!path) return [];
    const listErrors = [];
    fs.unlink(path)
        .then()
        .catch((err) => {
            listErrors.push(err);
        });

    return listErrors;
};

export { uploadImage, deleteUpload };
