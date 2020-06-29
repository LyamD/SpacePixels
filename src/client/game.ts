import * as PIXI from "pixi.js";
import {Entity} from "./engine/components/entity";
import { EntitiesManager } from "./engine/entitiesmanager";
import { SystemManager } from "./engine/systems/systemmanagerclient";
import { S_Render } from "./engine/systems/systems";
import { setupSocketManager } from "./socketmanager";
import { PlayerSocket } from ".";
import { Component } from "./engine/components/components";

export const RenderedEntities = Array<any>();

export class Game {

    ENTITIES : Array<Entity>;
    COMPONENTS : Array<Component>;
    pixiApp : any;

    EntitiesManager : EntitiesManager;
    SystemManager : SystemManager;

    constructor(pixiApp: any) {
        this.ENTITIES = new Array<Entity>();
        this.COMPONENTS = new Array<Component>();
        this.pixiApp = pixiApp;

        this.EntitiesManager = new EntitiesManager(this.ENTITIES, this.COMPONENTS);
        this.SystemManager = new SystemManager(this.COMPONENTS);

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
            new S_Render(['C_Transform', 'C_Renderer'], this.pixiApp)
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

