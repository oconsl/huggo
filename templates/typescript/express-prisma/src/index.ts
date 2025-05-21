import express, { Express, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bookRouter from './routes/book.router.js';

const app: Express = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001; // Different from JS template to avoid conflict if run together

app.use(express.json());

// Middleware to make Prisma client available
app.use((req: Request, res: Response, next: NextFunction) => {
  req.prisma = prisma;
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('TypeScript Express Prisma Template');
});

app.use('/api/books', bookRouter);

// Global error handler (simple example)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

async function main() {
  // Optional: Add any startup logic here, e.g., connect to DB (Prisma does this lazily)
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // await prisma.$disconnect(); // Disconnect Prisma on app shutdown if not a long-running server
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
