import mongoose, { Schema } from "mongoose";
import validator from "validator";

const saeSchema = new Schema({
    title: {
        type: String,
        required: [
            true,
            "Veuillez mettre un titre, le champ ne peut pas être nul ou vide",
        ],
        trim: true,
    },
    content: String,
    image: String,
});

saeSchema
    .path("content")
    .validate(
        (value) => validator.isLength(value.trim(), { max: 200 }),
        `Le champ "contenu" ne peut pas dépasser 200 caractères`
    );

saeSchema.pre("findOneAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
});

export default mongoose.model("SAE", saeSchema);
