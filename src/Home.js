import React from 'react';
import styled from "styled-components";
import HeroSection  from './components/HeroSection';
import CardSlider  from './components/Cardslider';
import axios from 'axios'; // Assuming you fetch the data from your backend



const Home = () => {
  
  return(
    <>
    <HeroSection />;
    <CardSlider />
    </>
  ) 
  
}
export default Home