import { useId } from 'react';
import styles from './ProgressBar.module.css';

export default function ProgressBar({ value, label = 'Progresso' }) {
  const labelId = useId();
  const percent = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span id={labelId} className={styles.label}>{label}</span>
        <span className={styles.value}>{percent}%</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
