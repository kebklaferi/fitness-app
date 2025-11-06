"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
// Registration endpoint
router.post('/', async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required.' });
    }
    const filePath = path_1.default.join(__dirname, '../data/users.json');
    let users = [];
    try {
        if (fs_1.default.existsSync(filePath)) {
            const data = fs_1.default.readFileSync(filePath, 'utf-8');
            users = JSON.parse(data);
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Error reading user data.' });
    }
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const newUser = {
        id: (0, uuid_1.v4)(),
        username,
        passwordHash,
        role: role === 'trainer' ? 'trainer' : 'user',
    };
    users.push(newUser);
    try {
        fs_1.default.writeFileSync(filePath, JSON.stringify(users, null, 2));
    }
    catch (err) {
        return res.status(500).json({ message: 'Error saving user data.' });
    }
    res.status(201).json({ message: 'User registered successfully.' });
});
exports.default = router;
