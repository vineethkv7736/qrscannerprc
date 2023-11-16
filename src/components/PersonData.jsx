import React, { useState, useEffect } from 'react';
import QRCodeScanner from './QRCodeScanner'
const PersonData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
    <div className='w-screen h-screen bg-gray-300 flex justify-center items-center'>
      {isFirstTimeUser ? (
        <form onSubmit={handleFormSubmit} className='p-4 bg-white flex flex-col items-center shadow-md rounded-md'>
          <h1>PROTEK - 2023</h1>
          <label className='label mt-2'>
            Name:
            <input className='input' placeholder='Username' type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          </label>
          <label className='label'>
            Email:
            <input className='input' placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </label>
          <label className='label'>
            Phone:
            <input className='input' placeholder='Mobile number' type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
          </label>
          <button className='p-2 bg-red-900 mt-3 font-semibold text-white rounded-lg mt-2' type="submit">Save User Info</button>
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
