import Link from 'next/link'; // Import if you want to use Next.js Link components for navigation
import styles from './Nav.module.css'; // Assuming you have or will create a separate CSS module for the Nav

function Nav({onHomeClick,onFetchClick,onClusterClick,onPredictionClick,onAnalyzeClick}) {
  return (
    <>
      <div className={styles.logo}>
          Publication Radar
      </div>
      <nav className={styles.glasscard_nav}>
        <ul>
          <li><Link href="/" onClick={onHomeClick}>Home</Link></li>
          <li><Link href="/" onClick={onFetchClick}>Fetch</Link></li>
          <li><Link href="/" onClick={onClusterClick}>Cluster</Link></li>
          <li><Link href="/" onClick={onPredictionClick}>Predict</Link></li>
          <li><Link href="/" onClick={onAnalyzeClick}>Analyze</Link></li>
        </ul>
      </nav>
      </>
  );
}

export default Nav;