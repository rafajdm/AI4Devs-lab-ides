import request from 'supertest';
import { app } from '../index';
import { Server } from 'http';
import { Request, Response, NextFunction } from 'express'; // Import the necessary types

let server: Server;

beforeAll(() => {
  server = app.listen(0); // Usar un puerto dinámico
});

afterAll(() => {
  server.close();
});

describe('GET /', () => {
  it('responds with Hello World!', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
