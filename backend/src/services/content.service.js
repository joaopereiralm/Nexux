import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';

// ---- Módulos ----

export async function createModule(courseId, { title, description, order }) {
  const course = await prisma.course.findUnique({ where: { id: courseId }, select: { id: true } });
  if (!course) throw new AppError('Curso não encontrado.', 404);

  const { _max } = await prisma.module.aggregate({ where: { courseId }, _max: { order: true } });
  return prisma.module.create({
    data: { courseId, title, description, order: order ?? (_max.order ?? 0) + 1 },
  });
}

export function updateModule(id, { title, description, order }) {
  return prisma.module.update({ where: { id }, data: { title, description, order } });
}

// Exclui também as aulas e os progressos ligados ao módulo (cascata).
export async function removeModule(id) {
  await prisma.module.delete({ where: { id } });
}

// ---- Aulas ----

export async function createLesson(moduleId, { title, description, videoUrl, duration, order }) {
  const mod = await prisma.module.findUnique({ where: { id: moduleId }, select: { id: true } });
  if (!mod) throw new AppError('Módulo não encontrado.', 404);

  const { _max } = await prisma.lesson.aggregate({ where: { moduleId }, _max: { order: true } });
  return prisma.lesson.create({
    data: { moduleId, title, description, videoUrl, duration, order: order ?? (_max.order ?? 0) + 1 },
  });
}

export function updateLesson(id, { title, description, videoUrl, duration, order }) {
  return prisma.lesson.update({
    where: { id },
    data: { title, description, videoUrl, duration, order },
  });
}

export async function removeLesson(id) {
  await prisma.lesson.delete({ where: { id } });
}
