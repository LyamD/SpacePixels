//Server Imports
import * as express from 'express';
import * as path from 'path';

// Game Import
import * as game from './engine/gamemanager';
import { GameSocketManager } from './GameSocketManager';

/**
 * Fichier primaire, base du jeu. Fait principalement le lien entre Socket.io et le jeu
 * @packageDocumentation
 */

//Création serveur express/node
const app = express();
let http = require('http').createServer(app);

/** Notre instance de serveur Socket IO, accessible dans tout le code */
export const ServerIO = require('socket.io')(http);
//Changement path coté client
app.use(express.static(path.join(__dirname + '/../client/')));//middleware



//On créer un gameManager et on lance le jeu
/** Notre instance du jeu */
var GameManager = new game.GameManager();
GameManager.launch();
/** Instance du socket manager */
var socketManager = new GameSocketManager(GameManager);

//Envoie page client
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'));
});


ServerIO.on('connection', (socket : SocketIO.EngineSocket) => {

    //Connection d'un joueur: On affiche son id
    socketManager.newPlayer(socket);


    socket.on('chat message', (msg : string) => {
      ServerIO.emit('chat message', msg);
      });


    


});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
