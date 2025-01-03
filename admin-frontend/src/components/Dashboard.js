import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/components/UserDashboard");
  };

  const handleAdminClick = () => {
    navigate("/components/CompanyManagement");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="text-section">
          <h1>Welcome to the Dashboard</h1>
          <div className="button-container">
            <button className="dashboard-button" onClick={handleUserClick}>
              User
            </button>
            <button className="dashboard-button" onClick={handleAdminClick}>
              Admin
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
