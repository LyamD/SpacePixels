//Server Imports
import * as express from 'express';
import * as socketio from 'socket.io';
import * as path from 'path';

// Game Import

import * as game from './engine/gamemanager';

//Création serveur express/node
const app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
//Changement path coté client
app.use(express.static(path.join(__dirname + '/../client/')));//middleware

var GameManager = new game.GameManager();
GameManager.launch();

//Envoie page client
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});

io.on('connection', (socket : any) => {

  // Objet data envoyée
    let data = new Array<any>();
    GameManager.SPWORLD.ENTITIES.forEach(ent => {
      data.push(ent);
    })
    

    //Connection d'un joueur: On affiche son id
    console.log('player connected : ' + socket.id);
    //On créer une entité et on lui assigne le C_Player
    socket.emit('debug',data );
    //On transforme l'array en Objet car socketIO ne transmet pas d'array
    //Object.assign(data.ENTITIES, S_Socket.run());

    //On envoie une liste de tout les joueurs présent
    //socket.emit('currentPlayers', sendedEntities);

    //socket.broadcast.emit('newPlayer', PLAYERS[socket.id]);

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
        //delete PLAYERS[socket.id];
        io.emit('disconnect', socket.id);
    });


});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
