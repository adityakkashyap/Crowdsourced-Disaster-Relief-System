// backend/index.js
const express = require('express');
const mysql = require('mysql2'); // Change from mysql to mysql2
const cors = require('cors'); // Add CORS support
const app = express();
const authRoutes = require('./authRoutes');
const donationRoutes = require('./donationRoutes'); // Import donation routes

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // for parsing application/json

// Set up database connection
const db = mysql.createConnection({
    host: 'localhost', // database host
    user: 'root', // database user
    password: '123456789', // database password
    database: 'Disaster' // database name
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
    
    // Only use the routes after db is connected
    app.use('/auth', authRoutes(db)); // Use auth routes under '/auth' path
    app.use('/api', donationRoutes(db)); // Pass db instance to donation routes
    
    // Start the server only after the db connection is established
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
