import { System } from "./systemmanager";
import { Component, C_Transform, C_Engine, C_Player } from "../components/components";
import { ServerIO } from "../../main";

export class S_Propulsion extends System {

    run(entityComponents : Array<Component>, entityID : number) {
        let Components = System.mapEntities(entityComponents);
        let transform : C_Transform = Components['C_Transform'];
        let propulsion : C_Engine = Components['C_Engine'];
        transform.x = transform.x + propulsion.speed;
        console.log('entité : ' + entityID + ' , position : ' + JSON.stringify(transform));
    }
}

export class S_PlayerInputs extends System {
    
    run(entityComponents : Array<Component>, entityID : number) {
        let Components = System.mapEntities(entityComponents);
        let player : C_Player = Components['C_Player'];

        let socket = ServerIO.sockets.connected[player.socketID];
        

    }
}