const express = require('express');

// Wrap routes in a function to accept `db` as a parameter
const donationGateway = (db) => {
    const router = express.Router();

    // Route to fetch all disasters
    router.get('/disasters', (req, res) => {
        const query = 'SELECT * FROM DisasterReport';
        console.log("Executing query:", query); // Log the query
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching disasters:', err);
                return res.status(500).send('Internal Server Error');
            }
            console.log("Query results:", results); // Log results
            res.json(results);
        });
    });

    // Route to submit a donation
    router.post('/donations', (req, res) => {
        const { donor_id, disaster_id, amount, resource_donated } = req.body;
        const query = 'INSERT INTO Donation (donor_id, disaster_id, amount, resource_donated) VALUES (?, ?, ?, ?)';
        
        db.query(query, [donor_id, disaster_id, amount, resource_donated], (err, results) => {
            if (err) {
                console.error('Error submitting donation:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.status(201).json({ message: 'Donation recorded successfully!', donationId: results.insertId });
        });
    });

    return router;
};

module.exports = donationGateway;
