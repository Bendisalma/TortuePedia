import express from "express";
import tortueRouter from "./tortueRouter.js";
import UserRouter from "./UserRouter.js";

const router = express.Router();

router.use("/tortue", tortueRouter);
router.use("/auth", UserRouter);
router.use("/auth", UserRouter);

export default router;
