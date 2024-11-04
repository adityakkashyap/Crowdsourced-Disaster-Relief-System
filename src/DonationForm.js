import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationForm = () => {
  const [disasters, setDisasters] = useState([]);
  const [donorId, setDonorId] = useState('');
  const [disasterId, setDisasterId] = useState('');
  const [amount, setAmount] = useState('');
  const [resourceDonated, setResourceDonated] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New success message state

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/disasters');
        setDisasters(response.data);
      } catch (err) {
        console.error('Error fetching disasters:', err.response ? err.response.data : err.message);
        setError('Failed to fetch disasters. Please try again later.');
      }
    };
    fetchDisasters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors
    setSuccessMessage(''); // Reset previous success message

    // Validate required fields
    if (!donorId || !disasterId || !amount) {
      setError('Please fill in all required fields.');
      return;
    }

    // Prepare the data to send
    const donationData = {
      donor_id: donorId,
      disaster_id: disasterId,
      amount: parseFloat(amount),
      resource_donated: resourceDonated,
    };

    try {
      await axios.post('http://localhost:3000/api/submitdonations', donationData);
      setSuccessMessage('Donation submitted successfully!'); // Show success message
      // Reset the form fields
      setDonorId('');
      setDisasterId('');
      setAmount('');
      setResourceDonated('');
    } catch (err) {
      console.error('Error submitting donation:', err);
      setError('Failed to submit donation. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Make a Donation</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your Donor ID" 
          value={donorId} 
          onChange={(e) => setDonorId(e.target.value)} 
          required 
          style={styles.input}
        />
        <select 
          value={disasterId} 
          onChange={(e) => setDisasterId(e.target.value)} 
          required
          style={styles.select}
        >
          <option value="">Select Disaster</option>
          {disasters.map(disaster => (
            <option key={disaster.id} value={disaster.id}>{disaster.location}, {disaster.description}</option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Donation Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
          style={styles.input}
        />
        <input 
          type="text" 
          placeholder="Resource Donated" 
          value={resourceDonated} 
          onChange={(e) => setResourceDonated(e.target.value)} 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Donate</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    height: 'auto',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
    marginBottom: '20px',
  },
  errorMessage: {
    color: '#d9534f',
    fontSize: '0.9rem',
    marginBottom: '15px',
    textAlign: 'center',
  },
  successMessage: { // Style for success message
    color: '#5cb85c',
    fontSize: '0.9rem',
    marginBottom: '15px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    appearance: 'none',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#5cb85c',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#4cae4c',
  }
};

export default DonationForm;
