const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.use(errorHandler);

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

module.exports = app;
