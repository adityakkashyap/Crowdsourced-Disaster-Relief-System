// frontend/TotalDonations.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};
  color: white;
  text-align: center;
`;

const TotalAmount = styled.div`
  font-size: 1.5em;
  margin-top: 20px;
`;

const TotalDonations = () => {
  const { disaster_id } = useParams();
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/donations/total/${disaster_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTotalAmount(data.total_amount);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTotalDonations();
  }, [disaster_id]);

  return (
    <Container>
      <h2>Total Donations for Disaster ID: {disaster_id}</h2>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <TotalAmount>
          Total Amount Donated: ${totalAmount !== null ? totalAmount.toFixed(2) : 'Loading...'}
        </TotalAmount>
      )}
    </Container>
  );
};

export default TotalDonations;
