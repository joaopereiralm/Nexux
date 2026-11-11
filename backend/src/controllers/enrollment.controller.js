import * as enrollmentService from '../services/enrollment.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// O userId vem SEMPRE da sessão (req.user), nunca do corpo ou da URL.
export const create = asyncHandler(async (req, res) => {
  const enrollment = await enrollmentService.enroll(req.user.id, req.body.courseId);
  res.status(201).json(enrollment);
});

export const listMine = asyncHandler(async (req, res) => {
  res.json(await enrollmentService.listMine(req.user.id));
});
