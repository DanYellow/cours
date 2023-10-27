import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema({
  title: String,
  content: String,
  image: String,
  yt_link: String,
}, { timestamps: true });

export default mongoose.model("Article", articleSchema);
