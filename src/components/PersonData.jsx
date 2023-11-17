import React, { useState, useEffect } from 'react';
import QRCodeScanner from './QRCodeScanner';
import "./per.css";
import {db} from "../firebase/config.js";
import { doc, setDoc, updateDoc } from "firebase/firestore";
const PersonData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  const [scanCount, setScanCount] = useState(0);

  const updateScanCount = (count) => {
    setScanCount(count);
  };
  useEffect(() => {
    
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedScanCount = localStorage.getItem('scanCount');
    console.log(storedScanCount);
    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail);
     // setScanCount(parseInt(storedScanCount, 10));
      setIsFirstTimeUser(false);
    }
  }, []); 

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    await setDoc(doc(db, "users",email), {
      Name: name,
      Email:email,
      Phno: phone
    }).then(()=>{
      setIsFirstTimeUser(false)
    }).catch((er)=>{
      alert("Try again")
      console.error(er);
  })
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);

  };

  const handleLogout = async() => {
    let auth = window.prompt('Type "PROTEK" to confirm logout');
    auth=auth.toUpperCase();
    if(auth=="PROTEK")
    { const up= doc(db, "users",email);
      await updateDoc(up,{
      count:scanCount
      }).then(()=>{
        localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('scanCount');
      localStorage.removeItem('scannedCodes');
      localStorage.removeItem('scanCount');
      setName('');
      setEmail('');
      updateScanCount(0);
      setIsFirstTimeUser(true);
      }).catch((er)=>{
        alert("Firebase error Try again")
        console.error(er);
    })
      
    }
    else 
    {
      window.alert("Try again");
    }
  };

  return (
    <div >
      {isFirstTimeUser ? (<div className='w-screen h-screen bg-gray-200 flex justify-center items-center '>
        <form onSubmit={handleFormSubmit} className='p-4 bg-white flex flex-col items-center shadow-md rounded-md font-sans'>
          <h1 className='font-serif'>PROTEK - 2023</h1>
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
        </div>
      ) : (
        <div className='w-screen h-screen bg-gray-200'>
          <div className=' flex justify-start'>
        <p className='font-serif text-2xl mb-1 mt-2 ml-5'>Welcome  {name}</p>
        </div>
        <div className=' flex justify-end'>
        <button onClick={handleLogout} className='p-2 bg-red-900 text-white rounded-lg mt-1 mr-2'>Logout</button>
        </div>
        <div className=' flex justify-center'>
        <p  className='font-serif text-1xl mb-0 blink'>Total No of Scan: {scanCount}</p>
        </div>
        <hr className='pt-0.5 bg-red-900 mt-3 ml-3 mr-3' />
        <h1 className='flex justify-center font-serif text-2xl mt-4 mb-4'>Scan QR</h1>
        <QRCodeScanner updateScanCount={updateScanCount} />
      </div>
      )}
    </div>
  );
};

export default PersonData;
