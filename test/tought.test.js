const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const app = require('../src/app');

const secret = process.env.JWT_SECRET;
const request = supertest(app);
const tought = { title: 'new post' };
const token = jwt.sign({}, secret);

describe('Create tought', () => {
  test('Deve criar um tought com sucesso', () => {
    return request.post('/tought')
      .send(tought)
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
  test('Não deve criar um tought sem title', () => {
    return request.post('/tought')
      .send({ title: '' })
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body.error).toEqual('O title é obrigatorio');
      });
  });
});

describe('List tought', () => {
  test('deve listar todos os tought', () => {
    return request.get('/tought')
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.tought.length).toBeGreaterThan(0);
      });
  });
});

describe('edit tought', () => {
  test('deve conseguir editar um tought', () => {
    return request.post('/tought')
      .send(tought)
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(201);
        // expect(res.body).toEqual(tought);
        const toughtId = res.body.id;
        return request.put(`/tought/${toughtId}`)
          .set('authorization', `bearer ${token}`)
          .send({ title: 'Title edit' })
          .then((response) => {
            expect(response.status).toEqual(200);
          });
      });
  });
  test('deve conseguir editar um tought', () => {
    return request.post('/tought')
      .send(tought)
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(201);
        const toughtId = res.body.id;
        return request.put(`/tought/${toughtId}`)
          .set('authorization', `bearer ${token}`)
          .send({ title: '' })
          .then((response) => {
            expect(response.status).toEqual(403);
            expect(response.body.error).toEqual('Title é obrigatorio');
          });
      });
  });
});

describe('delete tought', () => {
  test('Deve remover um tought com sucesso', () => {
    return request.post('/tought')
      .send(tought)
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        const toughtId = res.body.id;
        return request.delete(`/tought/${toughtId}`)
          .set('authorization', `bearer ${token}`)
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('Tought deletado com sucesso!');
          });
      });
  });
});

describe('search', () => {
  test('deve fazer uma busca', () => {
    return request.get('/tought/search?=ufs')
      .set('authorization', `bearer ${token}`)
      .then((res) => {
        expect(res.status).toEqual(200);
      });
  });
});
