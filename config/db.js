import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000, // Timeout after 10s
        });

        isConnected = true;
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        isConnected = false;
        throw error;
    }
};

mongoose.connection.on('connected', () => {
    isConnected = true;
    console.log('MongoDB connected');
});

mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.log('MongoDB disconnected');
});