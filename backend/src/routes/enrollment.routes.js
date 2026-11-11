import { Router } from 'express';
import * as enrollmentController from '../controllers/enrollment.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validate } from '../middlewares/validate.js';
import { enrollmentSchema } from '../validators/learning.validator.js';

const router = Router();

router.use(authenticate);
router.post('/', validate(enrollmentSchema), enrollmentController.create);
router.get('/me', enrollmentController.listMine);

export default router;
