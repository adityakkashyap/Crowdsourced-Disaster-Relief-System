// backend/donationRoutes.js
const express = require('express');
const router = express.Router();

const donationRoutes = (db) => {
    // Route to get donation data
    router.get('/getdonations', async (req, res) => {
        const sqlQuery = 'SELECT * FROM DisasterReport';
        try {
            const [results] = await db.query(sqlQuery); // Use await to get results
            res.json(results);  // Send data as JSON to frontend
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(500).json({ error: 'Database query failed' }); // Send a 500 error response
        }
    });

    // Route to get disaster data
    router.get('/disasters', async (req, res) => {
        const sqlQuery = 'SELECT * FROM DisasterReport'; // Adjust this query based on your table structure
        try {
            const [results] = await db.query(sqlQuery); // Use await to get results
            res.json(results);  // Send data as JSON to frontend
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(500).json({ error: 'Database query failed' }); // Send a 500 error response
        }
    });

    return router; // Return the router with routes defined
};

module.exports = donationRoutes;
