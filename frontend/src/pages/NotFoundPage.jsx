import { Link } from 'react-router-dom';
import { Button } from '../components/ui/index.js';
import Logo from '../components/layout/Logo.jsx';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <main id="main-content" className={`container ${styles.page}`}>
      <Logo />
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe ou foi movido.</p>
      <Button as={Link} to="/">Voltar ao início</Button>
    </main>
  );
}
