const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/getDonationDetails', async (req, res) => { // Note the leading slash
    console.log('Fetching donation details...'); // Log when the request is received
    try {
      const query = `
        SELECT Donation.id AS donation_id, Donation.donor_id, Donation.amount, Donation.resource_donated,
               Donation.date, DisasterReport.location, DisasterReport.severity, DisasterReport.description
        FROM Donation
        JOIN DisasterReport ON Donation.disaster_id = DisasterReport.id
        ORDER BY Donation.date DESC
      `;
      console.log('Executing query:', query); // Log the query
      const [rows] = await db.query(query); // Make sure db is a promise-compatible instance
      console.log('Query Result:', rows); // Log the result
      
      if (!rows.length) {
        console.log('No donation details found'); // Log if no results were returned
      }

      res.json(rows);
    } catch (error) {
      console.error('Error fetching donation details:', error); // Log the error
      res.status(500).json({ error: 'Internal Server Error', details: error.message }); // Include error details
    }
  });

  return router;
};
