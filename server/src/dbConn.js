import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Mongo DB Running")
}