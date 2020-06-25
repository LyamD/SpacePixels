import { Player } from "./engine/player";

const { Engine } = require("matter-js");

export function main(engine : any, PLAYERS : Array<Player>) {

    var ENTITIES : any[] = [];
    //Game loop
    setInterval(function() {
        //Loop de MatterJS
        Engine.update(engine, 1000/60);

        
        
    }, 1000/60);
};