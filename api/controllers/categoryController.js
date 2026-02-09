import CategoryModel from "../models/categoryModel.js";

// ====CREATE CATEGORY=====
export const createCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const category = await CategoryModel.create({ name, slug });
        res.json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ====GET ALL CATEGORIES=====
export const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};