import request from 'supertest';
import { app } from '../index';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';

const prisma = new PrismaClient();
let server: Server;

beforeAll(async () => {
  await prisma.candidate.deleteMany();
  server = app.listen(0); // Usar un puerto dinámico
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close();
});

describe('POST /api/candidates', () => {
  it('should create a new candidate', async () => {
    const response = await request(server)
      .post('/api/candidates')
      .field('firstName', 'John')
      .field('lastName', 'Doe')
      .field('email', 'john.doe@example.com')
      .field('phone', '1234567890')
      .field('address', '123 Main St')
      .field('education', 'Bachelor')
      .field('experience', '5 years')
      .attach('resume', Buffer.from('resume content'), 'resume.pdf');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.firstName).toBe('John');
    expect(response.body.lastName).toBe('Doe');
  });
});