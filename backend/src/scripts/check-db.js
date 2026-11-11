import { prisma } from '../config/prisma.js';

try {
  await prisma.$queryRaw`SELECT 1`;
  console.log('Conexão com o banco OK.');
} catch (error) {
  console.error('Falha ao conectar no banco:', error.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
