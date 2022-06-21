'use strict';

function logger(req, res, next) {
  console.log(`REQUEST ${req.method}, ${req.path}`);
  next();
}

module.exports = logger;