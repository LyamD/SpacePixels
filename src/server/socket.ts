// export class GSocket {
//     socket: any;

//     constructor(socket: any, io: any) {
//         this.socket = socket

//         //On envoie une liste de tout les joueurs présent
//     socket.emit('currentPlayers', data);

//     socket.broadcast.emit('newPlayer', PLAYERS[socket.id]);

//     socket.on('keyDown', (msg : string) => {
//       io.emit('chat message', msg + 'pressed');
//     });

//     socket.on('keyUp', (msg : string) => {
//       io.emit('chat message', msg + 'unpressed');
//     });

//     socket.on('chat message', (msg : string) => {
//         io.emit('chat message', msg);
//       });


//     socket.on('disconnect', () => {

//         console.log('user disconnected : ' + socket.id);
//         delete PLAYERS[socket.id];
//         io.emit('disconnect', socket.id);
//     });
//     }

    
// }