import mongoose, { Schema } from "mongoose";

import { isEmptyValidator } from "../validator.js";

const authorSchema = new Schema({
    lastname: String,
    firstname: String,
    email: String,
    image: {
        type: String,
        required: [true, "Image obligatoire"]
    },
    bio: String,
    list_articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
    ],
});

authorSchema
    .path("firstname")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un nom de famille, le champ ne peut pas être nul ou vide"
    );

authorSchema
    .path("lastname")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un prénom, le champ ne peut pas être nul ou vide"
    );

authorSchema
    .path("email")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un email, le champ ne peut pas être nul ou vide"
    );


export default mongoose.model("Author", authorSchema);
