import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../api/api';
import { User } from '../interfaces/User';

interface UserEditFormProps {
  onUpdateUser: (user: User) => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ onUpdateUser }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [userId, setUserId] = useState<number | undefined>(undefined); // Store userId as a state variable
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await getUserById(parseInt(id!));
      const userData = response.data.user_details;
      setUserId(userData.userId); // Set userId from the fetched data
      setName(userData.name);
      setOccupation(userData.occupation);
      setAddress(userData.address);
      setEmail(userData.email);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        const updatedUser = await updateUser(parseInt(id), {
          name,
          occupation,
          address,
          email,
        });
        onUpdateUser(updatedUser.data);
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title mb-4">Edit User</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                className="form-control"
                value={userId !== undefined ? userId : ''}
                readOnly // Set the input field as read-only
                disabled // Disable the input field to prevent interaction
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditForm;
