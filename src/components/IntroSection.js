import React from 'react';
import styles from "./IntroSection.module.css"; // Import specific styles for this component or reuse the existing ones

const IntroSection = ({ isHomeClicked,isFetchClicked,isClusterClicked,isPredictClicked,isAnalyzeClicked }) => {
  return (
    <>
    <div className={`${styles.intro} ${isFetchClicked ? styles.fade : ''} ${isHomeClicked ? styles.show : ''}`}>
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
