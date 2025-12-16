import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  tambahKeranjang,
  updateKeranjang,
} from "../controllers/keranjang.controller.js";

const router = express.Router();

router.post("/keranjang/tambah", protectRoute, tambahKeranjang);
router.put("/keranjang/update", protectRoute, updateKeranjang);

export default router;
