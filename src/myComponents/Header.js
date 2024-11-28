import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}> designed by:omkara</div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li><a href="#home" className={styles.navLink}>Home</a></li>
          <li><a href="#about" className={styles.navLink}>About</a></li>
          <li><a href="#services" className={styles.navLink}>Services</a></li>
          <li><a href="#contact" className={styles.navLink}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
