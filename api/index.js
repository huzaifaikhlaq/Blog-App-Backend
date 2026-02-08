import app from "../server.js";
import { connectDB } from "../config/db.js";

// Connect to DB on cold start
connectDB().catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});

// Export the Express app as serverless function
export default app;