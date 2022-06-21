'use strict';

const { sequelize } = require('../src/models/index');
const { server } = require('../src/server');
const base64 = require('base-64');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll (async () => {
  await sequelize.drop();
});

describe('Auth Tests', () => {
  test ('allows a new user to signup to create an account with a POST to /signup', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'newUser',
      password: 'password1234',
    });
    console.log('Response Body:', response.body);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('newUser');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('password1234');
  });

  test ('allows a user to signin to their account with a POST to /signin', async () => {
    let authStr = 'newUser:password1234';
    let encodedStr = base64.encode(authStr);
    let response = await mockRequest.post('/signin').set('Authorization', `Basic ${encodedStr}`);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('newUser');
  });

});