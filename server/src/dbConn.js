import mongoose from "mongoose";

export const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Mongo DB Running")
}