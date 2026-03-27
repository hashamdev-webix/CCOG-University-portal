import express from "express";
import { stripeWebhook } from "../controllers/stripeWebhook.controller.js";

const router = express.Router();

// IMPORTANT: raw body is required for Stripe signature verification
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;