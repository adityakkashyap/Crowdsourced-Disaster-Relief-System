import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({});
  const [donations, setDonations] = useState([]); // State for donations
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Set loading to true
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          alert("You are not logged in. Please log in to access your profile.");
          navigate("/login");
          return;
        }
        const { id } = JSON.parse(storedUser);

        // Fetch profile data
        const profileResponse = await axios.get(`http://localhost:3000/api/profile/${id}`);
        setProfile(profileResponse.data);
        setFormData(profileResponse.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile. Please check your connection and try again.");
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      console.log("Updating profile with data:", updateData);
      await axios.put(`http://localhost:3000/api/profile/${profile.id}`, updateData);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again later.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:3000/api/profile/${profile.id}`);
        alert("Profile deleted successfully");
        localStorage.removeItem('user');
        navigate("/signup");
      } catch (error) {
        console.error("Error deleting profile:", error);
        alert("Failed to delete profile. Please try again later.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading message
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <form className="profile-form">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" value={formData.name || ''} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" value={formData.email || ''} onChange={handleChange} />

        <label htmlFor="phone_number">Phone Number</label>
        <input id="phone_number" type="text" name="phone_number" value={formData.phone_number || ''} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" placeholder="Leave blank to keep current password" onChange={handleChange} />

        <div className="button-group">
          <button type="button" onClick={handleUpdate}>Update Profile</button>
          <button type="button" onClick={handleDelete}>Delete Profile</button>
        </div>
      </form>

      <style jsx>{`
        .profile-container {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          background-color: #f9f9f9;
          margin-top: 100px;
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        .profile-form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 5px;
          font-weight: bold;
        }
        input {
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .button-group {
          display: flex;
          justify-content: space-between;
        }
        button {
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          flex: 1;
          margin: 0 5px; /* Added margin for spacing */
        }
        button:hover {
          background-color: #0056b3;
        }
        .donations-section {
          margin-top: 30px; /* Spacing above the donations section */
        }
        .donations-section h3 {
          margin-bottom: 10px;
        }
        .donations-section ul {
          list-style: none;
          padding: 0;
        }
        .donations-section li {
          margin: 5px 0;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Profile;
