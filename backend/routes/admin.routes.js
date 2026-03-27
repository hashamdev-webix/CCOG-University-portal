import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
});

export default router;
