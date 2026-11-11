import { Link } from 'react-router-dom';
import { Badge, Button, Card, Icon } from '../../components/ui/index.js';
import Section from '../../components/layout/Section.jsx';
import { PLANS } from '../../data/landing.js';
import { formatCurrency } from '../../utils/format.js';
import styles from './Pricing.module.css';

export default function Pricing() {
  return (
    <Section
      id="planos"
      eyebrow="Planos e preços"
      title="Comece de graça, avance quando quiser"
      description="Valores demonstrativos: a matrícula é simulada e nenhuma cobrança real é feita."
    >
      <ul className={styles.grid}>
        {PLANS.map((plan) => (
          <li key={plan.id}>
            <Card className={`${styles.card} ${plan.featured ? styles.featured : ''}`} padding="lg">
              <div className={styles.head}>
                <h3 className={styles.name}>{plan.name}</h3>
                {plan.featured && <Badge tone="success">Mais completo</Badge>}
              </div>
              <p className={styles.description}>{plan.description}</p>
              <p className={styles.price}>
                {plan.price === 0 ? 'Grátis' : formatCurrency(plan.price)}
                {plan.price > 0 && <span className={styles.note}> pagamento único (demonstrativo)</span>}
              </p>
              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className={styles.check}><Icon name="check" size={16} /></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button type="button" disabled fullWidth> Matrícula indisponível no momento </Button>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
