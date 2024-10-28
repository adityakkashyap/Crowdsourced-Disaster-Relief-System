// src/Signup.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState(''); // Add password state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log({ name, email, role, phoneNumber, password }); // Check data before sending

        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, role, phoneNumber, password }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Signup successful');
            // Redirect to the default page after successful signup
            window.location.href = 'http://localhost:3001/';
        } else {
            console.error('Signup failed:', data.error); // More specific error logging
        }
    } catch (error) {
        console.error('Error during signup:', error);
    }
    // Reset form fields
    setName('');
    setEmail('');
    setRole('');
    setPhoneNumber('');
    setPassword('');
  };

  return (
    <Container>
      <Title>Signup</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <Input // Add password input field
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Signup</Button>
      </Form>
    </Container>
  );
};

export default Signup;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f6f8fa;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  text-transform: none;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background: rgb(98, 84, 243);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgb(80, 66, 200);
  }
`;
