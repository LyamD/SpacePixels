import {Entity} from "./engine/components/entity";
import { EntitiesManager } from "./engine/entitiesmanager";
import { SystemManager } from "./engine/systems/systemmanagerclient";
import { S_Render } from "./engine/systems/systems";
import { setupSocketManager } from "./socketmanager";
import { PlayerSocket, pixiApp } from ".";
import { Component } from "./engine/components/components";

export const RenderedEntities = Array<any>();

export class Game {

    ENTITIES : Array<Entity>;

    EntitiesManager : EntitiesManager;
    SystemManager : SystemManager;

    constructor() {
        this.ENTITIES = new Array<Entity>();

        this.EntitiesManager = new EntitiesManager(this.ENTITIES);
        this.SystemManager = new SystemManager();

        this.setupSocket();
        this.gameSetup();
        this.createWorldRender(pixiApp, delta => {

            //Game loop

            this.SystemManager.runSystems([this.SystemManager.systemsIndex.S_Render], this.ENTITIES);
            
        })
    }

    //est lancé avant notre boucle de jeu
    gameSetup() {
        this.SystemManager.addSystem(
            new S_Render(['C_Transform', 'C_Renderer'])
        );
    }

    //Setup tout les event de socket.io
    private setupSocket() {

        //Setup Event 'state' envoyant toutes les entités (Besoin de le faire ici et pas dans SocketManager en raison du besoin des entités)
        PlayerSocket.on('state', (data : Array<any>) => {
            //console.log('Entities recu : ' + JSON.stringify(data));
            data.forEach((entity) => {

                if (entity != null) {

                    this.EntitiesManager.updateEntity(entity);
                }
            });

            this.EntitiesManager.cleanEntities(data);
        });

        setupSocketManager();
    }


    //Créer notre renderer et lance la gameloop de PIXI
    createWorldRender(pixi : any, run : (delta : any) => void) {
        document.body.appendChild(pixi.view);

        pixi.loader.load(setup);

        function setup() {

            pixi.ticker.add(delta => run(delta));
        }
    }

}

