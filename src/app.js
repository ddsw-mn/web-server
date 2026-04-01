const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.router');

const { errorHandler } = require('./middlewares/error.handler.middleware');
const { pageNotFoundHandler } = require('./middlewares/page.not.found.middleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRoutes);

app.use(errorHandler);
app.use(pageNotFoundHandler);

module.exports = app;
