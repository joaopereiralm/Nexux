import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../data/landing.js';
import { Button, Icon } from '../ui/index.js';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const menuButtonRef = useRef(null);

  // Esc fecha o menu móvel e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        <nav id={panelId} className={styles.panel} data-open={open} aria-label="Principal">
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button as={Link} to="/login" variant="secondary" size="sm" onClick={closeMenu}>
               Entrar
            </Button>
            <div className={styles.registerAction}>
            <Button
              type="button"
              size="sm"
              disabled
              aria-describedby="register-status"
            >
              Cadastrar
            </Button>
            <small id="register-status">Indisponível no momento</small>
          </div>
          </div>
        </nav>

        <div className={styles.controls}>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
