import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import candidateRoutes from './routes/candidates';
import authRoutes from './routes/auth';

dotenv.config();
const prisma = new PrismaClient();

export const app = express();
const port = process.env.PORT || 3010;

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con el origen de tu frontend
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(candidateRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
