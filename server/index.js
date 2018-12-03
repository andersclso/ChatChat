const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const parser = require('body-parser');
const router = require('./router.js');
const io = require('socket.io').listen(server);
const port = 1119;
const db = require('../database/index.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/', router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const users = {};

io.on('connection', (socket) => {

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  socket.on('join', (user) => {
    users[socket.id] = user;
    io.emit('announcement', user + ' has connected.');
    socket.broadcast.emit('updateUsers', users);
  });

  socket.on('disconnect', () => {
    let user = users[socket.id];
    io.emit('announcement', user + ' has disconnected.');
    delete users[socket.id];
    socket.broadcast.emit('updateUsers', users);
  });

  socket.on('updateUsers', (updatedUsers) => {
    user = updatedUsers;
    console.log(users);
  });

  socket.on('joinChatroom', (chatroom) => {
    console.log('joined', chatroom);
    socket.join(chatroom);
  });

  socket.on('createChatroom', (chatroom) => {
    io.emit('createChatroom', chatroom);
  });

});

server.listen(port, () => {
  console.log('connected to port:', port);
});
