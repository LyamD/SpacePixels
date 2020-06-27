import * as PIXI from "pixi.js";
import * as io from 'socket.io-client';
import { Game } from './game';

$(function () {

    // on créer un socket client
    var socket = io();

    //Création de l'appli PIXI
    var pixi = new PIXI.Application({
      antialias: true,
      resolution: 1
    });

    //Création de l'instance de jeu
    var game = new Game(pixi, socket);

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
