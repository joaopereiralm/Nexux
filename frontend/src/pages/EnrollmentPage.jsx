import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/layout/ThemeToggle.jsx';
import { Button, Card, Input } from '../components/ui/index.js';
import { COURSE } from '../data/landing.js';
import { formatCurrency } from '../utils/format.js';
import styles from './EnrollmentPage.module.css';

export default function EnrollmentPage() {
  const [confirmed, setConfirmed] = useState(false);
  const heading = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus();
  }, [confirmed]);

  function submit(event) {
    event.preventDefault();
    setConfirmed(true);
  }

  return (
    <main id="main-content" className={`container ${styles.page}`}>
      <div className={styles.navigation}>
        <Link to="/curso">Voltar ao curso</Link>
        <ThemeToggle />
      </div>
      <Card padding="lg">
        <div className={styles.content}>
          <h1 ref={heading} tabIndex={-1}>
            {confirmed ? 'Simulação concluída' : 'Simular matrícula'}
          </h1>
          <p>{COURSE.title} · {formatCurrency(COURSE.price)} (valor demonstrativo)</p>
          <p>Esta é uma simulação acadêmica. Nenhum valor será cobrado e os dados preenchidos não serão salvos.</p>
          {confirmed ? (
            <Button as={Link} to="/curso">Voltar à página inicial</Button>
          ) : (
            <form className={styles.content} onSubmit={submit} autoComplete="off">
              <p>Use um nome e um e-mail fictícios para testar.</p>
              <Input label="Nome" name="name" required pattern={'.*\\S.*'} title="Informe um nome." maxLength={100} />
              <Input label="E-mail" name="email" type="email" required maxLength={254} />
              <Button type="submit">Confirmar simulação</Button>
            </form>
          )}
        </div>
      </Card>
    </main>
  );
}
