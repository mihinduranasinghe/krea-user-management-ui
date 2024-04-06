// src/components/AddUserForm.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../api/api';
import { User } from '../interfaces/User';

interface AddUserFormProps {
  onAddUser: (user: User) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await addUser({ name, occupation, address, email });
      onAddUser(newUser.data);
      navigate('/');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Add User</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="occupation">Occupation:</label>
              <input
                type="text"
                id="occupation"
                className="form-control"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
            <Link to="/" className="btn btn-secondary ml-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
