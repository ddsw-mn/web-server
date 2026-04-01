const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const { errorHandler } = require('./middlewares/errorHandler');
const { notFoundHandler } = require('./middlewares/notFound');

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;
