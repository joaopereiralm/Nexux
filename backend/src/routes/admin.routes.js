import { Router } from 'express';
import * as admin from '../controllers/admin.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorize } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { courseSchema, lessonSchema, moduleSchema } from '../validators/content.validator.js';

const router = Router();

// Todas as rotas administrativas exigem sessão válida e perfil ADMIN.
router.use(authenticate, authorize('ADMIN'));

router.get('/stats', admin.stats);
router.get('/students', admin.students);
router.get('/enrollments', admin.enrollments);

router.get('/courses', admin.listCourses);
router.get('/courses/:id', admin.getCourse);
router.post('/courses', validate(courseSchema), admin.createCourse);
router.put('/courses/:id', validate(courseSchema), admin.updateCourse);
router.delete('/courses/:id', admin.deleteCourse);

router.post('/courses/:courseId/modules', validate(moduleSchema), admin.createModule);
router.put('/modules/:id', validate(moduleSchema), admin.updateModule);
router.delete('/modules/:id', admin.deleteModule);

router.post('/modules/:moduleId/lessons', validate(lessonSchema), admin.createLesson);
router.put('/lessons/:id', validate(lessonSchema), admin.updateLesson);
router.delete('/lessons/:id', admin.deleteLesson);

export default router;
