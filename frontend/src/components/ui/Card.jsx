import styles from './Card.module.css';

export default function Card({ as: Component = 'div', padding = 'md', className = '', children, ...props }) {
  return (
    <Component {...props} className={`${styles.card} ${styles[padding]} ${className}`}>
      {children}
    </Component>
  );
}
