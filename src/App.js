
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './myComponents/Header';
import HeroSection from './myComponents/heroSection';
import Signin from './myComponents/Signinpage';
import Client from './myComponents/Client';
function App() {
  return (
   <>
    <Header/>
      <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/signup-page" element={<Signin/>} />
        <Route path="/signup" element={<Signin/>}/>
        <Route path="Client" element={<Client/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
