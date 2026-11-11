import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';
import { toCourseDto } from '../utils/serializers.js';
import { listMine } from './enrollment.service.js';
import { findNextLesson, getProgressByCourse } from './progress.service.js';

// Regra central de acesso: só quem tem matrícula não cancelada acessa o conteúdo.
async function assertEnrolled(userId, courseId) {
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  if (!enrollment || enrollment.status === 'CANCELED') {
    throw new AppError('Matricule-se no curso para acessar este conteúdo.', 403);
  }
  return enrollment;
}

export async function getCourseContent(userId, courseId) {
  await assertEnrolled(userId, courseId);

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: { lessons: { orderBy: { order: 'asc' } } },
      },
    },
  });
  if (!course) throw new AppError('Curso não encontrado.', 404);

  const progress = await prisma.lessonProgress.findMany({
    where: { userId, lesson: { module: { courseId } } },
  });
  const byLesson = new Map(progress.map((p) => [p.lessonId, p]));
  const summary = (await getProgressByCourse(userId, [courseId])).get(courseId);

  return {
    ...toCourseDto(course),
    progress: summary,
    modules: course.modules.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      order: m.order,
      lessons: m.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        description: l.description,
        videoUrl: l.videoUrl,
        duration: l.duration,
        order: l.order,
        completed: byLesson.get(l.id)?.completed ?? false,
        completedAt: byLesson.get(l.id)?.completedAt ?? null,
      })),
    })),
  };
}

export async function setLessonProgress(userId, lessonId, completed) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { id: true, module: { select: { courseId: true } } },
  });
  if (!lesson) throw new AppError('Aula não encontrada.', 404);

  const courseId = lesson.module.courseId;
  await assertEnrolled(userId, courseId);

  const existing = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });
  // Preserva a data original se a aula já estava concluída.
  const completedAt = completed ? (existing?.completed ? existing.completedAt : new Date()) : null;

  const progress = await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: { userId, lessonId, completed, completedAt },
    update: { completed, completedAt },
  });

  // Mantém o status da matrícula coerente com o progresso.
  const summary = (await getProgressByCourse(userId, [courseId])).get(courseId);
  const enrollmentStatus =
    summary.totalLessons > 0 && summary.completedLessons === summary.totalLessons
      ? 'COMPLETED'
      : 'ACTIVE';
  await prisma.enrollment.update({
    where: { userId_courseId: { userId, courseId } },
    data: { status: enrollmentStatus },
  });

  return {
    lessonId,
    completed: progress.completed,
    completedAt: progress.completedAt,
    courseProgress: summary,
    enrollmentStatus,
  };
}

export async function getDashboard(userId) {
  const enrollments = await listMine(userId);

  const recent = await prisma.lessonProgress.findMany({
    where: { userId, completed: true },
    orderBy: { completedAt: 'desc' },
    take: 5,
    include: {
      lesson: {
        select: {
          id: true,
          title: true,
          module: { select: { title: true, course: { select: { id: true, title: true } } } },
        },
      },
    },
  });

  const totalLessons = enrollments.reduce((sum, e) => sum + e.progress.totalLessons, 0);
  const completedLessons = enrollments.reduce((sum, e) => sum + e.progress.completedLessons, 0);

  // "Continuar aprendendo": curso da última atividade, se ainda houver aulas; senão o primeiro incompleto.
  const lastCourseId = recent[0]?.lesson.module.course.id;
  const candidate =
    enrollments.find((e) => e.course.id === lastCourseId && e.progress.percent < 100) ??
    enrollments.find((e) => e.progress.percent < 100);
  const continueLearning = candidate ? await findNextLesson(userId, candidate.course.id) : null;

  return {
    stats: {
      enrolledCourses: enrollments.length,
      completedLessons,
      totalLessons,
      overallPercent: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
    },
    enrollments,
    recentActivity: recent.map((p) => ({
      lessonId: p.lesson.id,
      lessonTitle: p.lesson.title,
      moduleTitle: p.lesson.module.title,
      courseId: p.lesson.module.course.id,
      courseTitle: p.lesson.module.course.title,
      completedAt: p.completedAt,
    })),
    continueLearning,
  };
}
