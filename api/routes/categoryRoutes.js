import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory); // create a category
router.get("/", getCategories); // get all categories

export default router;