import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  pesananCOD,
  pesananStripe,
  pesananPelanggan,
  semuaPesanan,
  updateStatus,
} from "../controllers/pesanan.controller.js";

const pesananRouter = express.Router();

// Pembayaran
pesananRouter.post("/cod", protectRoute, pesananCOD);
pesananRouter.post("/stripe", protectRoute, pesananStripe);
// Admin Panel
pesananRouter.get("/", protectRoute, semuaPesanan);
pesananRouter.post("/status", protectRoute, updateStatus);
// User
pesananRouter.post("/pesanan-pelanggan", protectRoute, pesananPelanggan);

export default pesananRouter;
