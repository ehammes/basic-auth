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
    res.status(200).json(record);
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
});


// Sign in 

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, async (req, res) => {
  try {
    let { username } = req.query;
    let object = {username};
    // console.log('auth proof', req.user.username);
    res.status(200).json(object);
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
});

module.exports = router;



/*
req.headers.authorization is : "Basic sdkjdsljd="
To get username and password from this, take the following steps:
  - Turn that string into an array by splitting on ' '
  - Pop off the last value
  - Decode that encoded string so it returns to user:pass
  - Split on ':' to turn it into an array
  - Pull username and password from that array
*/

  // let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  // let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  // let decodedString = base64.decode(encodedString); // "username:password"
  // let [username, password] = decodedString.split(':'); // username, password

/*
  Now that we finally have username and password, let's see if it's valid
  1. Find the user in the database by username
  2. Compare the plaintext password we now have against the encrypted password in the db
     - bcrypt does this by re-encrypting the plaintext password and comparing THAT
  3. Either we're valid or we throw an error
*/
  // try {
  //   const user = await UserSchema.findOne({ where: { username: username } });
  //   const valid = await bcrypt.compare(password, user.password);
  //   if (valid) {
  //     res.status(200).json(user);
  //   }
  //   else {
  //     throw new Error('Invalid User');
    // }

