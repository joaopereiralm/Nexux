import { z } from 'zod';

const httpUrl = z
  .string({ invalid_type_error: 'Informe uma URL válida.' })
  .trim()
  .url('Informe uma URL válida.')
  .max(2048, 'URL muito longa.')
  // Bloqueia esquemas perigosos (javascript:, data:, etc.).
  .refine((u) => /^https?:\/\//i.test(u), 'A URL deve começar com http:// ou https://.');

const optionalText = (max) =>
  z
    .string()
    .trim()
    .max(max, `Use no máximo ${max} caracteres.`)
    .nullish()
    .transform((v) => v || null);

const optionalOrder = z
  .number({ invalid_type_error: 'A ordem deve ser um número.' })
  .int('A ordem deve ser um número inteiro.')
  .min(1, 'A ordem deve ser maior que zero.')
  .optional();

export const courseSchema = z.object({
  title: z
    .string({ required_error: 'Informe o título.' })
    .trim()
    .min(3, 'O título deve ter ao menos 3 caracteres.')
    .max(150, 'O título deve ter no máximo 150 caracteres.'),
  description: z
    .string({ required_error: 'Informe a descrição.' })
    .trim()
    .min(10, 'A descrição deve ter ao menos 10 caracteres.')
    .max(5000, 'A descrição deve ter no máximo 5000 caracteres.'),
  thumbnail: z
    .preprocess((v) => (v === '' ? null : v), httpUrl.nullish())
    .transform((v) => v || null),
  price: z
    .number({ required_error: 'Informe o preço.', invalid_type_error: 'O preço deve ser um número.' })
    .min(0, 'O preço não pode ser negativo.')
    .max(1000000, 'Preço acima do limite permitido.')
    .transform((v) => Math.round(v * 100) / 100),
  workload: z
    .number({ required_error: 'Informe a carga horária.', invalid_type_error: 'A carga horária deve ser um número.' })
    .int('A carga horária deve ser um número inteiro (horas).')
    .min(1, 'A carga horária deve ser de ao menos 1 hora.')
    .max(10000, 'Carga horária acima do limite permitido.'),
});

export const moduleSchema = z.object({
  title: z
    .string({ required_error: 'Informe o título.' })
    .trim()
    .min(2, 'O título deve ter ao menos 2 caracteres.')
    .max(150, 'O título deve ter no máximo 150 caracteres.'),
  description: optionalText(1000),
  order: optionalOrder,
});

export const lessonSchema = z.object({
  title: z
    .string({ required_error: 'Informe o título.' })
    .trim()
    .min(2, 'O título deve ter ao menos 2 caracteres.')
    .max(150, 'O título deve ter no máximo 150 caracteres.'),
  description: optionalText(2000),
  videoUrl: httpUrl,
  // Duração em segundos.
  duration: z
    .number({ required_error: 'Informe a duração.', invalid_type_error: 'A duração deve ser um número.' })
    .int('A duração deve ser um número inteiro (segundos).')
    .min(1, 'A duração deve ser de ao menos 1 segundo.')
    .max(86400, 'Duração acima do limite permitido.'),
  order: optionalOrder,
});
