"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const Users_1 = require("../models/Users");
const router = (0, express_1.Router)();
// GET /api/user — returns the current logged-in user
router.get("/", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // JWT payload contains MongoDB _id
        const user = await Users_1.User.findById(userId).select("-passwordHash"); // exclude password
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user });
    }
    catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});
exports.default = router;
