// QrCodeScanner.jsx
import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';

const QRCodeScanner = ({ onClose }) => {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      // Optionally, you can add logic to handle the scanned data
      console.log('Scanned Result:', data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <button onClick={onClose}>Close Scanner</button>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>Scanned Result: {result}</p>
    </div>
  );
};

export default QRCodeScanner;
