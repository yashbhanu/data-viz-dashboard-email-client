import mongoose from "mongoose";

export const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Mongo DB Running")
}