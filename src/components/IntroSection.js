import React, { useState, useEffect } from 'react';
import styles from "./IntroSection.module.css";

const IntroSection = ({ isHomeClicked, isFetchClicked }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // When "Fetch" is clicked, start the fade-out process.
    if (isFetchClicked) {
      setIsVisible(false);
    }
  }, [isFetchClicked]);

  useEffect(() => {
    // When "Home" is clicked and content is not visible, make it visible again.
    if (isHomeClicked && !isVisible) {
      setIsVisible(true);
    }
  }, [isHomeClicked, isVisible]);

  return (
    <>
      <div
        className={`${styles.intro} ${!isVisible ? styles.fade : styles.show}`}
        onAnimationEnd={() => {
          // After fade-out animation ends, check if we need to keep it hidden or show it again (in case "Home" was clicked during the fade-out).
          if (!isVisible && !isHomeClicked) {
            setIsVisible(false);
          } else if (!isVisible && isHomeClicked) {
            setIsVisible(true);
          }
        }}
      >
        <div className={styles.intro_text}>
          <header className={styles.page_title}>Trends in Scientific Research</header>
          <span>Predicting the Evolution of Key Research Domains</span>
        </div>
        <div>
          <span>Our Services:</span>
          <ul>
            <li>Publication Metadata Retrieval</li>
            <li>Scientific Topic Clustering</li>
            <li>Trend Prediction</li>
            <li>Publication Analysis</li>
          </ul>
        </div>
      </div>
      <div className={styles.logo}>
          Publication Radar
      </div>
    </>
  );
};

export default IntroSection;
