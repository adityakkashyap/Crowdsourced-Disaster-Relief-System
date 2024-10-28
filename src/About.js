// src/components/About.js
import React, { useState, useEffect } from 'react';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3000/api/donations')
      .then((response) => response.json())
      .then((data) => setDonations(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Donations</h1>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id}>
            Donor ID: {donation.donor_id}, Amount: ${donation.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationsList;
