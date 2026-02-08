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

// DB connection
connectDB();

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);


// get all blogs 
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await BlogModel.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get all categories
app.get("/api/categories", async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get all users 
app.get("/api/auth", async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});