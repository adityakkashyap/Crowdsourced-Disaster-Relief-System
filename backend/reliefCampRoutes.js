const express = require('express');

const reliefCampRoutes = (db) => {
    const router = express.Router();

    // Route to fetch relief camp information along with resources
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

    return router;
};

module.exports = reliefCampRoutes;
