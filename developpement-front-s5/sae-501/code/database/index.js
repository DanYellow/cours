import mongoose from "mongoose";
import dotenv from "dotenv";

import Article from './models/article.js'



let envFilePath = ".env.prod.local";
if (process.env.NODE_ENV === "development") {
  envFilePath = ".env.dev.local";
}
const envVars = dotenv.config({ path: envFilePath });

// https://www.mongodb.com/try/download/community-kubernetes-operator
// Database Name
const dbName = "sae501";
const url = `mongodb://0.0.0.0:${envVars.MONGODB_PORT || 27017}/${dbName}`;

async function main() {
  await mongoose.connect(url);
  const article = new Article()
  console.log("Article", article)
  await article.save()

  return "Connection etablished";
}

main().then(console.log).catch(console.error);

// node database/index.js --input-type=module

// let article = new Article({ title: Math.random() });
//     await article.save();