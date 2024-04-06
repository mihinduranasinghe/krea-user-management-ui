import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavigationButtonProps {
  isAuthenticated: boolean;
  userRole: string;
  onLogout: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  isAuthenticated,
  userRole,
  onLogout,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="my-3">
      {isAuthenticated && (
        <>
          <Link to="/" className="btn btn-secondary m-3">User List</Link>
          {userRole === 'ADMIN' && (
            <Link to="/add" className="btn btn-primary m-3">Add User</Link>
          )}
          <button onClick={handleLogout} className="btn btn-danger m-3">Logout</button>
        </>
      )}
    </nav>
  );
};

export default NavigationButton;
