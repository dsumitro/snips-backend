const express = require('express');
const cors = require('cors');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');
const ErrorHandler = require('./middleware/errorHandler');

const app = express();

// .use signifies middleware
app.use(cors());
app.use(express.json()); // built in express function that parses requests with json payloads
app.use(logger);
app.use(router);
app.use(ErrorHandler);

module.exports = app;
