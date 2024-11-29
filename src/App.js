
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeroSection from './myComponents/heroSection';
import Client from './myComponents/Client';
import NIDVerification from './myComponents/NIDVerification';
function App() {
  return (
   <>
      <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/Client" element={<Client/>} />
        <Route path="/" element={<Client/>}/>
        <Route path="/nidverification" element={<NIDVerification />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
