// UserForm.jsx
import React, { useState } from 'react';

interface UserFormProps {
  initialData?: {
    name?: string;
    occupation?: string;
    address?: string;
    email?: string;
    role?: string;
    password?: string;
  };
  includePassword: boolean;
  includeRole: boolean;
  onSubmit: (data: any) => void;
  errorMessage?: string;
  isAdmin?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData = {},
  includePassword,
  includeRole,
  onSubmit,
  errorMessage,
  isAdmin = false,
}) => {
  const [name, setName] = useState(initialData.name || '');
  const [occupation, setOccupation] = useState(initialData.occupation || '');
  const [address, setAddress] = useState(initialData.address || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(initialData.role || 'USER');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      occupation,
      address,
      email,
      ...(includePassword && { password }),
      ...(includeRole && { role: role === 'ADMIN' ? { id: 1, name: 'ADMIN' } : { id: 2, name: 'USER' } }),
    };
    onSubmit(formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        {/* Common form fields here */}
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
        {includePassword && (
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={includePassword}
            />
          </div>
        )}
        {includeRole && isAdmin && (
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        )}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
