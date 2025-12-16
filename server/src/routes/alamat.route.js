import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  tambahAlamat,
  getAlamat,
  hapusAlamat,
} from "../controllers/alamat.controller.js";

const router = express.Router();

router.post("/alamat", protectRoute, tambahAlamat);
router.get("/alamat", protectRoute, getAlamat);
router.delete("/alamat/:id", protectRoute, hapusAlamat);

export default router;
