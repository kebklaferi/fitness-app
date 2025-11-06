"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = require("../data/users");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
// Registration endpoint
router.post('/register', async (req, res) => {
    // users imported from data/users
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required.' });
    }
    const existingUser = users_1.users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const newUser = {
        id: (0, uuid_1.v4)(),
        username,
        passwordHash,
    };
    users_1.users.push(newUser);
    res.status(201).json({ message: 'User registered successfully.' });
});
exports.default = router;
