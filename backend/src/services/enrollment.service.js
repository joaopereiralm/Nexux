import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';
import { toCourseDto } from '../utils/serializers.js';
import { getProgressByCourse } from './progress.service.js';

// Matrícula simulada (sem pagamento real): apenas registra no banco.
export async function enroll(userId, courseId) {
  const course = await prisma.course.findUnique({ where: { id: courseId }, select: { id: true } });
  if (!course) throw new AppError('Curso não encontrado.', 404);

  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  if (existing && existing.status !== 'CANCELED') {
    throw new AppError('Você já está matriculado neste curso.', 409);
  }
  // Matrícula cancelada anteriormente é reativada (a restrição única impede duplicar).
  if (existing) {
    return prisma.enrollment.update({ where: { id: existing.id }, data: { status: 'ACTIVE' } });
  }
  return prisma.enrollment.create({ data: { userId, courseId } });
}

export async function listMine(userId) {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId, status: { not: 'CANCELED' } },
    orderBy: { createdAt: 'desc' },
    include: { course: true },
  });
  const progress = await getProgressByCourse(userId, enrollments.map((e) => e.courseId));

  return enrollments.map((e) => ({
    id: e.id,
    status: e.status,
    createdAt: e.createdAt,
    course: toCourseDto(e.course),
    progress: progress.get(e.courseId),
  }));
}
