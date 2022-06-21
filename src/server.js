'use strict';

// 3rd Party Resources
const express = require('express');
// const { UsersModel, Sequelize, DataTypes } = require('./models');
const notFoundHandler = require('./middleware/404');
const internalError = require('./middleware/500');
const logger = require('./middleware/logger');
const userRouter = require('./router');
require('dotenv').config();

// Prepare the express app
const app = express();

const PORT = process.env.PORT || 3002;

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Greetings!');
});


app.use(logger);
app.use('*', logger, notFoundHandler);
app.use(internalError);


module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('listening on port', PORT)),
};
