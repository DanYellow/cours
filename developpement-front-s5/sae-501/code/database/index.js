import mongoose from "mongoose";
import dotenv from "dotenv";

let envFilePath = "./env/.env.prod.local";
if (process.env.NODE_ENV === "development") {
    envFilePath = "./env/.env.dev.local";
}
const envVars = dotenv.config({ path: envFilePath });

// https://www.mongodb.com/try/download/community-kubernetes-operator
// Database Name
const dbName = "sae501";
const port = envVars.parsed?.MONGODB_PORT || 27017;
const url = `mongodb://0.0.0.0:${port}/${dbName}`;

const main = async () => {
    try {
        await mongoose.connect(url, {
            serverSelectionTimeoutMS: 20000,
        });
        return `MongoDB Server started on port : ${port}`;
    } catch (error) {
        throw new Error(error);
    }
};

export default main;
