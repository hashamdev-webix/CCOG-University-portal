import express from "express";
import {
  createCheckoutSession,
  getMyPayments,
  getAllPayments,
} from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/checkout-session", protect, createCheckoutSession);
router.get("/my-payments", protect, getMyPayments);
router.get("/admin", protect, adminOnly, getAllPayments);

export default router;