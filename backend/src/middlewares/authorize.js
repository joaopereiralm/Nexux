import { AppError } from '../utils/AppError.js';

// Uso: router.use(authenticate, authorize('ADMIN'))
export const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!req.user) return next(new AppError('Autenticação necessária.', 401));
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Você não tem permissão para acessar este recurso.', 403));
    }
    return next();
  };
