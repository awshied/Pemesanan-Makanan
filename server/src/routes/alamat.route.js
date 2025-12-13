import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { tambahAlamat, getAlamat } from "../controllers/alamat.controller.js";

const alamatRouter = express.Router();

alamatRouter.post("/tambah", protectRoute, tambahAlamat);
alamatRouter.get("/", protectRoute, getAlamat);

export default alamatRouter;
