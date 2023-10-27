import mongoose, { Schema } from "mongoose";

const saeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  image: String,
});

export default mongoose.model("SAE", saeSchema);
