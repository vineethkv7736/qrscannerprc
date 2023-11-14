import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = ({ onScan }) => {
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    const storedScanCount = localStorage.getItem('scanCount');
    if (storedScanCount) {
      setScanCount(parseInt(storedScanCount, 10));
    }

    const qrCodeScanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: 250,
    });

    qrCodeScanner.render(success,error);
    
    function success(result) {
      console.log(result);
      const l = result.length;
      result=result.toLowerCase();
      if (result.charAt(l - 1) === ' ' && result.substring(0,3) === 'prc') 
      {
        setScanCount((prevCount) => prevCount + 1);
        localStorage.setItem('scanCount', scanCount + 1);
        window.alert(`Scanning Successful`);
      }
      else
      {
        window.alert(`This Qr is not authorised in the system`);
        window.location.reload();
      }
      
    }

    function error(error) {
      window.alert('Error during QR code scan. Please Reverify the QR.');
      window.location.reload();
    }

   
  }, [onScan, scanCount]);

  return (
    <div>
      <div id="reader"></div>
      <p>Scan Count: {scanCount}</p>
    </div>
  );
};

export default QRCodeScanner;
