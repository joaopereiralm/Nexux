import styles from './Alert.module.css';

// Erros usam role="alert" (anunciado de imediato); os demais usam role="status".
export default function Alert({ variant = 'info', title, children }) {
  return (
    <div className={`${styles.alert} ${styles[variant]}`} role={variant === 'error' ? 'alert' : 'status'}>
      {title && <strong className={styles.title}>{title}</strong>}
      <div>{children}</div>
    </div>
  );
}
