import express from "express";
import {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessageStatus,
  deleteContactMessage,
} from "../controllers/contactMessage.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

// Public
router.post("/", createContactMessage);

// Admin
router.get("/admin", protect, adminOnly, getAllContactMessages);
router.get("/admin/:id", protect, adminOnly, getContactMessageById);
router.put("/admin/:id/status", protect, adminOnly, updateContactMessageStatus);
router.delete("/admin/:id", protect, adminOnly, deleteContactMessage);

export default router;