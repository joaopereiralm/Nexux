import { AUTH_COOKIE_NAME, cookieOptions } from '../config/auth.js';
import * as authService from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function startSession(res, { token, expiresAt }) {
  res.cookie(AUTH_COOKIE_NAME, token, { ...cookieOptions, maxAge: expiresAt - Date.now() });
}

export const register = asyncHandler(async (req, res) => {
  const session = await authService.register(req.body);
  startSession(res, session);
  res.status(201).json({ user: session.user, csrfToken: session.csrfToken });
});

export const login = asyncHandler(async (req, res) => {
  const session = await authService.login(req.body);
  startSession(res, session);
  res.json({ user: session.user, csrfToken: session.csrfToken });
});

export const logout = (_req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, cookieOptions);
  res.status(204).end();
};

// Também devolve o csrfToken, para o front recuperá-lo ao recarregar a página.
export const me = (req, res) => {
  res.json({ user: req.user, csrfToken: req.csrfToken });
};
