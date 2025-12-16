import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  pesananCOD,
  pesananStripe,
  pesananPelanggan,
  semuaPesanan,
  updateStatus,
} from "../controllers/pesanan.controller.js";

const router = express.Router();

// Pembayaran
router.post("/cod", protectRoute, pesananCOD);
router.post("/stripe", protectRoute, pesananStripe);

// Admin Panel
router.get("/admin/kelola-pesanan", protectRoute, semuaPesanan);
router.patch("/admin/:id/status", protectRoute, updateStatus);

// User
router.get("/pesanan", protectRoute, pesananPelanggan);

export default router;
