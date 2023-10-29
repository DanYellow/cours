import mongoose, { Schema } from "mongoose";

import { isEmptyValidator } from '../validator.js'

const articleSchema = new Schema({
  title: String,
  chapo: String,
  content: String,
  image: String,
  yt_link: String,
  is_active: {
    type: Boolean,
    default: false
  },
},  
{ 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
);

articleSchema.path("title").validate(isEmptyValidator, "Veuillez mettre un titre, le champ ne peut pas être nul ou vide")

articleSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
});

export default mongoose.model("Article", articleSchema);
