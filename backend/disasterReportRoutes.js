const express = require('express');

const disasterReportRoutes = (db) => {
    const router = express.Router();

    // Endpoint to create a new disaster report
    router.post('/disaster-report', async (req, res) => {
        const { user_id, location, severity, description } = req.body;

        try {
            console.log({ user_id, location, severity, description });

            // Insert new disaster report
            const [result] = await db.execute(
                'INSERT INTO DisasterReport (user_id, location, severity, description) VALUES (?, ?, ?, ?)',
                [user_id, location, severity, description]
            );


            // Success response
            res.status(201).json({ message: 'Disaster report created successfully!', reportId: result.insertId });
        } catch (error) {
            console.error('Error creating disaster report:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    });

    // Endpoint to get SOS alerts
    router.get('/sos-alerts', async (req, res) => {
        try {
            const [alerts] = await db.execute('SELECT * FROM SOSAlert ORDER BY timestamp DESC');
            res.status(200).json(alerts);
        } catch (error) {
            console.error('Error fetching SOS alerts:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    });

    return router;
};

module.exports = disasterReportRoutes;
