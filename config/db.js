import mongoose from "mongoose";

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("✅ Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connected to MongoDB Atlas successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
};
