import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/api';
import UserForm from './forms/UserForm';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (formData: any) => {
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'An unexpected error occurred';
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <h2>Signup or <span><Link to="/login">Back to Login</Link></span></h2>
      <UserForm
        includePassword={true}
        includeRole={false}
        onSubmit={handleFormSubmit}
        errorMessage={errorMessage}
        isAdmin={false}
      />
    </div>
  );
};

export default Signup;
