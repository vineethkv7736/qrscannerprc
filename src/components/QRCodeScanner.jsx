import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = ({ onScan, updateScanCount }) => {
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    const storedScanCount = localStorage.getItem('scanCount');
    if (storedScanCount) {
      setScanCount(parseInt(storedScanCount, 10));
    }

    const qrCodeScanner = new Html5QrcodeScanner('reader', {
      fps: 500,
      qrbox:100,
    });

    qrCodeScanner.render(success, error);

    function success(result) {
      console.log(result);
      const l = result.length;
      result = result.toLowerCase();
      if (result.charAt(l - 1) === ' ' && result.substring(0, 3) === 'prc')
       {
        const scannedCodes = JSON.parse(localStorage.getItem('scannedCodes')) || [];
        if (scannedCodes.includes(result)) { qrCodeScanner.clear();
          window.alert(`This QR code has already been scanned.`);
         
        } 
        else {
          localStorage.setItem('scannedCodes', JSON.stringify([...scannedCodes, result]));
          setScanCount((prevCount) => prevCount + 1);
          localStorage.setItem('scanCount', scanCount + 1);
          qrCodeScanner.clear();
          window.alert(`Scanning Successful`);
        }
      }
       else {
        window.alert(`This QR is not authorized our system`);
        qrCodeScanner.clear();
      }
    
    }

    function error(error) {
      console.log("error");
    }

    updateScanCount(scanCount);
  }, [onScan, scanCount, updateScanCount]);

  return (
    <div>
      <div id="reader" className='p-4 ml-10 mr-10 bg-white flex flex-col justify-center shadow-md rounded-md font-sans'></div>
    </div>
  );
};

export default QRCodeScanner;
