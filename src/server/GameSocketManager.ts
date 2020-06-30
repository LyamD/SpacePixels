import { GameManager } from "./engine/gamemanager"
import { ServerIO } from "./main";
import { Entity } from "./engine/components/entity";
import { C_Transform, C_Renderer, C_Player } from "./engine/components/components";

export class GameSocketManager {

    game : GameManager;

    constructor(p_game : GameManager) {
        this.game = p_game;
    }

    newPlayer(socket: SocketIO.EngineSocket) {

        let c_transform = new C_Transform(50,50);
        let c_renderer = new C_Renderer("styled");
        let c_player = new C_Player(socket.id);

        let playerEntity = new Entity([c_transform, c_renderer, c_player]);
        
        this.game.SPWORLD.addEntity(playerEntity);

        this.newPlayerSocket(socket);
        this.socketInput(socket, playerEntity);
        
    }

    private newPlayerSocket(socket: SocketIO.EngineSocket) {
        console.log('player connected : ' + socket.id);

        socket.on('disconnect', () => {

            console.log('user disconnected : ' + socket.id);
            //delete PLAYERS[socket.id];
            ServerIO.emit('disconnect', socket.id);
        });
    }

    private socketInput(socket : SocketIO.EngineSocket, playerEntity : Entity) {

        let inputs = this.game.SPWORLD.getComponentFromEntity(playerEntity, "C_Player"); 
        //console.log(JSON.stringify(inputs));

        socket.on('PlayerInput', (data : any) => {

            //console.log('player : ' + playerEntity.id + ' , socket : ' + socket.id + ' ,inputs : ' + JSON.stringify(data));
            inputs.inputs[data.action] = data.state;

          });
    }
}