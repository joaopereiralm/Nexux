import { prisma } from '../config/prisma.js';

const LIST_LIMIT = 200;

export async function listStudents() {
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    orderBy: { createdAt: 'desc' },
    take: LIST_LIMIT,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      _count: { select: { enrollments: true } },
    },
  });
  return students.map(({ _count, ...student }) => ({ ...student, enrollmentCount: _count.enrollments }));
}

export function listEnrollments() {
  return prisma.enrollment.findMany({
    orderBy: { createdAt: 'desc' },
    take: LIST_LIMIT,
    select: {
      id: true,
      status: true,
      createdAt: true,
      user: { select: { id: true, name: true, email: true } },
      course: { select: { id: true, title: true } },
    },
  });
}

export async function getStats() {
  const [students, courses, modules, lessons, enrollments, completedLessons] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.course.count(),
    prisma.module.count(),
    prisma.lesson.count(),
    prisma.enrollment.count(),
    prisma.lessonProgress.count({ where: { completed: true } }),
  ]);
  return { students, courses, modules, lessons, enrollments, completedLessons };
}
