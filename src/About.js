// About.js

const About = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Crowdsourced Disaster Management System</h2>
      <p style={styles.paragraph}>
        The Crowdsourced Disaster Management System is a platform designed to support and streamline relief efforts during natural disasters. This system facilitates real-time reporting, resource management, and relief operations by involving the community, donors, volunteers, and local authorities. Key features include the management of disaster reports, donations, relief camps, resources, SOS alerts, and volunteer tasks. By leveraging a collaborative approach, this system enhances response speed and effectiveness, ensuring that help reaches affected areas promptly.
      </p>
      
      <h3 style={styles.subHeader}>Key Features</h3>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>Disaster Reporting:</strong> Users can submit disaster reports containing vital information such as location, severity, and a description of the situation. These reports are time-stamped and can help coordinate rapid responses.
        </li>
        
        <li style={styles.listItem}>
          <strong>Donation Management:</strong> Donors can contribute resources and funds for disaster relief. Each donation entry records the donor, the associated disaster, the amount, and details about the resources donated, providing transparency and accountability.
        </li>
        
        <li style={styles.listItem}>
          <strong>Relief Camp Operations:</strong> Relief camps serve as safe havens for affected individuals. The system manages each camp's location, capacity, and current occupancy, helping authorities prevent overcrowding and allocate resources effectively.
        </li>
        
        <li style={styles.listItem}>
          <strong>Resource Tracking:</strong> Relief resources, such as food, water, and medical supplies, are tracked in real-time. Each item is associated with a specific relief camp, allowing efficient allocation and replenishment to meet demand.
        </li>
        
        <li style={styles.listItem}>
          <strong>SOS Alerts:</strong> Individuals can send SOS alerts indicating their location and the nature of the emergency. These alerts are essential for rescue teams, helping them prioritize and locate those in urgent need.
        </li>
        
        <li style={styles.listItem}>
          <strong>User Roles and Access:</strong> The platform supports multiple user roles, including donors, volunteers, and relief coordinators. Each user has access to functionalities relevant to their role, making it easier to manage contributions, assignments, and relief activities.
        </li>
        
        <li style={styles.listItem}>
          <strong>Volunteer Task Management:</strong> Volunteers play a crucial role in managing tasks within relief camps. Tasks, which are assigned to volunteers based on availability, include details like descriptions, statuses, and timelines, ensuring smooth operations at each relief location.
        </li>
      </ul>
      <p style={styles.paragraph}>
        This platform enables a unified, crowdsourced response to disasters, enhancing efficiency and allowing communities to support each other in times of need.
      </p>
    </div>
  );
};

// Styles for the About component
const styles = {
  container: {
    padding: '50px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: '#333',
    marginBottom: '15px',
  },
  subHeader: {
    color: '#555',
    marginTop: '20px',
    marginBottom: '10px',
  },
  paragraph: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginBottom: '15px',
  },
  listItem: {
    color: '#666',
    marginBottom: '10px',
    fontsize: '50px',
  },
};

// Export the About component as the default export
export default About;
