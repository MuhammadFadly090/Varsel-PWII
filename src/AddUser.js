import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('https://reqres.in/api/users', { first_name: firstName, last_name: lastName })
      .then(response => {
        alert('User added successfully');
        setLoading(false);
      })
      .catch(error => {
        setError('Error adding user');
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add User'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AddUser;
