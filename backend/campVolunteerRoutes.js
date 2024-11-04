// campVolunteerRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Aggregate query to get the count of distinct volunteers per camp
    router.get('/camp-volunteer-count', async (req, res) => {
        try {
            const [rows] = await db.query(`
                SELECT camp_id, COUNT(DISTINCT assigned_volunteer) AS volunteer_count
                FROM VolunteerTask
                GROUP BY camp_id
            `);
            res.json(rows);
        } catch (error) {
            console.error('Error fetching volunteer count per camp:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
};
