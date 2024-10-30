// DonorDashboard.js
import React from 'react';
import styled from 'styled-components';
import HeroSection from './HeroSection';
import CardSlider from './Cardslider';
import DisasterSlider from './DisasterSlider';

const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};
  color: white;
  text-align: center;
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
    </>
  );
};

export default DonorDashboard;
