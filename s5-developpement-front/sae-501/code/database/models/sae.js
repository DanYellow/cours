import mongoose, { Schema } from "mongoose";
import * as z from "zod";

import { errorRequiredMessage } from "#database/error-messages.js";

export const SaeZodSchema = z.object({
    title: z
        .string({
            error: errorRequiredMessage("un titre"),
        })
        .trim()
        .min(1, { error: errorRequiredMessage("un titre") }),
    content: z
        .string({
            error: errorRequiredMessage("une biographie"),
        })
        .max(200, 'Le champ "bio" ne peut pas dépasser 300 caractères'),
    image: z.string().optional(),
});

const saeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
    },
    image: String,
});

export default mongoose.model("SAE", saeSchema);
