import mongoose, { Schema } from "mongoose";

const saeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  image: String,
});

const SAE = mongoose.model("SAE", saeSchema)

export default SAE;

// export const create = async () => {
//     let sae = new SAE({ ...req.body });
//     await sae.save();

//     return sae;
// }
