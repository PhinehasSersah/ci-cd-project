const request = require('supertest');
const { app, server } = require('../app/server');

afterAll(() => {
  server.close();
});

describe('GET /', () => {
  test('returns 200 with Hello World message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello, World!');
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /health', () => {
  test('returns 200 with healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});
