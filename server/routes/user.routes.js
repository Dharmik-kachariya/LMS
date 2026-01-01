import express from "express";
import {
  register,
  login,
  logout,
  getUserProfile,
  updateProfile
} from "../controllers/user.controller.js";
import upload from "../utils/multer.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", isAuthenticated, getUserProfile);

//update profile
 router.put("/profile/update", isAuthenticated, upload.single("profilePhoto"),updateProfile);

export default router;
