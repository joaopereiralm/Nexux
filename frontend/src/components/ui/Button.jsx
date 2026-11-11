import Spinner from './Spinner.jsx';
import styles from './Button.module.css';

// `as` permite renderizar como link: <Button as={Link} to="/login">Entrar</Button>
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const buttonProps =
    Component === 'button'
      ? { type: props.type ?? 'button', disabled: props.disabled || loading }
      : {};

  return (
    <Component {...props} {...buttonProps} className={classes} aria-busy={loading || undefined}>
      {loading && <Spinner size="sm" label="Carregando" />}
      {children}
    </Component>
  );
}
