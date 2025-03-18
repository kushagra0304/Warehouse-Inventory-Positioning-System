const morgan = require('morgan');
const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs');

// This one logs any request made to the server
// One important thing to note. it only logs those request which have a response.
// No response indicates server error.
const morganRequestLogger = morgan((tokens, req, res) => {
    if (tokens.method(req, res) === 'POST') {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body),
      ].join(' ');
    }
  
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
    ].join(' ');
})

const unknownEndpoint = async (request, response) => {
  response.status(404).send((await fs.promises.readFile(path.join(__dirname, "../public/four0four.html"))).toString());
};

const errorHandler = async (error, request, response, next) => {
  response.status(500)

  if (error.name === 'CastError') {
    logger.debug(error.name);
    logger.debug(error.message);
    logger.debug(error)
    response.status(400);
  } 

  if (error.name === 'ValidationError') {
    logger.debug(request.authError.name);
    logger.debug(request.authError.message);
    logger.debug(request.authError)
    response.status(401);
  } 

  logger.debug(error);
  response.send((await fs.promises.readFile(path.join(__dirname, "../public/error.html"))).toString());

  next();
};

module.exports = {
  morganRequestLogger,
  errorHandler,
  unknownEndpoint,
}