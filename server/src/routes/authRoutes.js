import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import serverUser from '../models/server.user.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await serverUser.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });

        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
});

// Register Route
router.post('/register', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    try {

        if (!firstname || !lastname || !username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await serverUser.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email or username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new serverUser({
            firstname, lastname, username, email, password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
});

export default router;
