// src/components/QRCodeScanner.js
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRCodeScanner = ({ onClose }) => {
  const [scannedCodes, setScannedCodes] = useState([]);
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);

      // Check if the QR code is already scanned
      if (!scannedCodes.includes(data)) {
        // Save data to local storage
        localStorage.setItem('qrCodeData', JSON.stringify([...scannedCodes, data]));
        // Update the state with the new scanned code
        setScannedCodes([...scannedCodes, data]);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <button onClick={onClose}>Close Scanner</button>
      <QrScanner
        onScan={handleScan}
        onError={handleError}
        style={{ width: '100%' }}
      />
      <p>Scanned Result: {result}</p>
      <p>Scanned Codes: {scannedCodes.join(', ')}</p>
    </div>
  );
};

export default QRCodeScanner;
