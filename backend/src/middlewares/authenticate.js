import crypto from 'node:crypto';
import { AUTH_COOKIE_NAME } from '../config/auth.js';
import * as authService from '../services/auth.service.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
}

// 1) lê o JWT do cookie HttpOnly; 2) exige o token CSRF em métodos que alteram dados;
// 3) carrega o usuário atual do banco (o perfil nunca é confiado apenas ao token).
export const authenticate = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.[AUTH_COOKIE_NAME];
  if (!token) throw new AppError('Autenticação necessária.', 401);

  let payload;
  try {
    payload = authService.verifyToken(token);
  } catch {
    throw new AppError('Sessão inválida ou expirada.', 401);
  }

  if (!SAFE_METHODS.has(req.method) && !safeEqual(req.get('x-csrf-token'), payload.csrf)) {
    throw new AppError('Token CSRF inválido ou ausente.', 403);
  }

  const user = await authService.getUserById(payload.sub);
  if (!user) throw new AppError('Sessão inválida ou expirada.', 401);

  req.user = authService.toPublicUser(user);
  req.csrfToken = payload.csrf;
  next();
});
