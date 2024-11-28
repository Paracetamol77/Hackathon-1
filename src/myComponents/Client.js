import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./client.module.css";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
const Client = () => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    alert(`You selected: ${option}`);
    // Add navigation or functionality for each option as needed
  };

  const options = [
    {
      title: "सिफारिसको लागि टोकन",
      description:
        "सिफारिस प्राप्त गर्न टोकन आवश्यक छ। कृपया यहाँ क्लिक गर्नुहोस्।",
      imgSrc: image3, // Replace with actual images
    },
    {
      title: "नागरिकताको लागि टोकन",
      description:
        "नागरिकता प्रक्रियाका लागि टोकन लिन यहाँ क्लिक गर्नुहोस्।",
      imgSrc:image1,
    },
    {
      title: "ट्राफिक लाइसेन्सको टोकन",
      description:
        "ट्राफिक लाइसेन्सका लागि आवश्यक टोकन लिन यहाँ क्लिक गर्नुहोस्।",
      imgSrc:image2,
    },
  ];

  return (
    <div className={styles.clientContainer}>
      <h1 className={styles.heading}>
        अगाडि बढ्नको लागि तलको विकल्प चयन गर्नुहोस्:
      </h1>
      <p className={styles.subheading}>
        Select an option below to proceed:
      </p>
      <div className={styles.cardContainer}>
        {options.map((option, index) => (
          <div key={index} className={styles.card}>
            <img
              src={option.imgSrc}
              alt={option.title}
              className={styles.cardImage}
            />
            <h2 className={styles.cardTitle}>{option.title}</h2>
            <p className={styles.cardDescription}>{option.description}</p>
            <button
              className={styles.cardButton}
              onClick={() => handleOptionClick(option.title)}
            >
              Get token 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
