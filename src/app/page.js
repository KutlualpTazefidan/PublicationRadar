"use client";
import { useState } from 'react'; // Import useState hook
import styles from "./page.module.css";
import { Exo } from "next/font/google";
import Nav from '../components/Nav'; 
import IntroSection from '../components/IntroSection'; // Adjust the path as necessary

const exo = Exo({ subsets: ["latin"] });

export default function Home() {
  const [isHomeClicked, setIsHomeClicked] = useState(false); // State to track if 'Fetch' is clicked
  const [isFetchClicked, setIsFetchClicked] = useState(false); // State to track if 'Fetch' is clicked
  const [isClusterClicked, setIsClusterClicked] = useState(false); // State to track if 'Fetch' is clicked
  const [isPredictClicked, setIsPredictClicked] = useState(false); // State to track if 'Fetch' is clicked
  const [isAnalyzeClicked, setIsAnalyzeClicked] = useState(false); // State to track if 'Fetch' is clicked

  // Handler to call when 'Nav' is clicked
  const handleHomeClick = () => {
    setIsHomeClicked(true);
    setIsFetchClicked(false);
    
  };
  const handleFetchClick = () => {
    setIsHomeClicked(false);
    setIsFetchClicked(true);
  };
  const handleClusterClick = () => {
    setIsClusterClicked(true);
  };
  const handlePredictClick = () => {
    setIsPredictClicked(true);
  };
  const handleAnalyzeClick = () => {
    setIsAnalyzeClicked(true);
  };

  return (
    <>
      <Nav onHomeClick={handleHomeClick} onFetchClick={handleFetchClick} onClusterClick={handleClusterClick} onPredictClick={handlePredictClick} onAnalyzeClick={handleAnalyzeClick}/>
      <main className={styles.main}>
        <IntroSection isHomeClicked={isHomeClicked} isFetchClicked={isFetchClicked} isClusterClicked={isClusterClicked} isPredictClicked={isPredictClicked} isAnalyzeClicked={isAnalyzeClicked}/>
      </main>
    </>
  );
}