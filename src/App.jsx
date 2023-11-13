import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QRCodeScanner from './components/QRCodeScanner'
import PersonData from './components/PersonData'
function App() {
  const [count, setCount] = useState(0)

  const [showScanner, setShowScanner] = useState(false);

  const openScanner = () => {
    setShowScanner(true);
  };

  const closeScanner = () => {
    setShowScanner(false);
  };

  return (
    <div className="App">
      <PersonData/>
      <h1>QR Code Scanner</h1>
      <button onClick={openScanner}>Open Scanner</button>

      {showScanner && <QRCodeScanner onClose={closeScanner} />}
    </div>
  );
}
export default App
