import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Pastikan Anda membuat file CSS untuk UserList

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk menyimpan data baru (untuk update)
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); // Menyimpan ID pengguna yang dipilih untuk update

  useEffect(() => {
    // Fetch data dari API
    axios.get('https://reqres.in/api/users')
      .then(response => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  // Fungsi untuk menghapus data
  const handleDelete = (id) => {
    axios.delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        alert('User deleted');
        // Mengupdate state users setelah penghapusan
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(() => {
        setError('Error deleting user');
      });
  };

  // Fungsi untuk mengupdate data
  const handleUpdate = () => {
    if (selectedUserId) {
      axios.put(`https://reqres.in/api/users/${selectedUserId}`, { first_name: newFirstName, last_name: newLastName })
        .then(response => {
          alert('User updated');
          // Update state users dengan data baru
          setUsers(users.map(user => user.id === selectedUserId ? response.data : user));
          setNewFirstName('');
          setNewLastName('');
          setSelectedUserId(null); // Reset selected user
        })
        .catch(() => {
          setError('Error updating user');
        });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="user-item">
            <span>{user.first_name} {user.last_name}</span>
            <div>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
              <button onClick={() => {
                setSelectedUserId(user.id); 
                setNewFirstName(user.first_name); 
                setNewLastName(user.last_name);
              }}>Edit</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="update-user">
        <h2>Update User</h2>
        <input
          type="text"
          placeholder="First Name"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
        />
        <button onClick={handleUpdate}>Update User</button>
      </div>
    </div>
  );
};

export default UserList;
