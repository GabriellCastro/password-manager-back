import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PasswordCardController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST password-card (create)', () => {
    return request(app.getHttpServer())
      .post('/password-card')
      .send({
        url: 'http://example.com',
        name: 'Test Card',
        username: 'user',
        password: 'password123',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          url: 'http://example.com',
          name: 'Test Card',
          username: 'user',
          password: '******',
          notes: undefined,
        });
      });
  });

  it('/GET password-card (get all)', () => {
    return request(app.getHttpServer())
      .get('/password-card')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/GET password-card/:id (get by id)', async () => {
    const response = await request(app.getHttpServer())
      .post('/password-card')
      .send({
        url: 'http://example.com',
        name: 'Test Card',
        username: 'user',
        password: 'password123',
      });

    const cardId = response.body.id;

    return request(app.getHttpServer())
      .get(`/password-card/${cardId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          id: cardId,
          url: 'http://example.com',
          name: 'Test Card',
          username: 'user',
          password: '******',
          notes: undefined,
        });
      });
  });

  it('/PUT password-card/:id (update)', async () => {
    const response = await request(app.getHttpServer())
      .post('/password-card')
      .send({
        url: 'http://example.com',
        name: 'Test Card',
        username: 'user',
        password: 'password123',
      });

    const cardId = response.body.id;

    return request(app.getHttpServer())
      .put(`/password-card/${cardId}`)
      .send({ name: 'Updated Test Card', password: 'newpassword123' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          id: cardId,
          url: 'http://example.com',
          name: 'Updated Test Card',
          username: 'user',
          password: '******',
          notes: undefined,
        });
      });
  });

  it('/DELETE password-card/:id (delete)', async () => {
    const response = await request(app.getHttpServer())
      .post('/password-card')
      .send({
        url: 'http://example.com',
        name: 'Test Card',
        username: 'user',
        password: 'password123',
      });

    const cardId = response.body.id;

    return request(app.getHttpServer())
      .delete(`/password-card/${cardId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ message: 'Card deleted successfully' });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
