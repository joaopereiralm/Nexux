import { Router } from 'express';
import * as courseController from '../controllers/course.controller.js';

const router = Router();

// Públicas: catálogo e página do curso (sem URLs de vídeo).
router.get('/', courseController.list);
router.get('/:id', courseController.getById);

export default router;
