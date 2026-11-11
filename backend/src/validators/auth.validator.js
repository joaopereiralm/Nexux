import { z } from 'zod';

const email = z
  .string({ required_error: 'Informe o e-mail.' })
  .trim()
  .toLowerCase()
  .email('Informe um e-mail válido.')
  .max(254, 'E-mail muito longo.');

const strongPassword = z
  .string({ required_error: 'Informe a senha.' })
  .min(8, 'A senha deve ter ao menos 8 caracteres.')
  .regex(/[A-Za-z]/, 'A senha deve conter ao menos uma letra.')
  .regex(/\d/, 'A senha deve conter ao menos um número.')
  // bcrypt só considera os primeiros 72 bytes da senha.
  .refine((v) => Buffer.byteLength(v, 'utf8') <= 72, 'A senha é longa demais (máximo de 72 bytes).');

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: 'Informe o nome.' })
      .trim()
      .min(2, 'O nome deve ter ao menos 2 caracteres.')
      .max(100, 'O nome deve ter no máximo 100 caracteres.'),
    email,
    password: strongPassword,
    confirmPassword: z.string({ required_error: 'Confirme a senha.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não conferem.',
  });

export const loginSchema = z.object({
  email,
  password: z.string({ required_error: 'Informe a senha.' }).min(1, 'Informe a senha.'),
});
