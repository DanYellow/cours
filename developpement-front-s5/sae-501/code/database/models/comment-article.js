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

commentArticleSchema.methods.getClean = function () {
    const res = {
        "_id": this._id,
        "content": this.content,
        "article": this.article._id,
        "created_at": this.created_at,
        "updatedAt": this.updatedAt,
        "__v": this.__v,
    }

    return res
}

export default mongoose.model("CommentArticle", commentArticleSchema)