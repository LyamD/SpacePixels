import { GameManager } from "./engine/gamemanager"
import { ServerIO } from "./main";
import { Entity } from "./engine/components/entity";
import { C_Transform, C_Renderer, C_Player } from "./engine/components/components";
import { C_RigidBody } from "./engine/components/componentsserver";

/**
 * Réceptionne les données envoyée par les clients et les transmet au jeu
 */

export class GameSocketManager {

    /**
     * Référence vers le jeu 
     * Voir {@link GameManager}
     * 
     */
    game : GameManager;

    /** @param p_game une réf vers le GameManager */
    constructor(p_game : GameManager) {
        this.game = p_game;
    }

    /**
     * Créer et ajoute une nouvelle entité Joueur
     * @param socket le socket du client auquel on veut créer une entité
     */
    newPlayer(socket: SocketIO.EngineSocket) {

        let c_transform = new C_Transform(50,50);
        let c_renderer = new C_Renderer("player");
        let c_player = new C_Player(socket.id);
        let c_rigidbody = new C_RigidBody(1,50,50);

        let playerEntity = new Entity([c_transform, c_renderer, c_player, c_rigidbody]);
        
        this.game.SPWORLD.addEntity(playerEntity);

        this.newPlayerSocket(socket, playerEntity);
        this.socketInput(socket, playerEntity);
        
    }

    /**
     * Ajoute tout les event de reception socket.io pour ce socket joueur
     * @param socket le socket du client auquel on veut créer une entité
     * @event SocketIO
     */
    private newPlayerSocket(socket: SocketIO.EngineSocket, playerEntity : Entity) {
        console.log('player connected : ' + socket.id);

        socket.on('disconnect', () => {

            console.log('user disconnected : ' + socket.id);
            this.game.SPWORLD.addEntityToGarbage(playerEntity.id);
            ServerIO.emit('disconnect', socket.id);
        });
    }

    /**
     * Ajoute les event socket IO en rapport avec les inputs joueurs
     * @param socket le socket du joueur
     * @param playerEntity l'entité lié au socket du joueur;
     */
    private socketInput(socket : SocketIO.EngineSocket, playerEntity : Entity) {

        let inputs = this.game.SPWORLD.getComponentFromEntity(playerEntity, "C_Player"); 

        socket.on('PlayerInput', (data : any) => {

            inputs.inputs[data.action] = data.state;

          });
    }
}