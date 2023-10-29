import mongoose, { Schema } from "mongoose";

import { isEmptyValidator } from "../validator.js";

const commentArticleSchema = new Schema({
    content: String,
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        required: true,
    }
},
{ 
    timestamps: { createdAt: 'created_at' }
}
)

commentArticleSchema
    .path("content")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un commentaire, le champ ne peut pas être nul ou vide"
    );

export default mongoose.model("CommentArticle", commentArticleSchema)