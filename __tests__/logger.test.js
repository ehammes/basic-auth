'use strict';

let logger = require('../src/middleware/logger');

describe('Logger Middleware Tests', () => {
  let consoleSpy;
  let req= {};
  let res = {};
  let next = jest.fn(); // spy on the next method

  beforeEach(() => {
    // Attaches to the console (to spy on it)
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(); // spyOn method comes with jest by default
  });
  afterEach(() => {
    // Returns it back to normal / stops spying
    consoleSpy.mockRestore();
  });
  test ('Proprly logs output', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });
  test('Properly calls next()', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});