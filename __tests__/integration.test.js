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
  test('It should respond with found reply', () => {
    return request(app)
      .post('/api/messages/chat-reply')
      .send({
        botId: '5f74865056d7bb000fcd39ff',
        conversationId: 'abc',
        message: 'hello',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data.finalReply).toEqual('Hello to you too.');
      });
  });

  test.only('It should respond that didnt understand intent', () => {
    return request(app)
      .post('/api/messages/chat-reply')
      .send({
        botId: '5f74865056d7bb000fcd39ff',
        conversationId: 'abc',
        message: 'reclam',
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.data.finalReply).toEqual(
          "I'm sorry, I'm not sure how to proceed, transfering you to a customer service specialist now."
        );
      });
  });
});
