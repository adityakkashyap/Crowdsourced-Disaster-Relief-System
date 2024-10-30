// DisasterSlider.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DisasterSlider = () => {
  const [disasters, setDisasters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch disaster data from the API
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

  const nextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === disasters.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? disasters.length - 3 : prevIndex - 1
    );
  };

  return (
    <Container>
      <Title>Ongoing Disasters</Title>
      <SliderWrapper>
        <ArrowButton onClick={prevCard}>&lt;</ArrowButton>
        <SliderContainer>
          {disasters.slice(currentIndex, currentIndex + 3).map((disaster) => (
            <Card key={disaster.id}>
              <CardContent>
                <Title>Location: {disaster.location}</Title>
                <p>Severity: {disaster.severity}</p>
                <Info>
                  <p>ID: {disaster.id}</p>
                  <p>Date: {disaster.date}</p>
                  <p>Description: {disaster.description}</p>
                </Info>
              </CardContent>
            </Card>
          ))}
        </SliderContainer>
        <ArrowButton onClick={nextCard}>&gt;</ArrowButton>
      </SliderWrapper>
    </Container>
  );
};

export default DisasterSlider;

// Styled Components
const Container = styled.div`
  text-align: center;
  margin-top: 120px;
  margin-bottom: 100px;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const SliderContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 900px;
  overflow: hidden;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  flex: 0 0 300px;
  transition: transform 0.3s ease;
  padding: 20px;
  text-align: center;
  &:hover {
    transform: translateY(-10px);
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Info = styled.div`
  p {
    margin: 5px 0;
  }
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  padding: 10px;

  &:hover {
    color: #000;
  }

  &:first-of-type {
    left: -40px;
  }

  &:last-of-type {
    right: -40px;
  }
`;
