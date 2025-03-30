"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaStar } from "react-icons/fa";
import styles from "./page.module.css";
import useTypewriter from "../hooks/useTypewriter";
export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [starStyles, setStarStyles] = useState([]);
  useEffect(() => {
    const styles = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${Math.random() * 1 + 0.5}rem`,
    }));
    setStarStyles(styles);
  }, []);

  // Messages content
  const messages = [
    {
      title: "Eid Wishing",
      content: "اپ کو میری طرف سے بہت بہت عید مبارک",
      background: "ramadan-bg",
    },
    {
      title: "Ramadan Reflections",
      content:
        "  اللّٰہ تعالیٰ آپ کی عبادات اور کاوشوں کو اپنی بارگاہ میں شرفِ قبولیت عطا فرمائے اور آپ کو خوشحالی و کامیابیوں سے نوازے۔",
      background: "ramadan-bg",
    },
    {
      title: "Eid Mubarak",
      content:
        "عید مبارک! یہ خوشیوں بھرا دن آپ کے دل کو سکون، روح کو راحت اور زندگی کو خوشحالی سے بھر دے۔ دعا ہے کہ آپ اور آپ کی فیملی پر رحمتیں نازل ہوں، محبتیں بکھریں اور ہر لمحہ مسکراہٹوں سے جگمگائے۔!",
      background: "eid-bg",
    },
    {
      title: "Honoring Women",
      content:
        " رمضان بھر ہماری مائیں، بہنیں، بیٹیاں اور بیویاں بے لوث خدمت میں مصروف رہیں۔ سحری میں سب کو جگانا، افطار کی تیاری، گھر کے کام اور پھر اپنی عبادات—ان کی قربانیاں بے مثال ہیں۔ اللّٰہ ان کی محنت، صبر اور محبت کو قبول فرمائے اور انہیں بے شمار خوشیوں سے نوازے۔ آپ سب عظیم ہیں، آپ کی محبتوں کو سلام",
      background: "women-bg",
    },
    {
      title: "Eidi dedo yrr 😍😜💸",
      content:
        " عید کی خوشیاں بانٹیں، خاص طور پر اُن سے جو صرف عیدی مانگنے آتے ہیں! 😜💸 خیر، اگر دل کرے تو اس QR کوڈ پر عیدی بھیج دیں، قسمت اچھی ہوئی تو مل ہی جائے! 😂🎁 ",
      background: "women-bg",
    },
  ];
  const { displayedText, isTyping } = useTypewriter(
    messages[currentPage]?.content || "",
    30 // Speed of typing (milliseconds per character)
  );

  const nextPage = () => {
    if (currentPage < messages.length - 1 && !isTyping) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isTyping) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  // Page variants for transitions
  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className={styles.parent}>
      <main
        className={`${styles.main} ${styles[messages[currentPage].background]}`}
      >
        {/* Floating elements */}
        <div className={styles.imgParent}>
          <img
            className={styles.topGraphics}
            src="/top-graphics.png"
            alt="Floating elements"
          />
        </div>
        <div className={styles.floatingElements}>
          <div className={styles.moon}>
            <FaMoon size={50} color="gold" />
          </div>
          {starStyles.map((style, i) => (
            <div key={i} className={styles.star} style={style}>
              <FaStar color="gold" />
            </div>
          ))}
        </div>

        {/* Calligraphy pattern overlay */}
        <div className={styles.calligraphyPattern}></div>

        {/* Message content */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className={styles.pageContent}
          >
            <h1>{messages[currentPage].title}</h1>
            <p className={styles.urduText}>{displayedText}</p>
            {isTyping && <span className={styles.cursor}>|</span>}
            {currentPage == messages.length - 1 && (
              <div className={styles.qrCode}>
                <img src="/qr-code.jpg" alt="QR Code" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className={styles.navigation}>
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`${styles.navButton} ${
              currentPage === 0 ? styles.disabled : ""
            }`}
          >
            Previous
          </button>
          <div className={styles.pageIndicator}>
            {messages.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  currentPage === index ? styles.activeDot : ""
                }`}
              ></span>
            ))}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === messages.length - 1}
            className={`${styles.navButton} ${
              currentPage === messages.length - 1 ? styles.disabled : ""
            }`}
          >
            Next
          </button>
        </div>
        {/* Floating elements */}
        <div className={styles.imgParent}>
          <img
            className={styles.topGraphics}
            src="/top-graphics.png"
            alt="Floating elements"
          />
        </div>
        {/* Remove duplicate floating elements section */}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.ramadanInfo}>
            <h3>The Significance of Ramadan</h3>
            <p>
              Ramadan is a blessed month of mercy, reflection, and devotion,
              where hearts are purified, souls are uplifted, and faith is
              strengthened through fasting, prayer, and generosity.
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
    </div>
  );
}
