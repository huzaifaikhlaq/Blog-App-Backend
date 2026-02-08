import BlogModel from "../models/blogModel.js";

// ======CREATE BLOG======
export const createBlog = async (req, res) => {
    try {
        const blog = await BlogModel.create(req.body);
        res.json({ message: "Blog created successfully", blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ======GET ALL BLOGS======
export const getBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find().populate("author", "name email");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ======GET SINGLE BLOG======
export const getBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id).populate("author", "name email");
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ====UPDATE BLOG=====
export const updateBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE BLOG 
export const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully", blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Publish Blog
export const publishBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(req.params.id, { published: true }, { new: true });
        res.json({ message: "Blog published successfully", blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// unpublish Blog
export const unpublishBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(req.params.id, { published: false }, { new: true });
        res.json({ message: "Blog unpublished successfully", blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}