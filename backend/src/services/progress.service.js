import { prisma } from '../config/prisma.js';

// Progresso do aluno por curso: { totalLessons, completedLessons, percent }.
export async function getProgressByCourse(userId, courseIds) {
  const result = new Map(
    courseIds.map((id) => [id, { totalLessons: 0, completedLessons: 0, percent: 0 }]),
  );
  if (courseIds.length === 0) return result;

  const lessons = await prisma.lesson.findMany({
    where: { module: { courseId: { in: courseIds } } },
    select: { id: true, module: { select: { courseId: true } } },
  });
  const courseByLesson = new Map(lessons.map((l) => [l.id, l.module.courseId]));
  for (const lesson of lessons) result.get(lesson.module.courseId).totalLessons += 1;

  const done = await prisma.lessonProgress.findMany({
    where: { userId, completed: true, lessonId: { in: [...courseByLesson.keys()] } },
    select: { lessonId: true },
  });
  for (const item of done) result.get(courseByLesson.get(item.lessonId)).completedLessons += 1;

  for (const stats of result.values()) {
    stats.percent = stats.totalLessons
      ? Math.round((stats.completedLessons / stats.totalLessons) * 100)
      : 0;
  }
  return result;
}

// Primeira aula (na ordem dos módulos e aulas) ainda não concluída pelo aluno.
export async function findNextLesson(userId, courseId) {
  const modules = await prisma.module.findMany({
    where: { courseId },
    orderBy: { order: 'asc' },
    include: { lessons: { orderBy: { order: 'asc' }, select: { id: true, title: true } } },
  });
  const done = await prisma.lessonProgress.findMany({
    where: { userId, completed: true, lesson: { module: { courseId } } },
    select: { lessonId: true },
  });
  const doneIds = new Set(done.map((p) => p.lessonId));

  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      if (!doneIds.has(lesson.id)) {
        return { courseId, lessonId: lesson.id, lessonTitle: lesson.title, moduleTitle: mod.title };
      }
    }
  }
  return null;
}
