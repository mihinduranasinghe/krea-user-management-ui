import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser, addUser } from '../api/api';
import { User } from '../interfaces/User';

interface UserEditFormProps {
  onUpdateUser?: (user: User) => void;
  isAdmin?: boolean;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ onUpdateUser, isAdmin = false }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [userId, setUserId] = useState<number | undefined>(undefined); 
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await getUserById(parseInt(id!));
      const userData = response.data.user_details;
      setUserId(userData.userId); 
      setName(userData.name);
      setOccupation(userData.occupation);
      setAddress(userData.address);
      setEmail(userData.email);
      setRole(userData.role.id === 1 ? 'ADMIN' : 'USER');
    } catch (error: any) {
      console.error('Error fetching user:', error);
      const message = (error.response?.data?.error.message.slice(0, 100) || 'An unexpected error occurred') + (error.response?.data?.error.message.length > 100 ? '...' : '');
      setErrorMessage(message);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      occupation,
      address,
      email,
      role: role === 'ADMIN' ? {
        id: 1,
        name: 'ADMIN',
      } : {
        id: 2,
        name: 'USER',
      }, 
    };

    try {
      if (id && onUpdateUser) {
        const updatedUser = await updateUser(parseInt(id), payload);
        onUpdateUser(updatedUser.data);
      } else {
        await addUser(payload);
      }
      navigate('/');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const message = (error.response?.data?.error.message.slice(0, 100) || 'An unexpected error occurred') + (error.response?.data?.error.message.length > 100 ? '...' : '');
      setErrorMessage(message);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Edit User</h2>
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                className="form-control"
                value={userId !== undefined ? userId : ''}
                readOnly 
                disabled 
              />
            </div>
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
            {isAdmin && (
              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select id="role" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              {id ? 'Update' : 'Create'}
            </button>
            <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate('/')}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditForm;
