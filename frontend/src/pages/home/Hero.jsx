import { Link } from 'react-router-dom';
import { Badge, Button } from '../../components/ui/index.js';
import { MODULES } from '../../data/landing.js';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <Badge tone="success">Projeto acadêmico · matrícula simulada</Badge>
          <h1 id="hero-title" className={styles.title}>
            Aprenda UX/UI Design <span className={styles.highlight}>do zero ao projeto</span>
          </h1>
          <p className={styles.lead}>
            Um curso online completo, com {MODULES.length} módulos que vão da pesquisa com usuários à
            prototipagem no Figma, terminando em um projeto final para o seu portfólio.
          </p>
          <div className={styles.actions}>
            <Button as="a" href="#login" size="lg"> Entrar como aluno </Button>
            <Button as="a" href="#conteudo" variant="secondary" size="lg">Ver conteúdo</Button>
          </div>
        </div>

        {/* Ilustração decorativa feita em CSS (wireframe de uma interface) */}
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.window}>
            <div className={styles.windowBar}><span /><span /><span /></div>
            <div className={styles.screen}>
              <div className={styles.sidebar}>
                <span /><span /><span /><span />
              </div>
              <div className={styles.canvas}>
                <div className={styles.banner} />
                <div className={styles.cards}>
                  <div /><div /><div />
                </div>
                <div className={styles.lines}><span /><span /></div>
              </div>
            </div>
          </div>
          <div className={styles.floating}>
            <span className={styles.dot} />
            <div className={styles.floatLines}><span /><span /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
