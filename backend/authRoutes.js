const express = require('express');
const jwt = require('jsonwebtoken'); // For token generation
const router = express.Router();

module.exports = (db) => {
    // Signup route
    router.post('/signup', async (req, res) => {
        const { name, email, role, phoneNumber, password } = req.body;

        if (!name || !email || !role || !phoneNumber || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const sqlInsert = 'INSERT INTO User (name, email, role, phone_number, password) VALUES (?, ?, ?, ?, ?)';

        try {
            const [result] = await db.execute(sqlInsert, [name, email, role, phoneNumber, password]);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error('Signup error:', err);
            res.status(500).json({ error: 'Error registering user' });
        }
    });

    // Login route
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        const sqlSelect = 'SELECT * FROM User WHERE email = ?';

        try {
            const [results] = await db.execute(sqlSelect, [email]);

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const user = results[0];
            if (password !== user.password) {
                return res.status(401).json({ error: 'Incorrect password' });
            }

            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'your_jwt_secret', {
                expiresIn: '1h'
            });

            res.status(200).json({
                message: 'Login successful',
                token,
                user: { id: user.id, email: user.email, role: user.role }
            });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ error: 'Error logging in' });
        }
    });

    return router;
};
