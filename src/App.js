import React from 'react';
import UserList from './UserList'; // Pastikan path ini sesuai dengan lokasi UserList.js
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Konsumsi API Menggunakan Axios</h1>
      </header>
      <main className="App-main">
        <UserList />
      </main>
    </div>
  );
}

export default App;
