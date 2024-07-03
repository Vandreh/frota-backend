const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    // dialect: 'sqlite',
    dialect: process.env.DIALECT,
    // storage: './database.sqlite'
    storage: process.env.STORAGE
});

module.exports = sequelize;
