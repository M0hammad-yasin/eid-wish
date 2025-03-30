"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaStar } from "react-icons/fa";
import styles from "./page.module.css";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Messages content
  const messages = [
    {
      title: "Ramadan Reflections",
      content:
        "As the blessed month of Ramadan comes to a close, we reflect on the patience, prayers, and spiritual growth we've experienced. May Allah accept our fasts, our prayers, and all our good deeds.",
      background: "ramadan-bg",
    },
    {
      title: "Eid Mubarak",
      content:
        "May the joy and blessings of Eid fill your heart and home. As we celebrate this special day, let us remember those less fortunate and share our happiness with them. Eid Mubarak to you and your loved ones!",
      background: "eid-bg",
    },
    {
      title: "Honoring Women",
      content:
        "On this blessed Eid, we extend our deepest appreciation to the mothers, sisters, daughters, and wives who have shown tireless dedication throughout Ramadan. Your sacrifices in preparing suhoor and iftar, your patience, and your spiritual guidance have made this month truly special for all of us.",
      background: "women-bg",
    },
  ];

  const nextPage = () => {
    if (currentPage < messages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
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
    <main
      className={`${styles.main} ${styles[messages[currentPage].background]}`}
    >
      {/* Floating elements */}
      <div className={styles.floatingElements}>
        <div className={styles.moon}>
          <FaMoon size={60} color="gold" />
        </div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 1 + 0.5}rem`,
            }}
          >
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
          <p>{messages[currentPage].content}</p>
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
          Next Message
        </button>
      </div>
    </main>
  );
}
