import * as io from 'socket.io-client';
import { Game } from './game';

$(function () {

    var socket = io();

    var game = new Game(socket);


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
