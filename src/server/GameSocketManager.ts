import { GameManager } from "./engine/gamemanager"
import { ServerIO } from "./main";

export class GameSocketManager {

    game : GameManager;

    constructor(p_game : GameManager) {
        this.game = p_game;
    }

    newPlayer(socket: SocketIO.EngineSocket) {

        
    }

    private newPlayerSocket(socket: SocketIO.EngineSocket) {
        console.log('player connected : ' + socket.id);

        socket.on('PlayerInput', (data : any) => {

            console.log('player inputs : ' + JSON.stringify(data));
          });

        socket.on('disconnect', () => {

            console.log('user disconnected : ' + socket.id);
            //delete PLAYERS[socket.id];
            ServerIO.emit('disconnect', socket.id);
        });
    }
}