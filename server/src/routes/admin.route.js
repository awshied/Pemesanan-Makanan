import express from "express";
import { adminOnly, protectRoute } from "../middlewares/auth.middleware.js";
import {
  getSemuaPelanggan,
  getLatestOnline,
  deletePelanggan,
  getDashboardData,
  getRevenueAndExpense,
  getTopMenu,
  getTopCategorySales,
  getCustomerGrowth,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/admin/dashboard/pelanggan", protectRoute, getSemuaPelanggan);
router.get(
  "/admin/dashboard/pelanggan/latest-online",
  protectRoute,
  getLatestOnline
);
router.delete("/admin/dashboard/pelanggan/:id", protectRoute, deletePelanggan);

router.get("/admin/dashboard", protectRoute, adminOnly, getDashboardData);
router.get(
  "/admin/dashboard/revenue-expense",
  protectRoute,
  getRevenueAndExpense
);
router.get("/admin/dashboard/top-menu", protectRoute, getTopMenu);
router.get("/admin/dashboard/top-category", protectRoute, getTopCategorySales);
router.get("/admin/dashboard/customer-growth", protectRoute, getCustomerGrowth);

export default router;
