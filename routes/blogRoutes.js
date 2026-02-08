import express from "express";
import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog, publishBlog, unpublishBlog } from "../controllers/blogController.js";

const router = express.Router();

router.post("/", createBlog); // create a blog
router.get("/", getBlogs); // get all blogs
router.get("/:id", getBlog); // get a blog by id
router.put("/:id", updateBlog); // update a blog by id
router.delete("/:id", deleteBlog); // delete a blog by id
router.patch("/:id/unpublish", unpublishBlog); // unpublish a blog by id
router.patch("/:id/publish", publishBlog); // publish a blog by id

export default router;   