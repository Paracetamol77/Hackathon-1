import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroSection.module.css'; // Import the CSS module

const HeroSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/signup-page'); // Navigate to the next page
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeading}>"Book Your Tickets Now"</h1>
        <p className={styles.heroSubheading}>"सरकारी कार्यालयहरूको लागि टिकटहरू छनौट गर्नुहोस्"</p>
        <button className={styles.welcomeButton} onClick={handleButtonClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
