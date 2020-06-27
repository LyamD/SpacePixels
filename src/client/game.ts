import * as PIXI from "pixi.js";
import {Entity} from "./engine/components/entity";
import { EntitiesManager } from "./engine/entitiesmanager";
import { Component } from "./engine/components/component";
import { SystemManager } from "./engine/systems/systemmanagerclient";
import { S_Render } from "./engine/systems/systems";

export const RenderedEntities = Array<any>();

export class Game {

    ENTITIES : Array<Entity>;
    COMPONENTS : Array<Component>;
    socket : any;
    pixiApp : any;

    EntitiesManager : EntitiesManager;
    SystemManager : SystemManager;

    constructor(pixiApp: any, socket : any) {
        this.ENTITIES = new Array<Entity>();
        this.COMPONENTS = new Array<Component>();
        this.socket = socket;
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
        this.socket.on('state', (data : Array<any>) => {
            //console.log('Entities recu : ' + JSON.stringify(data));
            data.forEach((entity) => {

                if (entity != null) {

                    this.EntitiesManager.updateEntity(entity);
                }
            });

            this.EntitiesManager.cleanEntities(data);
        });
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

