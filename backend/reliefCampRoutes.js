const express = require('express');

const reliefCampRoutes = (db) => {
    const router = express.Router();

    // Route to fetch all relief camps with their resources
    router.get('/relief-camps', async (req, res) => {
        try {
            const query = `
                SELECT 
                    ReliefCamp.id AS camp_id,
                    ReliefCamp.location,
                    ReliefCamp.capacity,
                    ReliefCamp.current_occupancy,
                    Resource.name AS resource_name,
                    Resource.quantity
                FROM ReliefCamp
                LEFT JOIN Resource ON ReliefCamp.id = Resource.camp_id
                ORDER BY ReliefCamp.id;
            `;
            const [results] = await db.query(query);
            
            // Format the results into a nested structure
            const campData = results.reduce((acc, row) => {
                const camp = acc.find(c => c.camp_id === row.camp_id);
                if (camp) {
                    camp.resources.push({
                        name: row.resource_name,
                        quantity: row.quantity
                    });
                } else {
                    acc.push({
                        camp_id: row.camp_id,
                        location: row.location,
                        capacity: row.capacity,
                        current_occupancy: row.current_occupancy,
                        resources: row.resource_name ? [{
                            name: row.resource_name,
                            quantity: row.quantity
                        }] : []
                    });
                }
                return acc;
            }, []);
            
            res.json(campData);
        } catch (err) {
            console.error('Error fetching relief camps:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    // New route to fetch relief camps with low resources for the latest high-severity disaster
    router.get('/relief-camps/low-resources', async (req, res) => {
        try {
            const query = `
                SELECT 
                    rc.id AS camp_id,
                    rc.location,
                    rc.capacity,
                    rc.current_occupancy,
                    r.name AS resource_name,
                    r.quantity
                FROM ReliefCamp rc
                JOIN Resource r ON rc.id = r.camp_id
                WHERE rc.disaster_id IN (
                    SELECT id FROM DisasterReport WHERE severity = 'High' ORDER BY timestamp
                )
                AND r.quantity < 300
                ORDER BY rc.id;
            `;
            const [results] = await db.query(query);

            // Format the results into a nested structure
            const lowResourceCamps = results.reduce((acc, row) => {
                const camp = acc.find(c => c.camp_id === row.camp_id);
                if (camp) {
                    camp.resources.push({
                        name: row.resource_name,
                        quantity: row.quantity
                    });
                } else {
                    acc.push({
                        camp_id: row.camp_id,
                        location: row.location,
                        capacity: row.capacity,
                        current_occupancy: row.current_occupancy,
                        resources: row.resource_name ? [{
                            name: row.resource_name,
                            quantity: row.quantity
                        }] : []
                    });
                }
                return acc;
            }, []);

            res.json(lowResourceCamps);
        } catch (err) {
            console.error('Error fetching low-resource relief camps:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    return router;
};

module.exports = reliefCampRoutes;
