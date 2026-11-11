import Section from '../../components/layout/Section.jsx';
import { FAQS } from '../../data/landing.js';
import styles from './Faq.module.css';

// <details>/<summary> nativos: acessíveis por teclado e leitores de tela sem JavaScript extra.
export default function Faq() {
  return (
    <Section id="faq" alt eyebrow="FAQ" title="Perguntas frequentes">
      <div className={styles.list}>
        {FAQS.map((item) => (
          <details key={item.q} className={styles.item}>
            <summary className={styles.question}>{item.q}</summary>
            <p className={styles.answer}>{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
