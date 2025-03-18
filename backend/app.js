const express = require('express');
const cors = require('cors');
const path = require('path');

// ---------------------------------------------------------
// My Imports 
const config = require('./utils/config');
const adminRouter = require('./controllers/admin');
const tagRouter = require('./controllers/tag');
const scannerRouter = require('./controllers/scanner');
const middlewares = require('./utils/middlewares');

const app = express();

// ---------------------------------------------------------
// Middleware List

if (config.ENVIRONMENT === 'development') {
    const { morganRequestLogger } = require('./utils/middlewares');
    app.use(morganRequestLogger);
    app.use(cors());
}

app.use(express.json());

// ---------------------------------------------------------
// Static File Serving (SPA)

const buildPath = path.join(__dirname, '/build');
console.log(buildPath)
app.use(express.static(buildPath));

// ---------------------------------------------------------
// API Routes

app.use('/api/admin', adminRouter);
app.use('/api/scanner', scannerRouter);
app.use('/api/tag', tagRouter);

// ---------------------------------------------------------
// Handle SPA Routes (Fallback to React index.html)

// app.get('*', (req, res) => {
//     res.sendFile(path.join(buildPath, 'index.html'));
// });

// ---------------------------------------------------------
// Error Handling Middlewares

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

// ---------------------------------------------------------
// Export Express App

module.exports = app;
