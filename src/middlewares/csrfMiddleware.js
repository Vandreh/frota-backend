// src/middlewares/csrfMiddleware.js
const csurf = require('csurf');

const csrfProtection = csurf({ cookie: true });

const generateCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

module.exports = { csrfProtection, generateCsrfToken };
