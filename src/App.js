
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './myComponents/Header';
import HeroSection from './myComponents/heroSection';
import Signuppage from './myComponents/Signuppage';
import Signup from './myComponents/signup';
function App() {
  return (
   <>
    <Header/>
      <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/signup-page" element={<Signuppage/>} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Signup/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
