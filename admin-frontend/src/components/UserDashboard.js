import React, { useState, useEffect } from 'react';
import { getCompanies } from '../services/api';  // Assuming getCompanies API function is centralized in api.js
import CommunicationPerformedModal from '../components/CommunicationPerformedModal';
import '../App.css';

const UserDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanies, setSelectedCompanies] = useState([]); // For multi-select

  useEffect(() => {
    // Fetch companies using the centralized API function
    getCompanies()
      .then(response => {
        setCompanies(response.data);  // Update state with the data returned from API
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const handleCompanySelect = (companyId) => {
    setSelectedCompanies(prevState => 
      prevState.includes(companyId)
        ? prevState.filter(id => id !== companyId)
        : [...prevState, companyId]
    );
  };

  const openModal = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getHighlightClass = (highlight) => {
    switch (highlight) {
      case 'Red':
        return 'highlight-red';
      case 'Yellow':
        return 'highlight-yellow';
      case 'Green':
        return 'highlight-green';
      default:
        return '';
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Company Name</th>
            <th>Last Five Communications</th>
            <th>Next Scheduled Communication</th>
            <th>Highlights</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr key={company.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedCompanies.includes(company.id)} 
                  onChange={() => handleCompanySelect(company.id)} 
                />
              </td>
              <td>{company.name}</td>
              <td>
                {/* Render the last five communications */}
                {company.last_five_communications && company.last_five_communications.map((comm, index) => (
                  <div key={index} className="communication-item" title={comm.notes || 'No additional notes'}>
                    <p>{comm.communication_type} - {new Date(comm.date).toLocaleString()}</p>
                  </div>
                ))}
              </td>
              <td>
                {/* Show next scheduled communication */}
                {company.scheduled_communications?.length > 0 && (
                  <div>
                    <p>
                      {company.scheduled_communications[0].communication_method.name} - 
                      {new Date(company.scheduled_communications[0].scheduled_date).toLocaleString()}
                    </p>
                  </div>
                )}
              </td>
              <td className={getHighlightClass(company.scheduled_communications?.[0]?.highlight)}>
                {company.scheduled_communications?.[0]?.highlight || "No Highlight"}
              </td>
              <td>
                <button onClick={() => openModal(company)}>Log Communication</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <CommunicationPerformedModal
          companies={companies} // Pass the companies data
          selectedCompanies={selectedCompanies}
          setSelectedCompanies={setSelectedCompanies} // Pass the state handler
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default UserDashboard;
