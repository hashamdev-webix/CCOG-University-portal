import express from "express";
import {
  register,
  login,
  logout,
  adminLogin,
  updateProfile,
  getAllStudents,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);
router.post("/logout", logout);

router.get("/me", protect, async (req, res) => {
  try {
    // Admin token has no id, just email + role
    if (req.user.role === "admin") {
      return res.status(200).json({
        success: true,
        user: { email: req.user.email, role: "admin" },
      });
    }
    const User = (await import("../models/user.model.js")).default;
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Student updates own profile
router.put("/me/update", protect, updateProfile);

// Admin gets all students
router.get("/students", protect, adminOnly, getAllStudents);

export default router;