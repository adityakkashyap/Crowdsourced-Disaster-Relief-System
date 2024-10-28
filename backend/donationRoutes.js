// backend/donationRoutes.js
const express = require('express');
const router = express.Router();


const donationRoutes = (db) => {
    // Route to get donation data
    router.get('/donations', (req, res) => {
        const sqlQuery = 'SELECT * FROM Donation';
        db.query(sqlQuery, (err, results) => {
            if (err) throw err;
            res.json(results);  // Send data as JSON to frontend
        });
    });

    return router; // Return the router with routes defined
};

module.exports = donationRoutes;
