import React from "react";
import styles from "../app/page.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.ramadanInfo}>
          <h3>The Significance of Ramadan</h3>
          <p>
            Ramadan is a blessed month of mercy, reflection, and devotion, where
            hearts are purified, souls are uplifted, and faith is strengthened
            through fasting, prayer, and generosity.
          </p>
        </div>
        <div className={styles.developerInfo}>
          <div className={styles.developerProfile}>
            <div className={styles.profilePicture}>
              <img src="/developer.jpg" alt="Developer" />
            </div>
            <div className={styles.developerDetails}>
              <h3>Muhammad Yasin</h3>
              <p>Created with ❤️ and dedication</p>
              <p>© 2025 Eid Wish App</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
