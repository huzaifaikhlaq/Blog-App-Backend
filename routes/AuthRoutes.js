import express from "express";
import { loginUser, signupUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser); // login user
router.post("/signup", signupUser); // signup user

export default router;