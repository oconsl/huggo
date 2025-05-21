import { PrismaClient } from '@prisma/client';

declare global {
  namespace Express {
    export interface Request {
      prisma?: PrismaClient;
    }
  }
}
