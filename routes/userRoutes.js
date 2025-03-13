const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure correct path
require('dotenv').config(); // Load environment variables

const router = express.Router();

// @route   POST /api/users/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    try {
        console.log('Login request received:', req.body); // ✅ Debugging log

        const { email, password } = req.body;

        // 1️⃣ Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found'); // ✅ Debug log
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 2️⃣ Check password
        if (!user.password) {
            console.log('User password is missing in DB'); // Debugging case
            return res.status(500).json({ message: 'Server error' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match'); // ✅ Debug log
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3️⃣ Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });

    } catch (error) {
        console.error('Error in login route:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
