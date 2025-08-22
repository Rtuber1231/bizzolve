// FILE: /lib/prisma.js
// DESC: Creates a single, cached instance of the Prisma Client for efficiency.

import { PrismaClient } from '@prisma/client';

// This prevents Prisma from creating too many connections in a development environment.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
