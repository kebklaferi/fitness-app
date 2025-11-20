"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = require("../models/Users");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET)
            return res.status(500).json({ message: 'JWT_SECRET not defined' });
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: 'Username and password required' });
        const user = await Users_1.User.findOne({ username });
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials.' });
        const valid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!valid)
            return res.status(401).json({ message: 'Invalid credentials.' });
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful ✅',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            },
        });
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error during login.', error: err });
    }
});
exports.default = router;
