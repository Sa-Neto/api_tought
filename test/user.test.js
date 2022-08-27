const supertest = require('supertest');
const app = require('../src/app');

const request = supertest(app);
const email = `${Date.now()}@gmail.com`;
let mainLogin = { name: 'Urahara', email: `${Date.now()}2@gmail.com`, password: '123456' };
beforeAll(() => {
  return request.post('/register')
    .send(mainLogin)
    .then((res) => {
      expect(res.status).toEqual(201);
    }).catch((e) => {
      console.log(e);
    });
});

describe('User register', () => {
  test('deve conseguir criar um usuario com sucesso', () => {
    let mainUser = { name: 'Urahara', email, password: '123456' };
    return request.post('/register')
      .send(mainUser)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('token');
      });
  });
  test('Não deve inserir usuário sem nome ', () => {
    mainUser = { name: '', email, password: '123456' };
    return request.post('/register')
      .send()
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toEqual('Atributo nome é obrigatorio');
      });
  });
  test('Não deve inserir usuário sem email ', () => {
    mainUser = { name: 'Urahara', email: '', password: '123456' };
    return request.post('/register')
      .send(mainUser)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toEqual('Atributo email é obrigatorio');
      });
  });
  test('Não deve inserir usuário sem senha ', () => {
    mainUser = { name: 'Urahara', email, password: '' };
    return request.post('/register')
      .send(mainUser)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toEqual('Atributo senha é obrigatorio');
      });
  });
  test('Não permite que cadastre com email repetido', () => {
    const newEmail = `${Date.now()}2@gmail.com`;
    let mainUser = { name: 'Urahara', email: newEmail, password: '123456' };
    return request.post('/register')
      .send(mainUser)
      .then((res) => {
        expect(res.status).toBe(201);
        return request.post('/register')
          .send(mainUser)
          .then((response) => {
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ error: 'email já cadastrado' });
          });
      });
  });
});

describe('User login', () => {
  test('Devo fazer login', () => {
    const login = { email: mainLogin.email, password: mainLogin.password };
    return request.post('/login')
      .send(login)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('token');
      });
  });
  test('Não deve fazer login se não for enviado o email', () => {
    const login = { email: '', password: mainLogin.password };
    return request.post('/login')
      .send(login)
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body.error).toEqual('Email é um item obrigatório');
      });
  });
  test('Não deve fazer login se não for enviado a senha', () => {
    const login = { email: mainLogin.email, password: '' };
    return request.post('/login')
      .send(login)
      .then((res) => {
        expect(res.status).toBe(403);
        expect(res.body.error).toEqual('Senha é um item obrigatório');
      });
  });
});
