// React Frontend Code
// Implementation for Communication Method Management

import React, { useState, useEffect } from 'react';
import { getMethods, addMethod, updateMethod, deleteMethod } from '../services/api';

const CommunicationMethodManagement = () => {
    const [methods, setMethods] = useState([]);
    const [newMethod, setNewMethod] = useState({
        name: '',
        description: '',
        sequence: '',
        mandatory: false,
    });
    const [editingMethod, setEditingMethod] = useState(null);

    useEffect(() => {
        fetchMethods();
    }, []);

    const fetchMethods = () => {
        getMethods().then((response) => {
            setMethods(response.data);
        });
    };

    const handleAddOrUpdateMethod = () => {
        if (editingMethod) {
            updateMethod(editingMethod.id, newMethod).then(() => {
                setEditingMethod(null);
                setNewMethod({ name: '', description: '', sequence: '', mandatory: false });
                fetchMethods();
            });
        } else {
            addMethod(newMethod).then((response) => {
                setMethods([...methods, response.data]);
                setNewMethod({ name: '', description: '', sequence: '', mandatory: false });
            });
        }
    };

    const handleEditMethod = (method) => {
        setEditingMethod(method);
        setNewMethod({ ...method });
    };

    const handleDeleteMethod = (id) => {
        deleteMethod(id).then(() => {
            setMethods(methods.filter((method) => method.id !== id));
        });
    };

    return (
        <div>
            <h1>Communication Method Management</h1>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newMethod.name}
                    onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newMethod.description}
                    onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Sequence"
                    value={newMethod.sequence}
                    onChange={(e) => setNewMethod({ ...newMethod, sequence: e.target.value })}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={newMethod.mandatory}
                        onChange={(e) => setNewMethod({ ...newMethod, mandatory: e.target.checked })}
                    />
                    Mandatory
                </label>
                <button onClick={handleAddOrUpdateMethod}>{editingMethod ? 'Update Method' : 'Add Method'}</button>
            </div>

            <ul>
                {methods.map((method) => (
                    <li key={method.id}>
                        <strong>{method.name}</strong> - {method.description}
                        <br />
                        Sequence: {method.sequence}
                        <br />
                        Mandatory: {method.mandatory ? 'Yes' : 'No'}
                        <br />
                        <button onClick={() => handleEditMethod(method)}>Edit</button>
                        <button onClick={() => handleDeleteMethod(method.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommunicationMethodManagement;


