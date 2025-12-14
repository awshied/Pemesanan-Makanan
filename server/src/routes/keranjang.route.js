import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  tambahKeranjang,
  updateKeranjang,
} from "../controllers/keranjang.controller.js";

const keranjangRouter = express.Router();

keranjangRouter.post("/tambah", protectRoute, tambahKeranjang);
keranjangRouter.get("/", protectRoute, updateKeranjang);

export default keranjangRouter;
