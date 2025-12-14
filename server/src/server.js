import express from "express";
import dotenv from "dotenv";

dotenv.config();

import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import menuRouter from "./routes/menu.route.js";
import { connectDB } from "./lib/db.js";
import cloudinary from "./lib/cloudinary.js";
import alamatRouter from "./routes/alamat.route.js";
import keranjangRouter from "./routes/keranjang.route.js";
import pesananRouter from "./routes/pesanan.route.js";

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/menus", menuRouter);
app.use("/api/alamat", alamatRouter);
app.use("/api/keranjang", keranjangRouter);
app.use("/api/pesanan", pesananRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Servernya jalan di port: ", +PORT);
  connectDB();
});
