// ---------------------------------------------------------
// NPM Packages

const express = require('express');

// ---------------------------------------------------------
// My imports 

const config = require('./utils/config');
const adminRouter = require('./controllers/admin');
const adminRouter = require('./controllers/admin');
const adminRouter = require('./controllers/admin');

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
app.use('/', express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());
// ----------------------------
// Controllers
app.use('/admin', adminRouter);
app.use('/scanner', scannerRouter);
app.use('/tag', tagRouter);
// ----------------------------
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler); // this has to be the last loaded middleware.

// ---------------------------------------------------------
// Export express app

module.exports = app;

// ---------------------------------------------------------
