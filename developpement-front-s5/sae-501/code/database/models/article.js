import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

import CommentArticle from "./comment-article.js"
import Author from "./author.js"

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Veuillez mettre un titre, le champ ne peut pas être nul ou vide"],
            trim: true,
        },
        abstract: String,
        content: {
            type: String,
            required: [true, "Veuillez mettre un corps de texte, le champ ne peut pas être nul ou vide"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Veuillez mettre une image, le champ ne peut pas être nul ou vide"]
        },
        yt_link_id: String,
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
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author",
            default: null,
        },
        slug: {
            type: String,
            index: { unique: true, sparse: true }
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

articleSchema.pre('findOneAndDelete', { document: true, query: true }, async function(next) {
    try {
        // Deletes all related comments when an Article is deleted
        await CommentArticle.deleteMany({ article: this.getQuery()._id });
        await Author.findOneAndUpdate({ list_articles: this.getQuery()._id }, { "$pull": { list_articles: this.getQuery()._id } });
    } catch (e) {}

    next();
});

articleSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
});

articleSchema.pre("save", function(next) {
    if(!this.slug) {
        this.slug = `${slugify(this.title, { lower: true, trim: true })}-${this._id}`;
    }
    next();
  });
  

export default mongoose.model("Article", articleSchema);
