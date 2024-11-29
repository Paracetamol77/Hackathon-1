import React, { useState } from "react";
import styles from "./nidverification.module.css"; // Import the updated CSS module

const NIDVerification = () => {
  const [nid, setNid] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState("");

  const handleVerify = () => {
    const nidRegex = /^\d{3}-\d{3}-\d{4}$/; // Format: 3-3-4 digits
    if (nidRegex.test(nid)) {
      setIsVerified(true);
      setToken(generateToken());
    } else {
      alert("Invalid NID format! Please use the format 123-456-7890.");
      setIsVerified(false);
      setToken("");
    }
  };

  const generateToken = () => {
    return (
      Math.random().toString(36).substring(2, 8) +
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
  };

  return (
    <div className={`${styles.nidBody}`}>
      <div className={`${styles.nidContainer} ${isVerified ? styles.nidContainerExpanded : ""}`}>
        <div className={styles.nidSectionWrapper}>
          <div className={styles.nidVerificationSection}>
            <h1 className={styles.nidHeading}>NID Verification</h1>
            <p className={styles.nidSubheading}>Enter your NID for verification:</p>
            <div className={styles.nidForm}>
              <input
                type="text"
                className={styles.nidInputField}
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                placeholder="NID (e.g., 123-456-7890)"
              />
              <button className={styles.nidVerifyButton} onClick={handleVerify}>
                Verify NID
              </button>
            </div>
          </div>

          <div className={styles.nidSuggestionSection}>
            <h2 className={styles.nidSuggestionHeading}>सुझाव पेटिका</h2>
            <ul className={styles.nidSuggestionsList}>
  <li>- न्यायिक पहिचानको लागि वैध नागरिकता नम्बर र प्रमाणित NID अनिवार्य छ।</li>
  <li>- NID र नागरिकता नम्बरको सही स्वरूपमा जानकारी राख्नुहोस्।</li>
  <li>- तपाईंको NID प्रमाणित गर्नका लागि सही जानकारी प्रदान गर्नुहोस्।</li>
            </ul>
          </div>
        </div>

        {isVerified && (
          <div className={styles.nidResultSection}>
            <p className={styles.nidSuccessMessage}>NID Verified Successfully!</p>
            <div className={styles.nidTokenContainer}>
              <h2 className={styles.nidTokenHeading}>Generated Token:</h2>
              <p className={styles.nidToken}>{token}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NIDVerification;
