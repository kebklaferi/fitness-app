import { Router } from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { User } from "../models/Users";

const router = Router();

// GET /api/user — returns the current logged-in user
router.get("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user.id; // JWT payload contains MongoDB _id

    const user = await User.findById(userId).select("-passwordHash"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
