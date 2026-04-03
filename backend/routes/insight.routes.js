import express from "express";
import multer from "multer";
import {
  createInsight,
  getAllInsights,
  getInsightBySlug,
  getAllInsightsAdmin,
  getInsightByIdAdmin,
  updateInsight,
  deleteInsight,
} from "../controllers/insight.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// admin first
router.get("/admin/all", protect, adminOnly, getAllInsightsAdmin);
router.get("/admin/:id", protect, adminOnly, getInsightByIdAdmin);
router.post("/create", protect, adminOnly, upload.single("featuredImage"), createInsight);
router.put("/update/:id", protect, adminOnly, upload.single("featuredImage"), updateInsight);
router.delete("/admin/:id", protect, adminOnly, deleteInsight);

// public
router.get("/", getAllInsights);
router.get("/:slug", getInsightBySlug);

export default router;