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
    const dataDir = path_1.default.join(__dirname, '../data');
    const filePath = path_1.default.join(dataDir, 'users.json');
    // Ensure data folder exists
    if (!fs_1.default.existsSync(dataDir)) {
        fs_1.default.mkdirSync(dataDir, { recursive: true });
    }
    let users = [];
    // Read existing users
    try {
        if (fs_1.default.existsSync(filePath)) {
            const data = fs_1.default.readFileSync(filePath, 'utf-8');
            users = JSON.parse(data);
        }
    }
    catch (err) {
        console.error('Error reading user data:', err);
        return res.status(500).json({ message: 'Error reading user data.', error: err });
    }
    // Check if username already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
    }
    // Hash password
    let passwordHash;
    try {
        passwordHash = await bcryptjs_1.default.hash(password, 10);
    }
    catch (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ message: 'Error processing password.', error: err });
    }
    const validRoles = ['uporabnik', 'trener', 'admin'];
    const newUser = {
        id: (0, uuid_1.v4)(),
        username,
        passwordHash,
        role: validRoles.includes(role) ? role : 'uporabnik',
    };
    users.push(newUser);
    // Write updated users to file
    try {
        fs_1.default.writeFileSync(filePath, JSON.stringify(users, null, 2));
    }
    catch (err) {
        console.error('Error writing user data:', err);
        return res.status(500).json({ message: 'Error saving user data.', error: err });
    }
    res.status(201).json({ message: 'User registered successfully.' });
});
exports.default = router;
