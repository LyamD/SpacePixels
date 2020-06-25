//Server Imports
import * as express from 'express';
import * as socketio from 'socket.io';
import * as path from 'path';

// Game Import
import * as matterjs from 'matter-js';
import * as game from './game';
import { Player } from './engine/player';
import { Position } from './engine/position';

//Création serveur express/node
const app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
//Changement path coté client
app.use(express.static(path.join(__dirname + '/../client/')));//middleware

//Création MatterJS engine
var engine = matterjs.Engine.create();

//Liste des joueurs
var PLAYERS : Player[] = [];
game.main(engine, PLAYERS);

//Envoie page client
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

io.on('connection', (socket : any) => {

  // Objet data envoyée
    let data = {
      PLAYERS : {}
    };
    //Connection d'un joueur: On affiche son id
    console.log('player connected : ' + socket.id);
    //On créer son objet Player en pos 0,0
    let player = new Player(new Position(0,0));
    PLAYERS[socket.id] = (player);

    //On transforme l'array en Objet car socketIO ne transmet pas d'array
    Object.assign(data.PLAYERS, PLAYERS);

    //On envoie une liste de tout les joueurs présent
    socket.emit('currentPlayers', data);

    socket.broadcast.emit('newPlayer', PLAYERS[socket.id]);

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

        console.log('user disconnected : ' + socket.id);
        delete PLAYERS[socket.id];
        io.emit('disconnect', socket.id);
    });


});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
