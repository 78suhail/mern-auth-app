import express from "express";
import { signup, login, logout, getUserData } from "../controllers/auth_controllers.js";
import { upload } from "../middlewares/multer.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

// 🔁 Multer is correctly set to handle "profileImage" field
router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getuserdata", checkAuth, getUserData);

export default router;
