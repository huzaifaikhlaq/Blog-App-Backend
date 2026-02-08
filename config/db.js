import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    // Use existing connection if available
    if (isConnected) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }

    if (mongoose.connection.readyState >= 1) {
        isConnected = true;
        console.log("✅ Already connected to MongoDB");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            bufferCommands: false,
            maxPoolSize: 10,
        });

        isConnected = true;
        console.log("✅ Connected to MongoDB Atlas successfully");
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        isConnected = false;
        throw error;
    }
};