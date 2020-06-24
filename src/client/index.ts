import * as PIXI from "pixi.js";
import * as io from 'socket.io-client';
import * as game from './game';

let app = new PIXI.Application();

document.body.appendChild(app.view);

$(function () {

    var socket = io();

    game.run(socket);

    $('form').submit(function(e) {
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    socket.on('chat message', function(msg : string) {
        $('#messages').append($('<li>').text(msg));
    });

    
  });
