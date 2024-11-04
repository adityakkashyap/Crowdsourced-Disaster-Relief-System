// backend/donationRoutes.js
const express = require('express');
const router = express.Router();

const donationRoutes = (db) => {
    // Route to get donation data
    router.get('/getdonations', async (req, res) => {
        const sqlQuery = 'SELECT * FROM DisasterReport'; // Changed from DisasterReport to Donation
        try {
            const [results] = await db.query(sqlQuery);
            res.json(results);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    });

    // Route to get disaster data
    router.get('/disasters', async (req, res) => {
        const sqlQuery = 'SELECT * FROM DisasterReport';
        try {
            const [results] = await db.query(sqlQuery);
            res.json(results);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    });

    // New route to get total amount donated for a specific disaster
    router.get('/totaldonated/:disasterId', async (req, res) => {
        const disasterId = req.params.disasterId;
        const sqlQuery = 'SELECT GetTotalAmountDonated(?) AS total_amount';
        try {
            const [results] = await db.query(sqlQuery, [disasterId]);
            res.json(results[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query failed' });
        }
    });

    return router;
};

module.exports = donationRoutes;
