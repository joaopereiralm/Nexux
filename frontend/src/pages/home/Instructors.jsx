import { Badge, Card, Icon } from '../../components/ui/index.js';
import Section from '../../components/layout/Section.jsx';
import { INSTRUCTORS } from '../../data/landing.js';
import styles from './Instructors.module.css';

export default function Instructors() {
  return (
    <Section
      id="instrutores"
      eyebrow="Instrutoria"
      title="Conheça as áreas de ensino"
      description="Perfis demonstrativos, criados para ilustrar como a equipe de instrutores será apresentada."
    >
      <ul className={styles.grid}>
        {INSTRUCTORS.map((item) => (
          <li key={item.area}>
            <Card className={styles.card}>
              <span className={styles.avatar}><Icon name={item.icon} size={28} /></span>
              <h3 className={styles.title}>{item.area}</h3>
              <Badge>Perfil demonstrativo</Badge>
              <p className={styles.text}>{item.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
