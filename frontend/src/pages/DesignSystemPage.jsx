import { useState } from 'react';
import { Alert, Badge, Button, Card, Input, ProgressBar, Spinner } from '../components/ui/index.js';
import Logo from '../components/layout/Logo.jsx';
import ThemeToggle from '../components/layout/ThemeToggle.jsx';
import styles from './DesignSystemPage.module.css';

const SWATCHES = [
  { name: 'Fundo', token: '--bg' },
  { name: 'Superfície', token: '--surface' },
  { name: 'Superfície elevada', token: '--surface-raised' },
  { name: 'Borda', token: '--border' },
  { name: 'Verde principal', token: '--accent' },
  { name: 'Verde (texto)', token: '--accent-text' },
  { name: 'Texto', token: '--text' },
  { name: 'Texto suave', token: '--text-muted' },
  { name: 'Erro', token: '--danger' },
];

function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [loading, setLoading] = useState(false);

  function simulateLoading() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  }

  return (
    <>
      <header className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <Logo />
          <ThemeToggle />
        </div>
      </header>

      <main id="main-content" className={`container ${styles.main}`}>
        <div>
          <Badge tone="success">Etapa 6</Badge>
          <h1 className={styles.title}>Design system</h1>
          <p className={styles.lead}>
            Tokens, tipografia e componentes base do NEXUX. Alterne o tema pelo botão no topo; a escolha é
            salva neste navegador.
          </p>
        </div>

        <Section title="Cores">
          <ul className={styles.swatches}>
            {SWATCHES.map(({ name, token }) => (
              <li key={token} className={styles.swatch}>
                <span className={styles.chip} style={{ background: `var(${token})` }} aria-hidden="true" />
                <span>{name}</span>
                <code>{token}</code>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Tipografia">
          <Card className={styles.stack}>
            <h1 className={styles.sample}>Título 1 — Space Grotesk</h1>
            <h2 className={styles.sample}>Título 2</h2>
            <h3>Título 3</h3>
            <h4>Título 4</h4>
            <p>
              Texto de corpo em Inter, 16px, com altura de linha confortável para leitura. Links usam o{' '}
              <a href="#main-content">verde do tema</a> e sempre têm sublinhado.
            </p>
            <p className={styles.muted}>Texto secundário, para descrições e metadados.</p>
          </Card>
        </Section>

        <Section title="Botões">
          <div className={styles.row}>
            <Button>Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Excluir</Button>
            <Button disabled>Desabilitado</Button>
            <Button loading={loading} onClick={simulateLoading}>
              {loading ? 'Salvando…' : 'Testar carregamento'}
            </Button>
          </div>
          <div className={styles.row}>
            <Button size="sm">Pequeno</Button>
            <Button size="md">Médio</Button>
            <Button size="lg">Grande</Button>
          </div>
        </Section>

        <Section title="Campos de formulário">
          <Card className={styles.form}>
            <Input label="Nome" name="name" placeholder="Seu nome completo" required />
            <Input
              label="Senha"
              name="password"
              type="password"
              hint="Mínimo de 8 caracteres, com letras e números."
              required
            />
            <Input
              label="E-mail"
              name="email"
              type="email"
              defaultValue="aluno@exemplo"
              error="Informe um e-mail válido."
              required
            />
          </Card>
        </Section>

        <Section title="Feedback">
          <div className={styles.stack}>
            <Alert variant="success" title="Matrícula confirmada">Você já pode acessar o curso.</Alert>
            <Alert variant="error" title="Não foi possível entrar">E-mail ou senha inválidos.</Alert>
            <Alert variant="info">Dados demonstrativos, usados apenas para fins acadêmicos.</Alert>
            <div className={styles.row}>
              <Badge>Neutro</Badge>
              <Badge tone="success">Concluído</Badge>
              <Badge tone="danger">Cancelado</Badge>
              <Spinner label="Carregando conteúdo" />
            </div>
          </div>
        </Section>

        <Section title="Progresso">
          <Card className={styles.stack}>
            <ProgressBar label="Progresso no curso" value={35} />
            <ProgressBar label="Módulo concluído" value={100} />
          </Card>
        </Section>
      </main>
    </>
  );
}
