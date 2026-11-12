import { useState } from 'react';
import { Alert, Button, Card, Input } from '../ui/index.js';
import { api } from '../../services/api.js';
import styles from './LoginForm.module.css';

export default function LoginForm() {
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

      // A sessão fica no cookie HttpOnly.
      // Guardamos apenas o token CSRF para futuras requisições protegidas.
      sessionStorage.setItem('nexux.csrfToken', data.csrfToken);

      setSuccess(`Acesso confirmado. Bem-vindo, ${data.user.name}!`);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          'Não foi possível entrar. Confira seu e-mail e senha.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="login"
      className={styles.section}
      aria-labelledby="login-title"
    >
      <Card className={styles.card} padding="lg">
        <p className={styles.eyebrow}>Área do aluno</p>
        <h2 id="login-title">Acesse sua conta</h2>
        <p className={styles.description}>
          Entre para continuar seus estudos em UX/UI Design.
        </p>

        {error && (
          <Alert variant="error" title="Não foi possível entrar">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" title="Login realizado">
            {success}
          </Alert>
        )}

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

          <div className={styles.forgotArea}>
            <button
              className={styles.forgotButton}
              type="button"
              disabled
              aria-describedby="forgot-password-status"
            >
              Esqueci a senha
            </button>
            <span id="forgot-password-status" className={styles.unavailable}>
              Indisponível no momento
            </span>
          </div>

          <Button type="submit" fullWidth loading={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </Button>
        </form>

        <p className={styles.demoNote}>
          Use a conta de demonstração fornecida para a apresentação.
        </p>
      </Card>
    </section>
  );
}
