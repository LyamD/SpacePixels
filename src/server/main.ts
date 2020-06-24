import * as express from 'express';
import * as socketio from 'socket.io';
import * as matterjs from 'matter-js';
const app = express();

let http = require('http').createServer(app);
let io = require('socket.io')(http);

import * as path from 'path';
app.use(express.static(path.join(__dirname + '/../client/')));//middleware

// var game = require('./js/spacepixels/main.js');
// const { Engine } = require("matter-js");
var engine = matterjs.Engine.create();
import * as game from './game';

game.main(engine);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

io.on('connection', (socket : any) => {
    console.log('player connected');

    socket.on('keyDown', (msg : string) => {
      io.emit('chat message', msg + 'pressed');
    });

    socket.on('keyUp', (msg : string) => {
      io.emit('chat message', msg + 'unpressed');
    });

    socket.on('chat message', (msg : string) => {
        io.emit('chat message', msg);
      });

    socket.on('disconnect', () => {
        console.log('user disconnectedd');
    });


});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
