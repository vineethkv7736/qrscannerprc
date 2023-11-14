import React, { useState, useEffect } from 'react';
import QRCodeScanner from './QRCodeScanner'
const PersonData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  useEffect(() => {
    
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');

    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail);
      setIsFirstTimeUser(false);
    }
  }, []); 

  const handleFormSubmit = (e) => {
    e.preventDefault();

    
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);

    setIsFirstTimeUser(false);
  };

  const handleLogout = () => {
    const auth = window.prompt('Enter the authenthication number from coordinator');
    if( auth==12345678)
    {
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('scanCount');
      // Reset component state
      setName('');
      setEmail('');
      setIsFirstTimeUser(true);
    }
    else 
    {
      window.alert("Try again");
    }
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
          <h1>QR Code Scanner</h1>
          <QRCodeScanner/>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default PersonData;
