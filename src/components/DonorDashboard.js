import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import CardSlider from './Cardslider';
import DisasterSlider from './DisasterSlider';

const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};
  color: white;
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: Red;
  }
`;

const DonorDashboard = () => {
  return (
    <>
      <Container>
        <h1>Donor Dashboard</h1>
      </Container>
      
      <HeroSection />
      <CardSlider />
      <DisasterSlider />
      
      <Container>
        <ReportButton to="/disasterReportForm">Report New Disaster</ReportButton>
      </Container>
    </>
  );
};

export default DonorDashboard;
