import 'regenerator-runtime/runtime';
import request from 'supertest';
import { app } from '../index';

describe('Test the ping path', () => {
  test('It should respond the GET method', () => {
    return request(app)
      .get('/ping')
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe('Test the chat-reply path', () => {
  test('It should respond with reply', () => {
    return request(app)
      .post('/api/messages/chat-reply')
      .send({
        botId: '5f74865056d7bb000fcd39ff',
        conversationId: 'abc',
        message: 'hello',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
