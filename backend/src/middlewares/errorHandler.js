import { ZodError } from 'zod';
import { env } from '../config/env.js';

export function notFound(_req, res) {
  res.status(404).json({ message: 'Rota não encontrada.' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    const errors = {};
    for (const issue of err.issues) {
      const key = issue.path.join('.') || '_';
      (errors[key] ??= []).push(issue.message);
    }
    return res.status(400).json({ message: 'Dados inválidos.', errors });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'JSON inválido na requisição.' });
  }

  // Erros conhecidos do Prisma.
  if (err.code === 'P2002') {
    return res.status(409).json({ message: 'Registro já existente.' });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ message: 'Registro não encontrado.' });
  }
  if (err.code === 'P2003') {
    return res.status(409).json({ message: 'Operação bloqueada: existem registros vinculados.' });
  }

  const status = err.status ?? 500;
  if (status >= 500) console.error(err);

  return res.status(status).json({
    message: status >= 500 && env.isProduction ? 'Erro interno do servidor.' : err.message,
  });
}
