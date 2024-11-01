import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    margin: 0 auto;
    margin-top: 100px;
`;

const FormTitle = styled.h2`
    color: #333;
    margin-bottom: 10px;
`;

const FormSubtitle = styled.h3`
    color: #666;
    margin-bottom: 20px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
    resize: vertical;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;

const DisasterReportForm = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        location: '',
        severity: '',
        description: ''
    });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.id) {
            setFormData((prevData) => ({ ...prevData, user_id: userData.id }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/disaster-report', formData);
            alert(response.data.message);
        } catch (error) {
            console.error('Error submitting disaster report:', error);
            alert('Error submitting disaster report');
        }
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <FormTitle>Disaster Report Form</FormTitle>
                <FormSubtitle>Submit a new report:</FormSubtitle>
                <InputField
                    name="user_id"
                    placeholder="User ID"
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                    readOnly
                />
                <InputField
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <InputField
                    name="severity"
                    placeholder="Severity (e.g., Low, Medium, High)"
                    value={formData.severity}
                    onChange={handleChange}
                    required
                />
                <TextArea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <SubmitButton type="submit">Submit Report</SubmitButton>
            </form>
        </FormContainer>
    );
};

export default DisasterReportForm;
