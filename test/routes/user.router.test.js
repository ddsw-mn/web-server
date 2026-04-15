const {describe, expect, test, beforeEach} = require('@jest/globals');
const supertest = require('supertest');

const app = require('../../src/app');

describe("User Router",  () => {

  let request;

  beforeEach(() => {
    request = supertest(app);
  });

  describe('GET /users', () => {
    
    test('Si hay users me da la lista de usuarios', () => {
      return request.get('/users')
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body[0].name).toBe('Fede Scarpa');
          expect(res.body[0].code).toBe('123.123-1');
          expect(res.body[0].mail).toBe('fscarpa@frba.utn.edu.ar');
          expect(res.body[1].name).toBe('Leo Cesario');
          expect(res.body[1].code).toBe('456.456-2');
          expect(res.body[1].mail).toBe('lcesario@frba.utn.edu.ar');
        });
    });
  });

  describe('POST /users', () => {
    
    test('Si le mando un usuario válido lo crea', () => {
      return request.post('/users')
        .send({ name: 'Orne Mosca', code: '789.789.3', mail: 'omosca@frba.utn.edu.ar' })
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.id).toEqual(3);
        });
    });

    test('Si le mando un usuario con un código existente falla', () => {
      return request.post('/users')
        .send({ name: 'Orne Mosca', code: '123.123-1', mail: 'omosca@frba.utn.edu.ar' })
        .then(res => {
          expect(res.status).toBe(409);
          expect(res.body.message).toEqual('Ya existe un usuario con código 123.123-1');
        });
    });

    test('Si le mando un usuario con al menos un campo faltante falla', () => {
      return request.post('/users')
        .send({ name: 'Orne Mosca', code: '123.123-1' })
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.body.message).toEqual('Faltan campos requeridos: mail.');
        });
    });
  });

  describe('GET /users/:code', () => {
    
    test('Si le mando un usuario con codigo existente lo trae', () => {
      return request.get('/users/123.123-1')
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe('Fede Scarpa');
          expect(res.body.code).toBe('123.123-1');
          expect(res.body.mail).toBe('fscarpa@frba.utn.edu.ar');
        });
    });

    test('Si le mando un usuario con un código inexistente falla', () => {
      return request.get('/users/789.789-3')
        .then(res => {
          expect(res.status).toBe(404);
          expect(res.body.message).toEqual('Usuario con código 789.789-3 no encontrado');
        });
    });
  });

  describe('PUT /users/:code', () => {
    
    test('Si le mando un usuario válido lo updatea', () => {
      return request.put('/users/123.123-1')
        .send({ name: 'El Fedi', code: '789.789.3', mail: 'elfedi@frba.utn.edu.ar' })
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.name).toEqual('El Fedi');
          expect(res.body.mail).toEqual('elfedi@frba.utn.edu.ar');
          expect(res.body.code).toEqual('123.123-1');
        });
    });
  });
});