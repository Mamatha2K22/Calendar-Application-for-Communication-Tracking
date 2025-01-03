//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyManagement from './components/CompanyManagement';
import CommunicationMethodManagement from './components/CommunicationMethodManagement';
import CommunicationPerformedModal from './components/CommunicationPerformedModal';
import UserDashboard from './components/UserDashboard'; // Adjust the path based on your folder structure
import '../src/App.css'; 
import Dashboard from './components/Dashboard';


function App() {
    return (
        <Router>
            <div className="App">
                <h1>Admin Module</h1>
                <h3> hello </h3>
              
                <Routes>
                    {/* Route for Company Management */}
                    <Route path="/components/CompanyManagement" element={<CompanyManagement />} />
                    <Route path="/components/CommunicationMethodManagement" element={<CommunicationMethodManagement />} />
                    <Route path="/components/UserDashboard" element={<UserDashboard />} />
                    <Route path="/components/CommunicationPerformedModal" element={<CommunicationPerformedModal/>}/>
                    {/* Add more routes for other components if needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

