import express from "express";
import {
  createApplication,
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();


// Student routes
router.post("/create", protect, createApplication);
router.get("/my-applications", protect, getMyApplications);


// Admin routes
router.get("/admin", protect, adminOnly, getAllApplications);
router.get("/admin/:id", protect, adminOnly, getApplicationById);
router.put("/admin/:id/status", protect, adminOnly, updateApplicationStatus);

export default router;