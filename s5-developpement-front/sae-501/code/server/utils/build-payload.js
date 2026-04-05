import fs from "node:fs";

export const buildPayload = (body = {}, file = null) => {
    if (!file) {
        return body;
    }

    const form = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        form.append(key, value);
    });

    form.append(file.fieldname, fs.createReadStream(file.path), {
        filename: file.originalname,
        contentType: file.mimetype,
    });

    return form;
};
