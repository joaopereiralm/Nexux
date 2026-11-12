import { Link } from 'react-router-dom';
import { Button, Card } from '../../components/ui/index.js';
import Section from '../../components/layout/Section.jsx';
import { COURSE } from '../../data/landing.js';
import { formatCurrency } from '../../utils/format.js';
import styles from './Pricing.module.css';

export default function Pricing() {
  return (
    <Section id="planos" title="Preço do curso" description="Valor demonstrativo. A matrícula é simulada, sem cobrança.">
      <Card className={styles.card} padding="lg">
        <h3 className={styles.name}>{COURSE.title}</h3>
        <p className={styles.price}>{formatCurrency(COURSE.price)}</p>
        <p className={styles.description}>Oito módulos, da pesquisa com usuários ao projeto final de portfólio.</p>
        <Button as={Link} to="/matricula">Simular matrícula</Button>
      </Card>
    </Section>
  );
}
