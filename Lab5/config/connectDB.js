const Sequelize = require('sequelize');

const sequelize = new Sequelize('lab5', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
});

module.exports = sequelize;