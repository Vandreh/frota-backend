const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const { csrfProtection, generateCsrfToken } = require('./middlewares/csrfMiddleware');


dotenv.config();

const app = express();
app.use(helmet());
app.use(xss());
app.use(compression());
app.use(cookieParser());
app.use(csrfProtection);
app.use(generateCsrfToken);
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(csurf({ cookie: true }));

app.use('/', routes);

app.use(errorHandler);

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err));

module.exports = app;
