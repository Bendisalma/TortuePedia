import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { USER } from "../controllers/userController.js";
router.post("/signup", USER.signup);
router.post("/login", USER.login);
router.get("/about",auth, USER.getAllUsers);

export default router;
