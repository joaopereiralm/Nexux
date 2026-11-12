import { useState } from 'react';
import { Alert, Button, Card, Input } from '../ui/index.js';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase.js';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!supabase) {
      setError('O serviço de login não está configurado.');
      return;
    }

    const formData = new FormData(event.currentTarget);

    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword(credentials);
      if (error) {
        setError('Confira seu e-mail e senha e tente novamente.');
        return;
      }
      navigate('/curso', { replace: true });
    } catch {
      setError('Não foi possível conectar ao serviço de login.');
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

        <p className={styles.demoNote}>
          Use a conta de teste da apresentação. <Link to="/curso">Conhecer o curso</Link>
        </p>
      </Card>
    </section>
  );
}
