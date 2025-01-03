import React, { useState, useEffect} from 'react';
import { postCommunication, getCompanies } from '../services/api'; // Import the postCommunication function
import axios from 'axios'; // Ensure you have axios imported
import PropTypes from 'prop-types'; // For prop validation

const CommunicationPerformedModal = ({ closeModal }) => {
  const [communicationType, setCommunicationType] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [companies, setCompanies] = useState([]); // List of companies
  const [selectedCompany, setSelectedCompany] = useState(null); // Single selected company

  // Fetch companies from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompanies();
        setCompanies(response.data); // Set the list of companies
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError('Failed to load companies. Please try again later.');
      }
    };
    fetchCompanies();
  }, []);

  // Reset highlights for selected companies
  const resetHighlights = () => {
    if (selectedCompany) {
      axios
        .put(`/api/companies/${selectedCompany}/reset_highlight/`) // Assuming this API exists
        .then(() => console.log('Highlights reset successfully'))
        .catch((err) => console.error('Error resetting highlight:', err));
    }
  };

  const handleSubmit = async () => {
    if (!communicationType || !date) {
      setError('Please select a communication type and date.');
      return;
    }

    if (!selectedCompany) {
      setError('Please select a company.');
      return;
    }

    const communicationData = {
      company: selectedCompany, // Send a single company ID
      communication_type: communicationType,
      date,
      notes,
    };

    console.log('Payload being sent:', communicationData);

    try {
      const response = await postCommunication(communicationData);
      console.log('API Response:', response.data);
      setError('');
      resetHighlights();
      closeModal();
    } catch (error) {
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        setError(error.response.data.error || 'Failed to log communication.');
      } else {
        console.error('Network Error:', error.message);
        //setError('Failed to log communication. Please try again.');
      }
    }
    console.log('communication logged successfully');
  };

  return (
    <div className="modal">
      <h2>Log Communication</h2>

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Select Company */}
      <select
        value={selectedCompany || ''}
        onChange={(e) => setSelectedCompany(e.target.value)}
        required
      >
        <option value="">Select a Company</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>

      {/* Communication Type */}
      <select
        value={communicationType}
        onChange={(e) => setCommunicationType(e.target.value)}
        required
      >
        <option value="">Select Communication Type</option>
        <option value="LinkedIn Post">LinkedIn Post</option>
        <option value="LinkedIn Message">LinkedIn Message</option>
        <option value="Email">Email</option>
        <option value="Phone Call">Phone Call</option>
        <option value="Other">Other</option>
      </select>

      {/* Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      {/* Notes */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add any additional comments"
      />

      <div className="button-group">
        <button onClick={handleSubmit}>Log Communication</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

// Prop validation
CommunicationPerformedModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CommunicationPerformedModal;

