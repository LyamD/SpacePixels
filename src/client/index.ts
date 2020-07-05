import * as PIXI from "pixi.js";
import * as io from 'socket.io-client';
import { Game } from './game';

// on créer un socket client
export const PlayerSocket = io();

//Création de l'appli PIXI
export const pixiApp = new PIXI.Application({
  antialias: true,
  resolution: 1
});

//Création de l'instance de jeu
var game = new Game();

$(function () {


    $('form').submit(function(e) {
      e.preventDefault(); // prevents page reloading
      PlayerSocket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    PlayerSocket.on('chat message', function(msg : string) {
        $('#messages').append($('<li>').text(msg));
    });

    
  });
