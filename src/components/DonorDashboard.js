import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import CardSlider from './Cardslider';
import DisasterSlider from './DisasterSlider';

const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  text-align: center;
  font-size: 2em;
`;

const ReportButton = styled(Link)`
  display: inline-block;
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d32f2f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 300px;
  margin: 20px auto;

  &::after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.textSoft};
    pointer-events: none;
    font-size: 0.8em;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 40px 12px 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  border: 2px solid ${({ theme }) => theme.soft};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  /* Remove default appearance */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:hover {
    border-color: #007BFF;
    background-color: ${({ theme }) => theme.bgDark};
  }

  &:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  option {
    padding: 12px;
    background-color: ${({ theme }) => theme.bgDark};
    color: white};
  }

  /* Fix for Firefox */
  @-moz-document url-prefix() {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;

const DonationDisplayWrapper = styled.div`
  margin: 24px auto;
  padding: 20px;
  max-width: 400px;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.soft};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DonationLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 8px;
`;

const DonationAmount = styled.div`
  font-size: 2rem;
  color: #007BFF;
  font-weight: 600;
`;

const DonorDashboard = () => {
  const [disasters, setDisasters] = useState([]);
  const [selectedDisaster, setSelectedDisaster] = useState('');
  const [totalDonation, setTotalDonation] = useState(null);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getdonations');
        const data = await response.json();
        setDisasters(data);
      } catch (error) {
        console.error('Error fetching disasters:', error);
      }
    };
    fetchDisasters();
  }, []);

  const handleDisasterChange = async (event) => {
    const disasterId = event.target.value;
    setSelectedDisaster(disasterId);
    if (disasterId) {
      try {
        const response = await fetch(`http://localhost:3000/api/totaldonated/${disasterId}`);
        const data = await response.json();
        setTotalDonation(data.total_amount);
      } catch (error) {
        console.error('Error fetching total donation:', error);
      }
    } else {
      setTotalDonation(null);
    }
  };

  return (
    <>
      <Container>
        <h1>Donor Dashboard</h1>
      </Container>
      
      <HeroSection />
      <CardSlider />
      <DisasterSlider />
      
      <Container>
        <ReportButton to="/disasterReportForm">
          Report New Disaster
        </ReportButton>
      </Container>

      <Container>
        <SelectWrapper>
          <StyledSelect 
            onChange={handleDisasterChange} 
            value={selectedDisaster}
          >
            <option value="">Select Disaster to View Total Donations</option>
            {disasters.map(disaster => (
              <option key={disaster.id} value={disaster.id}>
                {disaster.location} - {disaster.description}
              </option>
            ))}
          </StyledSelect>
        </SelectWrapper>

        {totalDonation !== null && (
          <DonationDisplayWrapper>
            <DonationLabel>
              Total Donations for Selected Disaster
            </DonationLabel>
            <DonationAmount>
              ${totalDonation.toLocaleString()}
            </DonationAmount>
          </DonationDisplayWrapper>
        )}
      </Container>
    </>
  );
};

export default DonorDashboard;