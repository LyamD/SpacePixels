import * as PIXI from "pixi.js";
import {Entity} from "./engine/components/entity";
import { EntitiesManager } from "./engine/entitiesmanager";
import { setupMaster } from "cluster";

export class Game {

    ENTITIES : Array<Entity>;
    socket : any;
    pixiApp : any;

    EntitiesManager : EntitiesManager;

    constructor(pixiApp: any, socket : any) {
        this.ENTITIES = new Array<Entity>();
        this.socket = socket;
        this.pixiApp = pixiApp;

        this.EntitiesManager = new EntitiesManager(this.ENTITIES);

        this.setupSocket();
        this.createWorldRender(pixiApp, delta => {

            //Game loop
            
        })
    }


    private setupSocket() {
        this.socket.on('state', (data : Array<any>) => {
            data.forEach((entity) => {

                if (entity != null) {

                    this.EntitiesManager.updateEntity(entity);

                }
            })

            this.EntitiesManager.cleanEntities(data);
        })
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
