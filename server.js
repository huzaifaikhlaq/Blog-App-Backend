import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

// Root test route
app.get("/", (req, res) => {
    res.json({ message: "API is working ✅" });
});

// Local dev start
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 2009;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

// Vercel serverless handler
export default async function handler(req, res) {
    try {
        await connectDB();
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        return res.status(500).json({ error: "Database connection failed" });
    }

    return new Promise((resolve, reject) => {
        app(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}