import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SOSAlertList = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/sos-alerts');
                setAlerts(response.data);
            } catch (error) {
                console.error('Error fetching SOS alerts:', error);
            }
        };

        fetchAlerts();
    }, []);

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
        },
        header: {
            marginTop: '50px',
            textAlign: 'center',
            color: '#333',
            marginBottom: '50px',
        },
        alertCard: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '10px',
            backgroundColor: '#f9f9f9',
        },
        alertDetail: {
            margin: '4px 0',
            color: '#555',
        },
        divider: {
            marginTop: '10px',
            border: 'none',
            borderTop: '1px solid #eee',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>SOS Alerts</h2>
            {alerts.map((alert) => (
                <div key={alert.id} style={styles.alertCard}>
                    <p style={styles.alertDetail}><strong>User ID:</strong> {alert.user_id}</p>
                    <p style={styles.alertDetail}><strong>Location:</strong> {alert.location}</p>
                    <p style={styles.alertDetail}><strong>Message:</strong> {alert.message}</p>
                    <p style={styles.alertDetail}><strong>Timestamp:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                    <hr style={styles.divider} />
                </div>
            ))}
        </div>
    );
};

export default SOSAlertList;
