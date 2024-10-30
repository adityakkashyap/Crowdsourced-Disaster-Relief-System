// VolunteerDashboard.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.bg};
    color: white;
`;

const VolunteerDashboard = () => {
    return (
        <Container>
            <h1>Volunteer Dashboard</h1>
            <p>Welcome to the Volunteer Dashboard!</p>
            {/* Add more content related to volunteers here */}
        </Container>
    );
};

export default VolunteerDashboard;
