import { Alert, Card } from '../../components/ui/index.js';
import Section from '../../components/layout/Section.jsx';
import { TESTIMONIALS } from '../../data/landing.js';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <Section id="depoimentos" alt eyebrow="Depoimentos" title="O que os alunos podem esperar">
      <div className={styles.notice}>
        <Alert variant="info" title="Conteúdo ilustrativo">
          Estes depoimentos foram escritos para demonstrar o layout da página. Não representam alunos reais.
        </Alert>
      </div>
      <ul className={styles.grid}>
        {TESTIMONIALS.map((item) => (
          <li key={item.quote}>
            <Card as="figure" className={styles.card}>
              <blockquote className={styles.quote}>“{item.quote}”</blockquote>
              <figcaption className={styles.caption}>Aluno(a) ilustrativo(a)</figcaption>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
