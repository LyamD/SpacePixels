var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);


var path = require("path");
app.use(express.static(path.join(__dirname + '/../client/')));//middleware

// var game = require('./js/spacepixels/main.js');
// const { Engine } = require("matter-js");
// var engine = Engine.create();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

//game(engine);

io.on('connection', (socket) => {
    console.log('player connected');

    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
      });

    socket.on('disconnect', () => {
        console.log('user disconnectedd');
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
