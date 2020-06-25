import * as PIXI from "pixi.js";
import {Entity} from "./engine/components/entity";
var pixiapp = new PIXI.Application();

export function run(socket: any) {

    socket.on('debug', (data : Array<Entity>) => {
        data.forEach((entity) => {
            if (entity != null) {
                let ent: Entity = {
                    id: entity.id,
                    components: entity.components
                }
                console.log(ent);
            }
        })
        //console.log('debug' + data);
    })

    // playerInputs(socket);
    // renderWorld();
    // playerGestion(socket);
}

var PLAYERS : any[] = [];

function playerGestion(socket: any) {
    socket.on('currentPlayers', (data) => {
        console.log(data);

        let playerz = [];
        Object.keys(data).map( (key) => {
            playerz.push({[key] : data[key]})
            return playerz;
        } );

        //console.log(playerz[0]);
        renderPlayer(playerz[0]['PLAYERS']);
    });
}

function renderWorld() {
    

    document.body.appendChild(pixiapp.view);

    //Définition variables
    // let rectangle = new PIXI.Graphics(),
    //     state : any;

    // app.loader.load(setup);

    // function setup() {
        
    //     rectangle.lineStyle(4, 0xFF3300, 1);
    //     rectangle.beginFill(0x66CCFF);
    //     rectangle.drawRect(0, 0, 64, 64);
    //     rectangle.endFill();
    //     rectangle.position.set(150,150);
    //     app.stage.addChild(rectangle);

    //     state = play;

    //     app.ticker.add(delta => gameLoop(delta));
    // }

    // function gameLoop(delta : any) {
    //     state(delta);
        
    // }

    // function play(delta : any) {
    //     rectangle.x += 1 + delta;
    // }
}

function renderPlayer(players : Array<any>) {
    //console.log(players);
    for (let i in players){
        console.log('playerGestion loop : ' + i);
        let rect = new PIXI.Graphics();
        rect.lineStyle(4, 0xFF3300, 1);
        rect.beginFill(0x66CCFF);
        rect.drawRect(0, 0, 64, 64);
        rect.endFill();
        rect.position.set(150,150);
        pixiapp.stage.addChild(rect);

    }
}

function playerInputs(socket : any) {

    let keyArrowUp = false;

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    function keyDownHandler(e:any) {
        if (e.key == 'ArrowUp' && !keyArrowUp) {
            keyArrowUp = true;
            socket.emit('keyDown', 'up');
        }
    }

    function keyUpHandler(e:any) {
        if (e.key == 'ArrowUp') {
            keyArrowUp = false;
            socket.emit('keyUp', 'up');
        }
    }


}
