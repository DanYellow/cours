import mongoose, { Schema } from "mongoose";
import * as z from "zod";

import { errorRequiredMessage } from "#database/error-messages.js";

import Article from "./article.js";

const defaultColor = "#ff0000";

export const AuthorZodSchema = z.object({
    lastname: z
        .string({
            error: errorRequiredMessage("un nom de famille"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un nom de famille") }),
    firstname: z
        .string({ error: errorRequiredMessage("un prénom") })
        .trim()
        .min(1, { error: errorRequiredMessage("un prénom") }),
    email: z.email({ error: "Veuillez mettre un email valide" }).trim(),
    image: z.string({ error: "Image obligatoire" }).trim().min(1, { error: "Image obligatoire" }),
    bio: z
        .string()
        .max(300, 'Le champ "bio" ne peut pas dépasser 300 caractères'),
});

const authorSchema = new Schema({
    lastname: {
        type: String,
    },
    firstname: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
    },
    bio: {
        type: String,
    },
    color: {
        type: String,
        default: defaultColor,
    },
    list_articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
    ],
});

const HEX_COLOR_REGEX = /^#([0-9]{6}|[0-9]{3}|[0-9]{8}|[0-9]{4})$/i;
authorSchema.pre("save", function (next) {
    this.color = this.color.trim();
    if (!HEX_COLOR_REGEX.test(this.color)) {
        this.color = defaultColor;
    }

    next();
});

authorSchema.pre("findOneAndUpdate", function (next) {
    try {
        this._update.color = this._update.color.trim();
        if (!HEX_COLOR_REGEX.test(this.color)) {
            this._update.color = defaultColor;
        }
    } catch {}

    next();
});

authorSchema.pre(
    "findOneAndDelete",
    { document: true, query: true },
    async function (next) {
        try {
            // Unset all articles' author
            await Article.updateMany(
                { author: this.getQuery()._id },
                { author: null }
            );
        } catch {}

        next();
    }
);

authorSchema.pre("findOneAndUpdate", function (next) {
    this.options.runValidators = true;
    next();
});

export default mongoose.model("Author", authorSchema);
