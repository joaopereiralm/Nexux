import * as learningService from '../services/learning.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const dashboard = asyncHandler(async (req, res) => {
  res.json(await learningService.getDashboard(req.user.id));
});

export const courseContent = asyncHandler(async (req, res) => {
  res.json(await learningService.getCourseContent(req.user.id, req.params.courseId));
});

export const setProgress = asyncHandler(async (req, res) => {
  res.json(
    await learningService.setLessonProgress(req.user.id, req.params.lessonId, req.body.completed),
  );
});
