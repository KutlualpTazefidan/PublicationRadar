import React, { useState, useEffect } from 'react';
import styles from "./IntroSection.module.css";

const IntroSection = () => {
  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   // When "Fetch" is clicked, start the fade-out process.
  //   if (isFetchClicked) {
  //     setIsVisible(false);
  //   }
  // }, [isFetchClicked]);

  // useEffect(() => {
  //   // When "Home" is clicked and content is not visible, make it visible again.
  //   if (isHomeClicked && !isVisible) {
  //     setIsVisible(true);
  //   }
  // }, [isHomeClicked, isVisible]);

  return (
    <>
      <div className={styles.intro}>
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
    </>
  );
};

export default IntroSection;
