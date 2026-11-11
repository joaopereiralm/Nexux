import { Router } from 'express';
import * as learningController from '../controllers/learning.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validate } from '../middlewares/validate.js';
import { progressSchema } from '../validators/learning.validator.js';

const router = Router();

// Área do aluno: todos os dados são filtrados pelo usuário da sessão.
router.use(authenticate);
router.get('/dashboard', learningController.dashboard);
router.get('/courses/:courseId', learningController.courseContent);
router.put('/lessons/:lessonId/progress', validate(progressSchema), learningController.setProgress);

export default router;
