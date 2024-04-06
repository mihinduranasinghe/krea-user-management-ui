// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationButton from './components/NavigationButton';
import UserList from './components/UserList';
import AddUserForm from './components/AddUser';
import UserEditForm from './components/forms/UserEditForm';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import { User } from './interfaces/User';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleAddUser = (user: User) => {
    setUsers([...users, user]);
  };

  const handleUpdateUser = (updatedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.userId === updatedUser.userId ? updatedUser : user,
    );
    setUsers(updatedUsers);
  };

  const handleLoginSuccess = (response: any) => {
    setIsAuthenticated(true);
    setUserRole(response.data.data.role.name);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userRole', response.data.data.role.name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  };

  return (
    <Router>
      <div className="container py-5">
        <h1 className="mb-4">KREA User Management System</h1>
        <NavigationButton isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <UserList users={users} userRole={userRole} /> : <Navigate replace to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate replace to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate replace to="/" />} />
          {isAuthenticated && (
            <>
              <Route path="/add" element={userRole === 'ADMIN' ? <AddUserForm isAdmin={true} onAddUser={handleAddUser} /> : <Navigate replace to="/" />} />
              <Route path="/edit/:id" element={<UserEditForm onUpdateUser={handleUpdateUser} isAdmin={userRole === 'ADMIN'} />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
