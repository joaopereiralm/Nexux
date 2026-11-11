import { env } from './env.js';

export const AUTH_COOKIE_NAME = 'nexux_token';
export const BCRYPT_ROUNDS = 12;

// HttpOnly: o JavaScript do navegador não lê o token (protege contra XSS).
// Secure: obrigatório em produção e quando SameSite=None.
export const cookieOptions = {
  httpOnly: true,
  secure: env.isProduction || env.COOKIE_SAMESITE === 'none',
  sameSite: env.COOKIE_SAMESITE,
  path: '/',
};
