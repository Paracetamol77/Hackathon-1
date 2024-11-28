import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./client.module.css";

const Client = () => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    alert(`You selected: ${option}`);
    // Add navigation or functionality for each option as needed
  };

  return (
    <center>
      <div className={styles.clientContainer}>
        <h1>Welcome to the Client Interface</h1>
        <p>Select an option below to proceed:</p>

        <div className={styles.options}>
          <button
            className={styles.optionButton}
            onClick={() => handleOptionClick("Option 1")}
          >
            Option 1
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleOptionClick("Option 2")}
          >
            Option 2
          </button>
          <button
            className={styles.optionButton}
            onClick={() => handleOptionClick("Option 3")}
          >
            Option 3
          </button>
        </div>
        <button
          className={styles.logoutButton}
          onClick={() => navigate("/login")}
        >
          Logout
        </button>
      </div>
    </center>
  );
};

export default Client;
