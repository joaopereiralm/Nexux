import styles from './Spinner.module.css';

export default function Spinner({ size = 'md', label = 'Carregando' }) {
  return (
    <span role="status" className={styles.wrapper}>
      <span className={`${styles.spinner} ${styles[size]}`} aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </span>
  );
}
