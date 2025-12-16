import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profil", protectRoute, getUserProfile);

export default router;
