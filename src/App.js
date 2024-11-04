import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import ErrorPage from "./ErrorPage";
import DonorDashboard from "./components/DonorDashboard";
import VolunteerDashboard from "./components/VolunteerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { GlobalStyle } from "./GlobalStyle"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from './Login';
import Signup from "./Signup";
import { ThemeProvider } from 'styled-components'; 
import DonationForm from './DonationForm';
import ReliefCamp from "./ReliefCamp";
import Profile from "./Profile";
import SOSAlertList from "./SOSAlterList";
import DisasterReportForm from "./disasterReportForm";
import TotalDonations from "./components/totalDonations";

const theme = {
  colors: {
    heading: "rgb(24 24 29)",
    text: "rgba(29 ,29, 29, .8)",
    white: "#fff",
    black: "#212529",
    helper: "#8490ff",
    bg: "#F6F8FA",
    footer_bg: "#0a1435",
    btn: "rgb(98 84 243)",
    border: "rgba(98, 84, 243, 0.5)",
    hr: "#ffffff",
    gradient: "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
    shadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
    shadowSupport: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  media: {
    mobile: "768px",
    tab: "998px",
  },
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setRole(parsedUser.role);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setRole(user.role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ReliefCamp" element={isLoggedIn ? <ReliefCamp /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          {/* Public Routes */}
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
          <Route path="/SOSAlertList" element={isLoggedIn ? <SOSAlertList /> : <Navigate to="/login" />} />
          <Route path="/DisasterReportForm" element={isLoggedIn ? <DisasterReportForm /> : <Navigate to="/login" />} />
          <Route path="/TotalDonations" element={isLoggedIn ? <TotalDonations /> : <Navigate to="/login" />} />
          {/* Donor and Volunteer Routes */}
          {role === 'Donor' && (
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
          )}
          {role === 'Volunteer' && (
            <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          )}
          {(role === 'Donor' || role === 'Volunteer') && (
            <>
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/singleproduct/:id" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/donate" element={<DonationForm />} />
            </>
          )}

          {/* Admin Routes */}
          {role === 'Admin' && (
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          )}

          {/* Catch-All Route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
