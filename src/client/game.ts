import * as PIXI from "pixi.js";
import {Entity} from "./engine/components/entity";
import { EntitiesManager } from "./engine/entitiesmanager";
import { Component } from "./engine/components/component";
import { SystemManager } from "./engine/systems/systemmanagerclient";
import { S_Render } from "./engine/systems/systems";

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

    gameSetup() {
        this.SystemManager.addSystem(
            new S_Render(['C_Transform', 'C_Renderer'])
        );
    }


    private setupSocket() {
        this.socket.on('state', (data : Array<any>) => {
            //console.log('Entities recu : ' + JSON.stringify(data));
            data.forEach((entity) => {

                if (entity != null) {

                    this.EntitiesManager.updateEntity(entity);

                }
            });

            this.EntitiesManager.cleanEntities(data);

            //console.log('Entities local : ' + JSON.stringify(this.ENTITIES));
        });
    }



    createWorldRender(pixi : any, run : (delta : any) => void) {
        document.body.appendChild(pixi.view);

        pixi.loader.load(setup);

        function setup() {

            pixi.ticker.add(delta => run(delta));
        }
    }

}

// export function run(socket: any) {
// }


// function renderWorld() {
    

    
// }

// function renderPlayer(players : Array<any>) {
//     //console.log(players);
//     for (let i in players){
//         console.log('playerGestion loop : ' + i);
//         let rect = new PIXI.Graphics();
//         rect.lineStyle(4, 0xFF3300, 1);
//         rect.beginFill(0x66CCFF);
//         rect.drawRect(0, 0, 64, 64);
//         rect.endFill();
//         rect.position.set(150,150);
//         pixiapp.stage.addChild(rect);

//     }
// }

// function playerInputs(socket : any) {

//     let keyArrowUp = false;

//     document.addEventListener('keydown', keyDownHandler, false);
//     document.addEventListener('keyup', keyUpHandler, false);

//     function keyDownHandler(e:any) {
//         if (e.key == 'ArrowUp' && !keyArrowUp) {
//             keyArrowUp = true;
//             socket.emit('keyDown', 'up');
//         }
//     }

//     function keyUpHandler(e:any) {
//         if (e.key == 'ArrowUp') {
//             keyArrowUp = false;
//             socket.emit('keyUp', 'up');
//         }
//     }


// }
