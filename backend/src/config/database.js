const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite database file will be stored in the project root
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

module.exports = sequelize;
