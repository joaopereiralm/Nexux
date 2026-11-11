import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Input } from '../../components/ui/index.js';
import { api } from '../services/api.js';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData(event.currentTarget);
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      setLoading(true);

      const { data } = await api.post('/auth/login', credentials);

      // O backend cria a sessão no cookie HttpOnly.
      // O token CSRF será necessário para futuras requisições que alterem dados.
      sessionStorage.setItem('nexux.csrfToken', data.csrfToken);

      setSuccess(`Bem-vindo, ${data.user.name}!`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Não foi possível entrar. Confira seu e-mail e senha e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <Link className={styles.backLink} to="/">
          ← Voltar ao início
        </Link>

        <p className={styles.eyebrow}>NEXUX · Área do aluno</p>
        <h1 id="login-title">Acesse sua conta</h1>
        <p className={styles.description}>
          Entre para continuar seus estudos em UX/UI Design.
        </p>

        {error && <Alert variant="error" title="Não foi possível entrar">{error}</Alert>}
        {success && <Alert variant="success" title="Login realizado">{success}</Alert>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            required
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />

          <Button type="submit" fullWidth loading={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>

        <div className={styles.registerNote}>
          <span>Não tem uma conta?</span>
          <Button type="button" variant="secondary" disabled>
            Cadastrar
          </Button>
          <small>Indisponível no momento</small>
        </div>
      </section>
    </main>
  );
}