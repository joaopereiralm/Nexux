import { Card, Icon } from '../../components/ui/index.js';
import Section from '../../components/layout/Section.jsx';
import { BENEFITS } from '../../data/landing.js';
import styles from './Benefits.module.css';

export default function Benefits() {
  return (
    <Section
      id="beneficios"
      eyebrow="Por que o NEXUX"
      title="Tudo o que você precisa para aprender com clareza"
      description="Uma plataforma pensada para quem quer sair do zero e chegar a um projeto real de UX/UI."
    >
      <ul className={styles.grid}>
        {BENEFITS.map((item) => (
          <li key={item.title}>
            <Card className={styles.card}>
              <span className={styles.icon}><Icon name={item.icon} size={22} /></span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
