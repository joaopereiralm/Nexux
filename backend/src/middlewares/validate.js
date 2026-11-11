// Valida e normaliza req.body com um schema Zod. Campos fora do schema são descartados.
export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return next(result.error);
  req.body = result.data;
  return next();
};
