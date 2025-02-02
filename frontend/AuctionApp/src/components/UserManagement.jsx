import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ first_name: '', email: '', nic_number: '', address: '' });
  const [userToDelete, setUserToDelete] = useState(null);

  const API_URL = 'http://localhost:8000/api/users';
  const token = localStorage.getItem('token');

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL, {
          headers: { Authorization: `Token ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        console.log(data)
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e, setForm) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditFormData({ first_name: user.first_name, email: user.email, nic_number: user.nic_number, address: user.address });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await fetch(`${API_URL}/${editingUser.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(editFormData),

      });
      console.log(editFormData)
      if (!response.ok) throw new Error('Failed to update user');
      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      toast.success("User updated successfully!");
      setEditingUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
      });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted successfully!"); 
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
  };

  const cancelDeleteUser = () => {
    setUserToDelete(null);
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      <table className="w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">NIC</th>
            <th className="p-4 text-left">Address</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-4">{user.first_name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.nic_number}</td>
              <td className="p-4">{user.address}</td>
              <td className="p-4">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDeleteUser(user)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96 text-center">
            <p className="mb-4">Are you sure you want to delete {userToDelete.first_name}?</p>
            <button
              onClick={() => {
                handleDeleteUser(userToDelete.id);
                cancelDeleteUser();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Yes, Delete
            </button>
            <button
              onClick={cancelDeleteUser}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


      {editingUser && (
        <form onSubmit={handleUpdateUser} className="mt-6">
          <input
            type="text"
            name="first_name"
            value={editFormData.first_name}
            onChange={(e) => handleInputChange(e, setEditFormData)}
            className="border p-2 rounded mr-2"
            required
          />
          <input
            type="text"
            name="email"
            value={editFormData.email}
            onChange={(e) => handleInputChange(e, setEditFormData)}
            className="border p-2 rounded mr-2"
            required
          />
          <input
            type="text"
            name="nic_number"
            value={editFormData.nic_number}
            onChange={(e) => handleInputChange(e, setEditFormData)}
            className="border p-2 rounded mr-2"
            required
          />
          <input
            type="text"
            name="address"
            value={editFormData.address}
            onChange={(e) => handleInputChange(e, setEditFormData)}
            className="border p-2 rounded mr-2"
            required
          />

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Update User
          </button>
          <button
            type="button"
            onClick={() => setEditingUser(null)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default UserManagement;
