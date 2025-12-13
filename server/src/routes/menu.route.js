import express from "express";
import { upload } from "../middlewares/multer.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  createMenu,
  listMenu,
  singleMenu,
  toggleStock,
} from "../controllers/menu.controller.js";

const menuRouter = express.Router();

menuRouter.post("/", upload.array("images", 4), protectRoute, createMenu);
menuRouter.get("/", listMenu);
menuRouter.get("/single", singleMenu);
menuRouter.post("/toggle-stock", protectRoute, toggleStock);

export default menuRouter;
