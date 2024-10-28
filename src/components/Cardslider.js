import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CardSlider = () => {
  const [donations, setDonations] = useState([]); // Change to donations
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch donations data from the API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/donations'); // Adjusted URL to donations
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []); // Empty dependency array means this runs once when the component mounts

  const nextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === donations.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? donations.length - 3 : prevIndex - 1
    );
  };

  return (
    <Container>
      <Title>Recent Donations</Title>
      <SliderWrapper>
        <ArrowButton onClick={prevCard}>&lt;</ArrowButton>
        <SliderContainer>
          {donations.slice(currentIndex, currentIndex + 3).map((donation) => (
            <Card key={donation.id}>
              {/* <Image src={donation.imageUrl} alt={donation.donor_id} /> You may need to adjust this if your donation data doesn't include an image */}
              <CardContent>
                <Title>Donor ID: {donation.donor_id}</Title>
                <p>Amount: ${donation.amount}</p>
                <Info>
                  <p>Donation ID: {donation.id}</p>
                  <p>Date: {donation.date}</p> {/* Adjust based on your donation data structure */}
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

export default CardSlider;

// Styled Components remain unchanged
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

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 20px;
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
    left: -40px; /* Adjust the left arrow position */
  }

  &:last-of-type {
    right: -40px; /* Adjust the right arrow position */
  }
`;
