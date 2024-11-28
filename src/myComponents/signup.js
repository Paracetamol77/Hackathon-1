/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Signup= () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    // Validate input fields
    if (!validateEmail(email)) {
      alert("Please enter a valid email address!");
      return;
    }
    if (password.trim() === "") {
      alert("Password cannot be empty!");
      return;
    }

    // Authentication logic
    if (email === "admin@example.com") {
      navigate("/admin"); // Redirect to Admin Panel
    } else {
      navigate("/client"); // Redirect to Client Interface by default
    }
  };

  // Helper function for email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  return (
    <center>
      <div className="Login">
        <h2>SignUp</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Email Field */}
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button className={styles.btn} type="submit">
          SignUP
          </button>
        </form>

        {/* Link to Signup Page */}
       
      </div>
    </center>
  );
};

export default Signup;
