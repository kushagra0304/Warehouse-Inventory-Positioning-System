// ---------------------------------------------------------
// NPM Packages

const express = require('express');
const cors = require('cors');

// ---------------------------------------------------------
// My imports 

const config = require('./utils/config');
const adminRouter = require('./controllers/admin');
const tagRouter = require('./controllers/tag');
const scannerRouter = require('./controllers/scanner');
const middlewares = require('./utils/middlewares');

// ---------------------------------------------------------
// Initialization

const app = express();

// ---------------------------------------------------------
// DB initialisation

/* Database will be init and cached the first time you import it. */

// ---------------------------------------------------------
// Middleware list

if (config.ENVIROMENT === 'development') {
    app.use(require('./utils/middlewares').morganRequestLogger);
}
app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/', express.static(__dirname + '/public'));
app.use(express.json());
// ----------------------------
// Controllers
app.use('/api/admin', adminRouter);
app.use('/api/scanner', scannerRouter);
app.use('/api/tag', tagRouter);
// ----------------------------
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler); // this has to be the last loaded middleware.

// ---------------------------------------------------------
// Export express app

module.exports = app;

// ---------------------------------------------------------
