import express from "express";
import multer from "multer";
import { nanoid } from "nanoid";
import auth from "../middleware/auth.js";
// import {
//   createTortue,
//   deleteTortueById,
//   getAllTortues,
// } from "../controllers/tortueController.js";
import { API } from "../controllers/tortueController.js";
const router = express.Router();

//multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + nanoid() + "-" + file.originalname);
  },
});
let upload = multer({ storage: storage });

router.post("/", upload.single("image"), API.createTortue);
router.get("/",auth, API.getAllTortues);
router.get("/:id",auth, API.findTortueById);
router.patch("/:id",auth, upload.single("image"), API.updateTortue);
router.delete("/:id",auth, API.DeleteTortue);
export default router;
