import * as adminService from '../services/admin.service.js';
import * as contentService from '../services/content.service.js';
import * as courseService from '../services/course.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const stats = asyncHandler(async (_req, res) => res.json(await adminService.getStats()));
export const students = asyncHandler(async (_req, res) => res.json(await adminService.listStudents()));
export const enrollments = asyncHandler(async (_req, res) =>
  res.json(await adminService.listEnrollments()),
);

export const listCourses = asyncHandler(async (_req, res) => res.json(await courseService.listAdmin()));
export const getCourse = asyncHandler(async (req, res) =>
  res.json(await courseService.getFull(req.params.id)),
);
export const createCourse = asyncHandler(async (req, res) =>
  res.status(201).json(await courseService.create(req.body)),
);
export const updateCourse = asyncHandler(async (req, res) =>
  res.json(await courseService.update(req.params.id, req.body)),
);
export const deleteCourse = asyncHandler(async (req, res) => {
  await courseService.remove(req.params.id);
  res.status(204).end();
});

export const createModule = asyncHandler(async (req, res) =>
  res.status(201).json(await contentService.createModule(req.params.courseId, req.body)),
);
export const updateModule = asyncHandler(async (req, res) =>
  res.json(await contentService.updateModule(req.params.id, req.body)),
);
export const deleteModule = asyncHandler(async (req, res) => {
  await contentService.removeModule(req.params.id);
  res.status(204).end();
});

export const createLesson = asyncHandler(async (req, res) =>
  res.status(201).json(await contentService.createLesson(req.params.moduleId, req.body)),
);
export const updateLesson = asyncHandler(async (req, res) =>
  res.json(await contentService.updateLesson(req.params.id, req.body)),
);
export const deleteLesson = asyncHandler(async (req, res) => {
  await contentService.removeLesson(req.params.id);
  res.status(204).end();
});
