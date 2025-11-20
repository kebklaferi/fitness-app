"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Users_1 = require("../models/Users");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const { username, email, phoneNumber, name_surname, password, role } = req.body;
        if (!username || !password || !email || !phoneNumber || !name_surname) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        // Check if user/email/phone already exists
        const existingUser = await Users_1.User.findOne({
            $or: [{ username }, { email }, { phoneNumber }],
        });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: 'Username, email, or phone number already exists.' });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const validRoles = ['uporabnik', 'trener', 'admin'];
        const newUser = new Users_1.User({
            username,
            email,
            phoneNumber,
            name_surname,
            passwordHash,
            role: validRoles.includes(role) ? role : 'uporabnik',
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    }
    catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Error creating user.', error: err });
    }
});
exports.default = router;
