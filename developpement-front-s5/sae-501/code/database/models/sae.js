import mongoose, { Schema } from "mongoose";
import { isEmptyValidator } from '../validator.js'

const saeSchema = new Schema({
  title: String,
  content: String,
  image: String,
});

saeSchema.path("title").validate(isEmptyValidator, "Veuillez mettre un titre, le champ ne peut pas être nul")

saeSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
});

const SAE = mongoose.model("SAE", saeSchema)

export default SAE;

// export const create = async () => {
//     let sae = new SAE({ ...req.body });
//     await sae.save();

//     return sae;
// }
