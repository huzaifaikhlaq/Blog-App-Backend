import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import blogRoutes from "../routes/blogRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Middleware to ensure DB connection before each request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed:", error);
        res.status(503).json({
            error: "Database connection failed",
            message: "Please try again later"
        });
    }
});

// Routes
app.get("/", (req, res) => {
    res.json({ message: "API is working ✅" });
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        error: "Internal server error",
        message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message
    });
});

// For local development
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 2009;
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    });
}

// Export for Vercel
export default app;