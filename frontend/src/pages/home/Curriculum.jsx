import { Card } from '../../components/ui/index.js';
import Section from '../../components/layout/Section.jsx';
import { MODULES } from '../../data/landing.js';
import styles from './Curriculum.module.css';

export default function Curriculum() {
  return (
    <Section
      id="conteudo"
      alt
      eyebrow="Conteúdo programático"
      title="UX/UI Design — Do Zero ao Projeto"
      description={`${MODULES.length} módulos em uma trilha completa: pesquisa, estrutura, interface, prototipagem e validação.`}
    >
      <ol className={styles.list}>
        {MODULES.map((module, index) => (
          <li key={module.title}>
            <Card as="article" className={styles.card}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className={styles.title}>
                  <span className="visually-hidden">Módulo {index + 1}: </span>
                  {module.title}
                </h3>
                <p className={styles.text}>{module.text}</p>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
