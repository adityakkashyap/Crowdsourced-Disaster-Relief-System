import { eventWrapper } from '@testing-library/user-event/dist/utils'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Nav from './Nav'
import { Button } from '../styles/Button'

const HeroSection = () => {
  return (
    <Wrapper>
        <div className='container'>
            <div className='grid grid-two-column'>
                <div className='hero-section-data'>
                    <p className = "intro-data"> Hope Fund </p>
                    <h1> You Bestow, We Deliver</h1>
                    
                    <p>
                    Hope Funds disaster donation website enables individuals to contribute directly to relief efforts for disaster-affected areas through monetary donations and essential supplies. The platform ensures transparency and allows users to track how their contributions are being used to help communities recover swiftly and effectively.
                    </p>
                    <br/>
                    <NavLink>
                        <Button>
                            Donate Now
                        </Button>
                    </NavLink>
                    </div>
                    {/*our homepage image */}
                    <div className='hero-section-image'>
                        <figure>
                            <img src = "images/hero.jpg" alt="hero-section-photo" className='img-style' />

                        </figure>
                    </div>
            </div>

        </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 4rem 0;

  img {
    min-width: 30rem;
    height: 30rem;
  }

  .hero-section-data {
    p {
      margin: 0;
      font-size: 1.5rem
    }

    h1 {
    
      text-transform: capitalize;
      font-weight: bold;
      font-size: 4.0rem

      
    }

    .intro-data {
    font-size: 6.5rem

     
    }
  }

  .hero-section-image {
    padding-top: 12%;
    width: 120%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(1 1 1 .1);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
    
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HeroSection