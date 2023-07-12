import express from "express";
import tortueRouter from "./tortueRouter.js";

const router = express.Router();

router.use("/tortue", tortueRouter);

export default router;
