'use strict';

const { UserSchema } = require('../models');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

async function basicAuth(req, res, next) {
  let { authorization } = req.headers;
  console.log(authorization);
  if (!authorization){
    res.status(401).send('401 Not Authorized');
  } else {
    let authStr = authorization.split( ' ')[1];
    console.log('authStr:', authStr);

    let decodedString = base64.decode(authStr);
    console.log('decodedAuthStr:', decodedString);

    let [ username, password ] = decodedString.split(':');
    console.log('username:', username);
    console.log('password:', password);

    let user = await UserSchema.findOne({where: {username}});

    if (user){
      let validUser = await bcrypt.compare(password, user.password);
      if (validUser) {
        req.user = user;
        next();
      } else {
        next('401 Not Authorized');
      }
    }
  }
}

module.exports = basicAuth;
