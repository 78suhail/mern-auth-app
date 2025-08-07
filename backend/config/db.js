import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(" Database connected successfully")
    } catch (error) {
        console.error("Error connecting to the database:", error.message)
        
    }
}


export default connectDB;

await mongoose.connect(process.env.MONGO_URL)