"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        return res.status(500).json({ message: "JWT_SECRET not defined in server environment" });
    }
    const { username, password } = req.body;
    const filePath = path_1.default.join(__dirname, "../data/users.json");
    let users = [];
    try {
        if (fs_1.default.existsSync(filePath)) {
            users = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error reading user data." });
    }
    const user = users.find(u => u.username === username);
    if (!user)
        return res.status(401).json({ message: "Invalid credentials." });
    const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!valid)
        return res.status(401).json({ message: "Invalid credentials." });
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});
exports.default = router;
