import express from "express";
const router = express.Router();

import { USER } from "../controllers/userController.js";
router.post("/signup", USER.signup);
router.post("/login", USER.login);

export default router;
