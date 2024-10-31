// Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            setErrorMessage(errorData.error || 'Login failed');
            return;
        }

        const data = await response.json();
        if (data.token) {
            console.log('Login successful:', data);
            onLogin(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));

            if (data.user.role === 'Donor') {
                navigate('/donor-dashboard');
            } else if (data.user.role === 'Volunteer') {
                navigate('/volunteer-dashboard');
            } else if (data.user.role === 'Admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/');
            }
        } else {
            setErrorMessage('Login failed: No user data returned');
        }
    } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('An error occurred. Please try again.');
    }
  };


  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </Form>
      <SignupLink>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </SignupLink>
    </Container>
  );
};

// PropTypes for the component
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

// Styled Components (same as before)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f6f8fa;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  text-transform: none;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: rgb(98, 84, 243);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SignupLink = styled.p`
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default Login;
