'use strict';

const express = require('express');
const { UserSchema } = require('../src/models');
const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic');
const router = express.Router();

// Create User
// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post('/signup', async (req, res) => {

  try {
    let { username, password } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 10);
    const record = await UserSchema.create({
      username,
      password: encryptedPassword,
    });
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});


// Sign in 

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
});

module.exports = router;
