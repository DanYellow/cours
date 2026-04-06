import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
import * as z from "zod";

import { listStopWords } from "#database/list-stop-words.js";
import { errorRequiredMessage } from "#database/error-messages.js";
import CommentArticle from "./comment-article.js";
import Author from "./author.js";

export const ArticleZodSchema = z.object({
    title: z
        .string({
            error: errorRequiredMessage("un titre"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un titre") }),
    abstract: z.string().optional(),
    content: z
        .string({
            error: errorRequiredMessage("un corps de texte"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un corps de texte") }),
    image: z.string({ error: "Image obligatoire" }).trim().min(1, { error: "Image obligatoire" }),
    yt_video_id: z.string().optional(),
    is_active: z.coerce.boolean().default(false),
});

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        abstract: String,
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        yt_video_id: {
            type: String,
        },
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
            index: { unique: true, sparse: true },
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    },
);

articleSchema.pre(
    "findOneAndDelete",
    { document: true, query: true },
    async function (next) {
        try {
            // Deletes all related comments when an Article is deleted
            await CommentArticle.deleteMany({ article: this.getQuery()._id });
            await Author.findOneAndUpdate(
                { list_articles: this.getQuery()._id },
                { $pull: { list_articles: this.getQuery()._id } },
            );
        } catch {}

        next();
    },
);

articleSchema.pre("findOneAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
});

articleSchema.pre("save", function (next) {
    if (!this.slug) {
        const regex = new RegExp(listStopWords.join("|"), "gi");
        const replacedTitle = this.title.replace(regex, "");

        this.slug = `${slugify(replacedTitle, { lower: true, trim: true })}-${
            this._id
        }`;
    }
    next();
});

export default mongoose.model("Article", articleSchema);
