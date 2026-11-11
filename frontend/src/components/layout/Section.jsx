import styles from './Section.module.css';

// Seção de página com título associado (aria-labelledby) e cabeçalho padronizado.
export default function Section({ id, eyebrow, title, description, alt = false, children }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${alt ? styles.alt : ''}`}>
      <div className="container">
        <header className={styles.header}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 id={headingId}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
