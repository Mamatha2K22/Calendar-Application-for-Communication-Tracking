// React Frontend Code
// Implementation for Company Management with Delete functionality

// React Frontend Code
// Updated Implementation for Company Management with Add Message and No Display of Added Elements


import React, { useEffect, useState } from 'react';
import { getCompanies, addCompany, updateCompany, deleteCompany } from '../services/api';
import { Link } from 'react-router-dom';
const CompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [addMessage, setAddMessage] = useState('');
    const [deleteInput, setDeleteInput] = useState('');
    const [EditInput, setEditInput] = useState('');
    const [companyToEdit, setCompanyToEdit] = useState(null);
    const [showDetails, setShowDetails] = useState(false); // Toggle to show/hide details

    const [newCompany, setNewCompany] = useState({
        name: '',
        location: '',
        linkedin_profile: '',
        emails: '',
        phone_numbers: '',
        comments: '',
        communication_periodicity: '2 weeks',
    });
    const [editingCompany, setEditingCompany] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = () => {
        getCompanies(searchQuery).then((response) => {
            setCompanies(response.data);
        });
    };

    const handleAddCompany = () => {
        //console.log("setAddMessage is:", typeof setAddMessage);
        if (editingCompany) {
            updateCompany(editingCompany.id, newCompany).then(() => {
                setEditingCompany(null);
                setNewCompany({
                    name: '',
                    location: '',
                    linkedin_profile: '',
                    emails: '',
                    phone_numbers: '',
                    comments: '',
                    communication_periodicity: '2 weeks',
                });
                fetchCompanies();
            });
        } else {
            addCompany(newCompany).then((response) => {
                setAddMessage('Data added successfully!');
                setCompanies([...companies, response.data]);
                setNewCompany({
                    name: '',
                    location: '',
                    linkedin_profile: '',
                    emails: '',
                    phone_numbers: '',
                    comments: '',
                    communication_periodicity: '2 weeks',
                });
                setTimeout(() => setAddMessage(''), 3000);
            });
        }
    };

    const handleEditCompany = (company) => {
        setEditingCompany(company);
        setNewCompany({
            name: company.name,
            location: company.location,
            linkedin_profile: company.linkedin_profile,
            emails: company.emails,
            phone_numbers: company.phone_numbers,
            comments: company.comments,
            communication_periodicity: company.communication_periodicity,
        });
        setShowDetails(false); // Hide details when editing
    };

    const handleDeleteCompany = () => {
        const companyToDelete = companies.find(
            (company) => company.name.toLowerCase() === deleteInput.toLowerCase()
        );

        if (companyToDelete) {
            deleteCompany(companyToDelete.id).then(() => {
                setAddMessage('Data deleted successfully!');
                setCompanies(companies.filter((company) => company.id !== companyToDelete.id));
                setDeleteInput('');
                setTimeout(() => setAddMessage(''), 3000);
            });
        } else {
            setAddMessage('Company name not found!');
            setTimeout(() => setAddMessage(''), 3000);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        fetchCompanies();
    };

    return (
        <div>
            <h1>Company Management</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search Companies"
                value={searchQuery}
                onChange={handleSearch}
            />
            <br/>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                /> <br/> <br/>
                <input
                    type="text"
                    placeholder="Location"
                    value={newCompany.location}
                    onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                /> <br/> <br/>
                <input
                    type="url"
                    placeholder="LinkedIn Profile"
                    value={newCompany.linkedin_profile}
                    onChange={(e) => setNewCompany({ ...newCompany, linkedin_profile: e.target.value })}
                /> <br/> <br/>
                <input
                    type="text"
                    placeholder="Emails (comma-separated)"
                    value={newCompany.emails}
                    onChange={(e) => setNewCompany({ ...newCompany, emails: e.target.value })}
                /> <br/> <br/>
                <input
                    type="text"
                    placeholder="Phone Numbers (comma-separated)"
                    value={newCompany.phone_numbers}
                    onChange={(e) => setNewCompany({ ...newCompany, phone_numbers: e.target.value })}
                /> <br/> <br/>
                <textarea
                    placeholder="Comments"
                    value={newCompany.comments}
                    onChange={(e) => setNewCompany({ ...newCompany, comments: e.target.value })}
                /> <br/> <br/>
                <input
                    type="text"
                    placeholder="Communication Periodicity"
                    value={newCompany.communication_periodicity}
                    onChange={(e) => setNewCompany({ ...newCompany, communication_periodicity: e.target.value })}
                /> <br/> <br/>
                <button onClick={handleAddCompany}>{editingCompany ? 'Update Company' : 'Add Company'}</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Company Name to Delete"
                    value={deleteInput}
                    onChange={(e) => setDeleteInput(e.target.value)}
                />
                <button onClick={handleDeleteCompany}>Delete Company</button>
            </div>
            <br/>
            <div>
                <input
                    type="text"
                    placeholder="Enter Company Name to Edit"
                    value={EditInput}
                    onChange={(e) => setEditInput(e.target.value)}
                />
               
            </div>
            {companyToEdit && (
                <div>
                    <h3>Edit Company</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newCompany.name}
                        onChange={(e) =>
                            setNewCompany({ ...newCompany, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={newCompany.location}
                        onChange={(e) =>
                            setNewCompany({ ...newCompany, location: e.target.value })
                        }
                    />
                    <input
                        type="url"
                        placeholder="LinkedIn Profile"
                        value={newCompany.linkedin_profile}
                        onChange={(e) =>
                            setNewCompany({ ...newCompany, linkedin_profile: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Emails (comma-separated)"
                        value={newCompany.emails}
                        onChange={(e) =>
                            setNewCompany({ ...newCompany, emails: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Phone Numbers (comma-separated)"
                        value={newCompany.phone_numbers}
                        onChange={(e) =>
                            setNewCompany({ ...newCompany, phone_numbers: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Comments"
                        value={newCompany.comments}
                        onChange={(e) =>
                            setNewCompany({ ...newCompany, comments: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Communication Periodicity"
                        value={newCompany.communication_periodicity}
                        onChange={(e) =>
                            setNewCompany({
                                ...newCompany,
                                communication_periodicity: e.target.value,
                            })
                        }
                    />
                    <button onClick={handleEditCompany}>Save Changes</button>
                </div>
            )}
            
            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>

            {showDetails && (
                <ul>
                    {companies.map((company) => (
                        <li key={company.id}>
                            <strong>{company.name}</strong> - {company.location}
                            <br />
                            LinkedIn: <a href={company.linkedin_profile} target="_blank" rel="noopener noreferrer">{company.linkedin_profile}</a>
                            <br />
                            Emails: {company.emails}
                            <br />
                            Phone Numbers: {company.phone_numbers}
                            <br />
                            Comments: {company.comments}
                            <br />
                            Communication Periodicity: {company.communication_periodicity}
                            <br />
                            <button onClick={() => handleEditCompany(company)}>Edit</button>
                        </li>
                    ))}
                </ul>
            )}
        
           // {/* Button Linking to Communication Method Management */}
            <div style={{ marginTop: '20px' }}>
                <Link to="/components/CommunicationMethodManagement">
                    <button>Go to Communication Method Management</button>
                </Link>
            </div>
            {addMessage && <p>{addMessage}</p>}
        </div>
    );
};

export default CompanyManagement;

