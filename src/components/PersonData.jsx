// UserInfoForm.jsx
import React, { useState, useEffect } from 'react';

const PersonData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  useEffect(() => {
    // Check if user data exists in local storage
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');

    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail);
      setIsFirstTimeUser(false);
    }
  }, []); // Run this effect only once on component mount

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Save user data to local storage
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);

    setIsFirstTimeUser(false);
  };

  const handleLogout = () => {
    // Clear all user data from local storage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    // Reset component state
    setName('');
    setEmail('');
    setIsFirstTimeUser(true);
  };

  return (
    <div>
      {isFirstTimeUser ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <button type="submit">Save User Info</button>
        </form>
      ) : (
        <div>
          <p>Welcome back, {name}!</p>
          <p>Email: {email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default PersonData;
