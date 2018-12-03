const Sequelize = require('sequelize');
const db = require('./index.js');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Message = db.define('message', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  room: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = { User, Message };
