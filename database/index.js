const Sequelize = require('sequelize');
const db = new Sequelize('chatapp', 'andersso', 'apple630', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.authenticate()
  .then(() => {
    console.log('connected to database.');
  })
  .catch(err => {
    console.error('unable to connect to database.', err);
  });

// db.sync({force: true})
//   .then(console.log('db created'));

module.exports = db;
