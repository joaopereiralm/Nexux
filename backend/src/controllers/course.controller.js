import * as courseService from '../services/course.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (_req, res) => {
  res.json(await courseService.listPublic());
});

export const getById = asyncHandler(async (req, res) => {
  res.json(await courseService.getPublic(req.params.id));
});
