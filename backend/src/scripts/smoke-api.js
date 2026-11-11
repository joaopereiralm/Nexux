// Teste de fumaça da API de cursos/matrículas/progresso/admin.
// Com a API rodando: node src/scripts/smoke-api.js
// Cria dados temporários (2 usuários e 1 curso) e remove tudo no final.
import { prisma } from '../config/prisma.js';

const BASE = process.env.API_URL ?? 'http://localhost:3333/api';
let failures = 0;

function check(label, condition, extra = '') {
  console.log(`${condition ? '✓' : '✗'} ${label}${condition ? '' : ` ${extra}`}`);
  if (!condition) failures += 1;
}

function createClient() {
  let cookie = '';
  let csrf = '';
  return {
    async call(method, path, body) {
      const headers = { 'Content-Type': 'application/json' };
      if (cookie) headers.Cookie = cookie;
      if (csrf && method !== 'GET') headers['X-CSRF-Token'] = csrf;
      const res = await fetch(BASE + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      const set = res.headers.getSetCookie();
      if (set.length) cookie = set.map((c) => c.split(';')[0]).join('; ');
      const text = await res.text();
      return { status: res.status, data: text ? JSON.parse(text) : null };
    },
    async register(email) {
      const r = await this.call('POST', '/auth/register', {
        name: 'Teste API',
        email,
        password: 'Senha1234',
        confirmPassword: 'Senha1234',
      });
      csrf = r.data?.csrfToken ?? '';
      return r;
    },
  };
}

const stamp = Date.now();
const emailStudent = `api-aluno-${stamp}@nexux.test`;
const emailAdmin = `api-admin-${stamp}@nexux.test`;
const anon = createClient();
const student = createClient();
const admin = createClient();
let courseId;

try {
  await student.register(emailStudent);
  await admin.register(emailAdmin);

  console.log('— Acesso e autorização');
  let r = await anon.call('GET', '/courses');
  check('catálogo público (200)', r.status === 200 && Array.isArray(r.data), r.status);
  r = await anon.call('GET', '/admin/stats');
  check('rota admin sem login (401)', r.status === 401, r.status);
  r = await student.call('GET', '/admin/stats');
  check('aluno em rota admin (403)', r.status === 403, r.status);
  r = await student.call('POST', '/admin/courses', {});
  check('aluno criando curso (403)', r.status === 403, r.status);

  // Promove o segundo usuário. O perfil é lido do banco a cada requisição.
  await prisma.user.update({ where: { email: emailAdmin }, data: { role: 'ADMIN' } });
  r = await admin.call('GET', '/admin/stats');
  check('admin acessa estatísticas (200)', r.status === 200, r.status);

  console.log('— Administração de conteúdo');
  const course = {
    title: 'Curso de Teste API',
    description: 'Descrição de teste com mais de dez caracteres.',
    thumbnail: null,
    price: 199.9,
    workload: 12,
  };
  r = await admin.call('POST', '/admin/courses', { ...course, price: -1 });
  check('curso com preço negativo (400)', r.status === 400, r.status);
  r = await admin.call('POST', '/admin/courses', course);
  courseId = r.data?.id;
  check('criar curso (201)', r.status === 201 && r.data?.price === 199.9, r.status);

  r = await admin.call('POST', `/admin/courses/${courseId}/modules`, { title: 'Módulo 1' });
  const moduleId = r.data?.id;
  check('criar módulo (201), ordem automática 1', r.status === 201 && r.data?.order === 1, r.status);

  const lessonBody = { title: 'Aula', videoUrl: 'https://example.com/v1', duration: 600 };
  r = await admin.call('POST', `/admin/modules/${moduleId}/lessons`, {
    ...lessonBody,
    videoUrl: 'javascript:alert(1)',
  });
  check('URL de vídeo com esquema perigoso (400)', r.status === 400, r.status);
  r = await admin.call('POST', `/admin/modules/${moduleId}/lessons`, { ...lessonBody, title: 'Aula 1' });
  const lesson1 = r.data?.id;
  check('criar aula 1 (201)', r.status === 201, r.status);
  r = await admin.call('POST', `/admin/modules/${moduleId}/lessons`, { ...lessonBody, title: 'Aula 2' });
  const lesson2 = r.data?.id;
  check('criar aula 2 (201), ordem automática 2', r.status === 201 && r.data?.order === 2, r.status);

  console.log('— Área pública');
  r = await anon.call('GET', `/courses/${courseId}`);
  check('detalhe público do curso (200) com 2 aulas', r.status === 200 && r.data?.modules?.[0]?.lessons?.length === 2, r.status);
  check('detalhe público NÃO expõe videoUrl', !JSON.stringify(r.data).includes('videoUrl'));

  console.log('— Matrícula e acesso ao conteúdo');
  r = await student.call('GET', `/student/courses/${courseId}`);
  check('conteúdo sem matrícula (403)', r.status === 403, r.status);
  r = await student.call('PUT', `/student/lessons/${lesson1}/progress`, { completed: true });
  check('progresso sem matrícula (403)', r.status === 403, r.status);
  r = await student.call('POST', '/enrollments', { courseId });
  check('matricular (201)', r.status === 201, r.status);
  r = await student.call('POST', '/enrollments', { courseId });
  check('matrícula duplicada (409)', r.status === 409, r.status);
  r = await student.call('GET', `/student/courses/${courseId}`);
  check('conteúdo com matrícula (200) inclui videoUrl', r.status === 200 && r.data?.modules?.[0]?.lessons?.[0]?.videoUrl, r.status);

  console.log('— Progresso');
  r = await student.call('PUT', `/student/lessons/${lesson1}/progress`, { completed: true });
  check('concluir aula 1 → 50%', r.status === 200 && r.data?.courseProgress?.percent === 50, JSON.stringify(r.data));
  r = await student.call('PUT', `/student/lessons/${lesson2}/progress`, { completed: true });
  check('concluir aula 2 → 100% e matrícula COMPLETED', r.data?.courseProgress?.percent === 100 && r.data?.enrollmentStatus === 'COMPLETED', JSON.stringify(r.data));
  r = await student.call('PUT', `/student/lessons/${lesson2}/progress`, { completed: false });
  check('desmarcar aula 2 → 50% e matrícula ACTIVE', r.data?.courseProgress?.percent === 50 && r.data?.enrollmentStatus === 'ACTIVE', JSON.stringify(r.data));
  r = await student.call('PUT', `/student/lessons/${lesson2}/progress`, { completed: 'sim' });
  check('progresso com valor inválido (400)', r.status === 400, r.status);
  r = await admin.call('PUT', `/student/lessons/${lesson1}/progress`, { completed: true });
  check('outro usuário (sem matrícula) não altera progresso (403)', r.status === 403, r.status);

  console.log('— Dashboard e listagens');
  r = await student.call('GET', '/student/dashboard');
  check('dashboard do aluno', r.status === 200 && r.data?.stats?.completedLessons === 1 && r.data?.stats?.overallPercent === 50 && r.data?.continueLearning?.lessonId === lesson2, JSON.stringify(r.data?.stats));
  r = await student.call('GET', '/enrollments/me');
  check('minhas matrículas (200)', r.status === 200 && r.data?.length === 1, r.status);
  r = await admin.call('GET', '/admin/enrollments');
  check('admin lista matrículas (200)', r.status === 200 && r.data?.some((e) => e.course.id === courseId), r.status);
  r = await admin.call('GET', '/admin/students');
  check('admin lista alunos (200)', r.status === 200, r.status);
  r = await student.call('GET', '/admin/enrollments');
  check('aluno listando matrículas de todos (403)', r.status === 403, r.status);

  console.log('— Integridade');
  r = await admin.call('DELETE', `/admin/courses/${courseId}`);
  check('excluir curso com matrículas (409)', r.status === 409, r.status);
} catch (error) {
  failures += 1;
  console.error('Erro inesperado no teste:', error);
} finally {
  // Remove os dados de teste (usuários primeiro: a exclusão em cascata apaga matrículas e progresso).
  await prisma.user.deleteMany({ where: { email: { in: [emailStudent, emailAdmin] } } });
  if (courseId) await prisma.course.deleteMany({ where: { id: courseId } });
  await prisma.$disconnect();
}

console.log(failures ? `\n${failures} verificação(ões) falharam.` : '\nTodas as verificações passaram.');
process.exitCode = failures ? 1 : 0;
