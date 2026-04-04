import express from "express";
import multer from "multer";

import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

// Use memory storage for serverless environments
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Public Routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// ✅ Admin Routes
router.post(
  "/create",
  protect,
  adminOnly,
  upload.single("thumbnail"),
  createCourse,
);

router.put(
  "/update/:id",
  protect,
  adminOnly,
  upload.single("thumbnail"),
  updateCourse,
);

router.delete("/admin/:id", protect, adminOnly, deleteCourse);

export default router;
