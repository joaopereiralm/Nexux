import { NAV_LINKS } from '../../data/landing.js';
import Logo from './Logo.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.text}>
            Plataforma de ensino online de UX/UI Design. Projeto acadêmico: conteúdos, perfis,
            depoimentos e valores são demonstrativos.
          </p>
        </div>

        <nav aria-label="Rodapé: plataforma">
          <h2 className={styles.heading}>Plataforma</h2>
          <ul className={styles.list}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </nav>

      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} NEXUX. Projeto acadêmico.</p>
      </div>
    </footer>
  );
}
