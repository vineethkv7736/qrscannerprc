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
      fps: 10,
      qrbox: 400,
    });

    qrCodeScanner.render(success, error);

    function success(result) {
      console.log(result);
      const l = result.length;
      result = result.toLowerCase();
      if (result.charAt(l - 1) === ' ' && result.substring(0, 3) === 'prc') {
        setScanCount((prevCount) => prevCount + 1);
        localStorage.setItem('scanCount', scanCount + 1);
        qrCodeScanner.clear();
        window.alert(`Scanning Successful`);
        qrCodeScanner.clear();
      } else {
        window.alert(`This Qr is not authorized in the system`);
        window.location.reload()
      }
    }

    function error(error) {
      console.log("error");
    }
    updateScanCount(scanCount);

  }, [onScan, scanCount, updateScanCount]);

  return (
    <div>
      <div id="reader"></div>
      <p>Scan Count: {scanCount}</p>
    </div>
  );
};

export default QRCodeScanner;
