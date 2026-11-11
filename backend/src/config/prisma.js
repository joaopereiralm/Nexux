import { PrismaClient } from '@prisma/client';
import { env } from './env.js';

// Instância única do client, reutilizada em toda a aplicação.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.isProduction ? ['error'] : ['warn', 'error'],
  });

if (!env.isProduction) globalForPrisma.prisma = prisma;
