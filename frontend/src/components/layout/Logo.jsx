import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <Link to="/" className={styles.logo} aria-label="NEXUX — página inicial">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
        <rect width="28" height="28" rx="8" fill="var(--accent)" />
        <path
          d="M8.5 20.5v-13l11 13v-13"
          fill="none"
          stroke="var(--on-accent)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>NEXUX</span>
    </Link>
  );
}
