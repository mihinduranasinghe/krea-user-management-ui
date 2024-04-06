import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../api/api';
import { User } from '../interfaces/User';
import LoadingSpinner from './loading/LoadingSpinner';

interface UserListProps {
  users: User[];
  userRole: string; 
}

const UserList: React.FC<UserListProps> = ({ users, userRole }) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      const fetchedUsers: User[] = response.data.users;
      setUserList(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUserList(userList.filter((user) => user.userId !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <h2>User List</h2>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Occupation</th>
            <th>Address</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.occupation}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.role.name}</td>
              <td>
                {userRole === 'ADMIN' ? (
                  <>
                    <Link to={`/edit/${user.userId}`} className="btn btn-sm btn-primary mr-2">Edit</Link>
                    <button onClick={() => handleDeleteUser(user.userId)} className="btn btn-sm btn-danger">Delete</button>
                  </>
                ) : (
                  <>
                    <button disabled className="btn btn-sm btn-primary mr-2">Edit</button>
                    <button disabled className="btn btn-sm btn-danger">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;