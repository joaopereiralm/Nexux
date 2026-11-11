import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { BCRYPT_ROUNDS } from '../config/auth.js';
import { prisma } from '../config/prisma.js';
import { AppError } from '../utils/AppError.js';

// Usado para gastar o mesmo tempo de CPU quando o e-mail não existe,
// dificultando a descoberta de e-mails cadastrados pelo tempo de resposta.
const DUMMY_HASH = bcrypt.hashSync('nexux-dummy-password', BCRYPT_ROUNDS);

export function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

function issueSession(user) {
  // O token CSRF vai dentro do JWT (cookie HttpOnly) e também no corpo da resposta.
  // O front-end o reenvia no header X-CSRF-Token nas requisições que alteram dados.
  const csrfToken = crypto.randomBytes(32).toString('hex');
  const token = jwt.sign({ role: user.role, csrf: csrfToken }, env.JWT_SECRET, {
    subject: user.id,
    expiresIn: env.JWT_EXPIRES_IN,
    algorithm: 'HS256',
  });
  const { exp } = jwt.decode(token);
  return { user: toPublicUser(user), token, csrfToken, expiresAt: exp * 1000 };
}

export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] });
}

export function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

export async function register({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError('Este e-mail já está cadastrado.', 409);

  const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);
  // O perfil nunca vem do cliente: todo cadastro público é STUDENT.
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: 'STUDENT' },
  });
  return issueSession(user);
}

export async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  const passwordMatches = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);

  if (!user || !passwordMatches) throw new AppError('E-mail ou senha inválidos.', 401);
  return issueSession(user);
}
