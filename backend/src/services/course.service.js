import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';
import { toCourseDto } from '../utils/serializers.js';

// Na área pública a URL do vídeo NÃO é exposta: só quem está matriculado a recebe.
const PUBLIC_LESSON_FIELDS = { id: true, title: true, description: true, duration: true, order: true };

const withModules = (lessons) => ({
  modules: { orderBy: { order: 'asc' }, include: { lessons } },
});

export async function listPublic() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'asc' },
    include: { modules: { select: { _count: { select: { lessons: true } } } } },
  });
  return courses.map((course) => ({
    ...toCourseDto(course),
    moduleCount: course.modules.length,
    lessonCount: course.modules.reduce((sum, m) => sum + m._count.lessons, 0),
  }));
}

export async function getPublic(id) {
  const course = await prisma.course.findUnique({
    where: { id },
    include: withModules({ orderBy: { order: 'asc' }, select: PUBLIC_LESSON_FIELDS }),
  });
  if (!course) throw new AppError('Curso não encontrado.', 404);
  return { ...toCourseDto(course), modules: course.modules };
}

// ---- Administração ----

export async function listAdmin() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { modules: true, enrollments: true } } },
  });
  return courses.map((course) => ({
    ...toCourseDto(course),
    moduleCount: course._count.modules,
    enrollmentCount: course._count.enrollments,
  }));
}

export async function getFull(id) {
  const course = await prisma.course.findUnique({
    where: { id },
    include: withModules({ orderBy: { order: 'asc' } }),
  });
  if (!course) throw new AppError('Curso não encontrado.', 404);
  return { ...toCourseDto(course), modules: course.modules };
}

export async function create(data) {
  return toCourseDto(await prisma.course.create({ data }));
}

export async function update(id, data) {
  return toCourseDto(await prisma.course.update({ where: { id }, data }));
}

export async function remove(id) {
  const enrollments = await prisma.enrollment.count({ where: { courseId: id } });
  if (enrollments > 0) {
    throw new AppError('Não é possível excluir um curso que possui matrículas.', 409);
  }
  await prisma.course.delete({ where: { id } });
}
