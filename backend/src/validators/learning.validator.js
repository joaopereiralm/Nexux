import { z } from 'zod';

export const enrollmentSchema = z.object({
  courseId: z.string({ required_error: 'Informe o curso.' }).trim().min(1, 'Informe o curso.'),
});

export const progressSchema = z.object({
  completed: z.boolean({
    required_error: 'Informe se a aula foi concluída.',
    invalid_type_error: 'O campo "completed" deve ser verdadeiro ou falso.',
  }),
});
