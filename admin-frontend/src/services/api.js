import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getCompanies = () => { 
    return axios.get(`${API_BASE_URL}/companies/`);
};
export const addCompany = (data) => {
    return axios.post(`${API_BASE_URL}/companies/`, data);
};
export const  updateCompany = (id,company) => {
    return axios.put(`${API_BASE_URL}/companies/${id}/`, company);
};
export const deleteCompany = (id) => {
    return axios.delete(`${API_BASE_URL}/companies/${id}/`);
};

export const editCompany = (id, updatedData) => {
    return axios.put(`${API_BASE_URL}/companies/${id}/`, updatedData);
};


export const getCommunications = () => {
    return axios.get(`${API_BASE_URL}/communications/`);
  };
  
export const getCommunicationSchedules = () => {
    return axios.get(`${API_BASE_URL}/communication_schedule/`);
  };

export const postCommunication = (communicationData) => {
    return axios.post(`${API_BASE_URL}/communications/`, communicationData);
  };

/*export const editCompany = (id, company) => {
    return axios.put(`${API_BASE_URL}/companies/${id}/`, company);
};*/


/*export const getCommunicationMethods = () => {
    return axios.get(`${API_BASE_URL}/communication-methods/`);
};*/

export const getMethods = () => {
    return axios.get(`${API_BASE_URL}/communication-methods/`);
};

export const addMethod = (method) => {
    return axios.post(`${API_BASE_URL}/communication-methods/`, method);
};

export const updateMethod = (id, method) => {
    return axios.put(`${API_BASE_URL}/communication-methods/${id}/`, method);
};

export const deleteMethod = (id) => {
    return axios.delete(`${API_BASE_URL}/communication-methods/${id}/`);
};



