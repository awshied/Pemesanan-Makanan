import express from "express";
import { upload } from "../middlewares/multer.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  createMenu,
  getAdminMenu,
  getUserMenu,
  getMenuDetail,
  toggleStock,
  updateMenu,
  deleteMenu,
} from "../controllers/menu.controller.js";

const router = express.Router();

// Bagian Admin
router.post(
  "/admin/kelola-menu",
  upload.array("images", 4),
  protectRoute,
  createMenu
);
router.get("/admin/kelola-menu", protectRoute, getAdminMenu);
router.patch("/admin/kelola-menu/:id", protectRoute, toggleStock);
router.put(
  "/kelola-menu/:id",
  upload.array("images", 4),
  protectRoute,
  updateMenu
);
router.delete("/admin/kelola-menu/:id", protectRoute, deleteMenu);

// Bagian User
router.get("/menu", protectRoute, getUserMenu);
router.get("/menu/:id", protectRoute, getMenuDetail);

export default router;
