import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { loginUser } from '../api/api'; 

interface LoginProps {
  onLoginSuccess: (user: any) => void; 
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await loginUser({ email, password });
      onLoginSuccess(user);
      navigate('/');
    } catch (error: any) {
      console.error('Login failed:', error);
      const message = (error.response?.data?.error.message.slice(0, 100) || 'An unexpected error occurred') + (error.response?.data?.error.message.length > 100 ? '...' : '');
      setErrorMessage(message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
       {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {/* Link to Signup Page */}
        <p className="mt-3">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
