import mongoose, { Schema } from "mongoose";

import { isEmptyValidator } from "../validator.js";

const articleSchema = new Schema(
    {
        title: String,
        abstract: String,
        content: String,
        image: String,
        yt_link: String,
        is_active: {
            type: Boolean,
            default: false,
            cast: (v) => Boolean(v),
        },
        list_comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CommentArticle",
            },
        ],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

articleSchema
    .path("title")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un titre, le champ ne peut pas être nul ou vide"
    );

articleSchema.pre("findOneAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
});

export default mongoose.model("Article", articleSchema);
