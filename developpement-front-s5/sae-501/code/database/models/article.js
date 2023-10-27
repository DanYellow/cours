import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema({
  title: String,
  content: String,
  image: String,
  yt_link: String,
  creation_date: { type: Date, default: Date.now() },
  last_update_date: Date,
});

export default mongoose.model("Article", articleSchema);
