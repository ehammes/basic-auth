'use strict';

const { sequelize } = require('./src/models');
const { start } = require('./src/server');

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
  .then(() => {
    console.log('Successful Connection!');
  })
  .catch(error => console.error('Could not start server', error.message));

start();