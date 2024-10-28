// backend/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation
const router = express.Router();

module.exports = (db) => {
    // Signup route
    router.post('/signup', (req, res) => {
        const { name, email, role, phoneNumber, password } = req.body;
    
        // Basic validation (you might want to add more)
        if (!name || !email || !role || !phoneNumber || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
    
        const sqlInsert = 'INSERT INTO User (name, email, role, phone_number, password) VALUES (?, ?, ?, ?, ?)';
        
        db.query(sqlInsert, [name, email, role, phoneNumber, password], (err, result) => {
            if (err) {
                console.error('Signup error:', err); // Log the error
                return res.status(500).json({ error: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });

     

    // Login route
    router.post('/login', (req, res) => {
        const { email, password } = req.body;
    
        const sqlSelect = 'SELECT * FROM User WHERE email = ?';
        db.query(sqlSelect, [email], (err, results) => {
            if (err) {
                console.error('Login query error:', err); // Log the error
                return res.status(500).json({ error: 'Error fetching user' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            const user = results[0];
            // Compare password directly (NOT RECOMMENDED for production)
            if (password !== user.password) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
    
            const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', {
                expiresIn: '1h'
            });
            res.status(200).json({ message: 'Login successful', token });
        });
    });
    

    return router;
};
