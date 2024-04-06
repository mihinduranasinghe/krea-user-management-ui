import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import UserEditForm from './components/UserEditForm';
import Login from './components/Login';
import Signup from './components/Signup';
import { User } from './interfaces/User';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>(''); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole'); // Retrieve the role
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role); // Set the role
    }
  }, []);

  const handleAddUser = (user: User) => {
    setUsers([...users, user]);
  };

  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map(user =>
      user.userId === updatedUser.userId ? updatedUser : user,
    );
    setUsers(updatedUsers);
  };

  const handleLoginSuccess = (response: any) => {
  console.log('User logged in:', response.data.data);
  setIsAuthenticated(true);
  setUserRole(response.data.data.role.name);
  localStorage.setItem('token', response.data.token); // Store the token
  localStorage.setItem('userRole', response.data.data.role.name); // Store the role
};

  return (
    <Router>
      <div className="container py-5">
        <h1 className="mb-4">KREA User Management System</h1>
        <NavigationButton isAuthenticated={isAuthenticated} userRole={userRole} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <UserList users={users} userRole={userRole} /> : <Navigate replace to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate replace to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate replace to="/" />} />
          {isAuthenticated && (
            <>
              <Route path="/add" element={userRole === 'ADMIN' ? <AddUserForm onAddUser={handleAddUser} /> : <Navigate replace to="/" />} />
              <Route path="/edit/:id" element={<UserEditForm onUpdateUser={handleUpdateUser} />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

const NavigationButton: React.FC<{ isAuthenticated: boolean; setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; userRole: string }> = ({ isAuthenticated, setIsAuthenticated, userRole }) => {
  const navigate = useNavigate();
  console.log('User role:', userRole);
  const handleLogout = () => {
  setIsAuthenticated(false);
  // setUserRole(''); // Reset role state
  localStorage.removeItem('token'); // Remove the token
  localStorage.removeItem('userRole'); // Remove the role
  navigate('/login');
};

  return (
    <nav className="my-3">
      {isAuthenticated && (
        <>
          <Link to="/" className="btn btn-secondary m-3">User List</Link>
          {userRole === 'ADMIN' ? (
            <Link to="/add" className="btn btn-primary m-3">Add User</Link>
          ) : (
            // Button is disabled and not clickable for non-ADMIN users, but still visible
            <button className="btn btn-primary m-3" disabled>Add User</button>
          )}
          <button onClick={handleLogout} className="btn btn-danger m-3">Logout</button>
        </>
      )}
    </nav>
  );
};

export default App;
