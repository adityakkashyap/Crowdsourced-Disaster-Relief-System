import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 20px;
    margin-top: 50px;
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
`;

const Subtitle = styled.h2`
    font-size: 1.5em;
    margin-top: 20px;
    margin-bottom: 10px;
    color: #444;
`;

const TaskList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const TaskItem = styled.li`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;

    h3 {
        margin: 0 0 5px 0;
        color: #333;
    }

    p {
        margin: 5px 0;
        color: #555;
    }

    button {
        padding: 10px 15px;
        background-color: #4CAF50; /* Green */
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 0.9em;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #45a049;
        }
    }
`;

const VolunteerTaskDashboard = () => {
    const storedUser = localStorage.getItem('user');
    const volunteerId = storedUser ? JSON.parse(storedUser).id : null;
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/volunteer/${volunteerId}/tasks`);
                setAssignedTasks(response.data);
            } catch (error) {
                console.error('Error fetching assigned tasks:', error);
            }
        };

        const fetchAllTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tasks`);
                setAllTasks(response.data);
            } catch (error) {
                console.error('Error fetching all tasks:', error);
            }
        };

        if (volunteerId) {
            fetchAssignedTasks();
            fetchAllTasks();
        } else {
            console.error('No volunteer ID found in local storage');
        }
    }, [volunteerId]);

    const handleReportCompletion = async (taskId) => {
        try {
            await axios.put(`http://localhost:3000/api/volunteer/task/${taskId}`, { status: 'completed' });
            setAssignedTasks((prevTasks) => prevTasks.map(task => 
                task.id === taskId ? { ...task, status: 'completed' } : task
            ));
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <Container>
            <Title>Volunteer Dashboard</Title>
            
            <Subtitle>Your Assigned Tasks</Subtitle>
            <TaskList>
                {assignedTasks.map(task => (
                    <TaskItem key={task.id}>
                        <h3>{task.description}</h3>
                        <p>Status: {task.status}</p>
                        <p>Start Time: {new Date(task.start_time).toLocaleString()}</p>
                        <p>End Time: {new Date(task.end_time).toLocaleString()}</p>
                        <button onClick={() => handleReportCompletion(task.id)}>
                            Report Completion
                        </button>
                    </TaskItem>
                ))}
            </TaskList>

            <Subtitle>All Available Tasks</Subtitle>
            <TaskList>
                {allTasks.map(task => (
                    <TaskItem key={task.id}>
                        <h3>{task.description}</h3>
                        <p>Status: {task.status}</p>
                        <p>Start Time: {new Date(task.start_time).toLocaleString()}</p>
                        <p>End Time: {new Date(task.end_time).toLocaleString()}</p>
                    </TaskItem>
                ))}
            </TaskList>
        </Container>
    );
};

export default VolunteerTaskDashboard;
