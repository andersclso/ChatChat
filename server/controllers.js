const models = require('../database/models.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const loggedInUsers = require('./index.js');

const controller = {
  createUser: (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        return console.log('There was an error in hashing the password');
      }

      let userDetails = {
        username: req.body.username,
        password: hash
      }

      console.log(userDetails);

      models.User.create(userDetails)
        .then((newUser) => {
          res.send(true);
        })
        .catch(() => 'error');
    });
  },
  authenticate: async (req, res) => {

    let userDetails = req.query;

    try {
      const user = await models.User.findOne({
        where: {
          username: userDetails.username
        }
      });

      const authenticated = await correctPassword(userDetails.password, user.password);

      res.send(authenticated);
    } catch(e) {
      res.send(false);
    }
  },
  storeMessage: (req, res) => {
    let messageDetails = req.body;
    console.log('md, ', messageDetails);

    models.Message.create(messageDetails)
      .then((newMessage) => {
        res.send(newMessage);
      })
      .catch(() => 'error storing message');
  },
  loadHistory: (req, res) => {
    models.Message.findAll().then(history => res.send(history));
  }
}

const correctPassword = (enteredPassword, originalPassword) => {
  return new Promise(resolve => {
    bcrypt.compare(enteredPassword, originalPassword, (err, res) =>{
      resolve(res)
    });
  });
}

module.exports = controller;
