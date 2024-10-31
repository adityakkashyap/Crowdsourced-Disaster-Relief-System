import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReliefCamps = () => {
  const [reliefCamps, setReliefCamps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReliefCamps = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/relief-camps');
        setReliefCamps(response.data);
      } catch (err) {
        console.error('Error fetching relief camps:', err.message);
        setError('Failed to load relief camps. Please try again later.');
      }
    };

    fetchReliefCamps();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Relief Camps</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      {reliefCamps.map((camp) => (
        <div key={camp.camp_id} style={styles.campCard}>
          <h1 style={styles.campTitle}>{camp.location}</h1>
          <p>Capacity: {camp.capacity}</p>
          <p>Current Occupancy: {camp.current_occupancy}</p>
          <h4 style={styles.resourcesHeading}>Resources Available:</h4>
          {camp.resources.length > 0 ? (
            <ul style={styles.resourceList}>
              {camp.resources.map((resource, index) => (
                <li key={index} style={styles.resourceItem}>
                  {resource.name}: {resource.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.noResources}>No resources available at this camp.</p>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  campCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  campTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  resourcesHeading: {
    marginTop: '15px',
    fontWeight: '600',
  },
  resourceList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  resourceItem: {
    padding: '5px 0',
  },
  noResources: {
    fontStyle: 'italic',
    color: '#555',
  },
};

export default ReliefCamps;
