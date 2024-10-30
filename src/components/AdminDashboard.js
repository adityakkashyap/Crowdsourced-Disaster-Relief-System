// AdminDashboard.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.bg};
    color: white;
`;

const AdminDashboard = () => {
    return (
        <Container>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Admin Dashboard!</p>
            {/* Add more content related to admin features here */}
        </Container>
    );
};

export default AdminDashboard;
