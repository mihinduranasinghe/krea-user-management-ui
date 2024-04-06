import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../api/api';
import UserForm from './forms/UserForm';

interface AddUserFormProps {
  onAddUser: (user: any) => void;
  isAdmin: boolean;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser, isAdmin }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (formData: any) => {
    try {
      const response = await addUser(formData);
      onAddUser(response.data);
      navigate('/');
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'An unexpected error occurred';
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <UserForm
        includePassword={true}
        includeRole={isAdmin}
        onSubmit={handleFormSubmit}
        errorMessage={errorMessage}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default AddUserForm;
