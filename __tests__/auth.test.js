'use strict';

const { sequelize } = require('../src/models/index');
const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll (async () => {
  await sequelize.drop();
});

/// REVISIT TESTS

describe('Auth Tests', () => {
  test ('allows a new user to signup to create an account with a POST to /signup', async () => {
    let response = await mockRequest.post('/signup').send({
      username: 'newUser',
      password: 'password1234',
    });
    console.log('Response Body:', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('newUser');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('password1234');
  });

  test ('allows a user to signin to their account with a POST to /signin', async () => {
    let response = await mockRequest.post('/signin').send({
      username: 'newUser',
      password: 'password1234',
    });
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('');
  });

});