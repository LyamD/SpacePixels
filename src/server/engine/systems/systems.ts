import { System } from "./systemmanager";
import { Component, C_Transform, C_Engine, C_Player } from "../components/components";
import { ServerIO } from "../../main";

export class S_Propulsion extends System {

    run(entityComponents : Array<Component>, entityID : number) {
        let Components = System.mapEntities(entityComponents);
        let transform : C_Transform = Components['C_Transform'];
        let propulsion : C_Engine = Components['C_Engine'];
        transform.x = transform.x + propulsion.speed;
    }
}

export class S_PlayerInputs extends System {
    
    run(entityComponents : Array<Component>, entityID : number) {
        let Components = System.mapEntities(entityComponents);
        let player : C_Player = Components['C_Player'];
        let transform : C_Transform = Components['C_Transform'];

        
        if (player.inputs.MoveUp) {
            transform.y = transform.y-3
        }
        if (player.inputs.MoveDown) {
            transform.y = transform.y+3
        }
        if (player.inputs.MoveDroite) {
            transform.x = transform.x+3
        }
        if (player.inputs.MoveGauche) {
            transform.x = transform.x-3
        }

    }
}