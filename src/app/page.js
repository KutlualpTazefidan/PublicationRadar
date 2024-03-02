"use client";
import { useState } from 'react'; // Import useState hook
import styles from "./page.module.css";
import { Exo } from "next/font/google";
import Nav from '../components/Nav'; 
import IntroSection from '../components/IntroSection'; // Adjust the path as necessary
import FetchSection from '../components/FetchSection'; // Adjust the path as necessary
import ClusterSection from '../components/ClusterSection'; // Adjust the path as necessary
import { useTransition, animated } from 'react-spring';

const exo = Exo({ subsets: ["latin"] });

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = {
    home: <IntroSection />,
    fetch: <FetchSection />,
    cluster: <ClusterSection />,
    // Add more sections as needed
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const transitions = useTransition(activeSection, {
    from: (item) => ({
      width: "100%",
      opacity: 0,
      transform: 'translate3d(' + (item === 'home' ? '-100%' : '100%') + ',0,0)',
    }),
    enter: { width: "100%", opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: (item) => ({
      width: "100%",
      opacity: 0,
      transform: 'translate3d(' + (item === 'home' ? '100%' : '-100%') + ',0,0)',
    }),
    keys: activeSection,
  });


  return (
    <>
      <Nav onHomeClick={() => handleNavClick('home')} onFetchClick={() => handleNavClick('fetch')} onClusterClick={() => handleNavClick('cluster')} />
      <main className={styles.main}>
        {transitions((style, item) => (
            <animated.div style={style}>
              {sections[item]}
            </animated.div>
          ))}
      </main>
    </>
  );
}