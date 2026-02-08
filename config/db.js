import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("✅ Connected to MongoDB Atlas successfully"))
        .catch((err) => console.error("❌ MongoDB connection error:", err));
};