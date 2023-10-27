import mongoose from 'mongoose';

import dotenv from "dotenv";

let envFilePath = '.env.prod.local';
if(process.env.NODE_ENV === "development") {
  envFilePath = '.env.dev.local';
}
const envVars = dotenv.config({ path: envFilePath })

// https://www.mongodb.com/try/download/community-kubernetes-operator
const dbName = 'sae501';
const url = `mongodb://0.0.0.0:${envVars.MONGODB_PORT || 27017}/${dbName}`;
// const client = new MongoClient(url);

// Database Name

async function main() {
    await mongoose.connect(url)
  // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   console.log('collection');
//   const collection = db.collection('articles');
//   const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
