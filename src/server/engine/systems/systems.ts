import { System } from "./systemmanager";
import { Component, C_Transform, C_Engine, C_Player } from "../components/components";
import { ServerIO } from "../../main";
import { C_RigidBody } from "../components/componentsserver";
import { MATTER_JS_BODIES } from "../gamemanager";
import { Body } from "matter-js";

export class S_Propulsion extends System {

    run(entityComponents : Array<Component>, entityID : number) {
        let Components = System.mapEntities(entityComponents);
        let transform : C_Transform = Components['C_Transform'];
        let propulsion : C_Engine = Components['C_Engine'];
        transform.x = transform.x + propulsion.power;
    }
}

export class S_PlayerInputs extends System {
    
    run(entityComponents : Array<Component>, entityID : number) {
        let Components = System.mapEntities(entityComponents);
        let player : C_Player = Components['C_Player'];
        let rigidbody : C_RigidBody = Components['C_RigidBody'];

        let matterBody : Body = MATTER_JS_BODIES[rigidbody.BodyID];

        
        if (player.inputs.MoveUp) {
            Body.applyForce( matterBody, {x: matterBody.position.x , y: matterBody.position.y}, {x: 0, y: -0.02});
        }
        if (player.inputs.MoveDown) {
            Body.applyForce( matterBody, {x: matterBody.position.x , y: matterBody.position.y}, {x: 0, y: 0.02});
        }
        if (player.inputs.MoveDroite) {
            Body.applyForce( matterBody, {x: matterBody.position.x , y: matterBody.position.y}, {x: 0.02, y: 0});
        }
        if (player.inputs.MoveGauche) {
            Body.applyForce( matterBody, {x: matterBody.position.x , y: matterBody.position.y}, {x: -0.02, y: 0});
        }

    }
}

export class S_RigidBody extends System {

    run(entityComponents : Array<Component>, entityID : number) {
        let Components = System.mapEntities(entityComponents);
        let transform : C_Transform = Components['C_Transform'];
        let rigibody : C_RigidBody = Components['C_RigidBody'];

        let matterBody : Body = MATTER_JS_BODIES[rigibody.BodyID];

        transform.x = matterBody.position.x;
        transform.y = matterBody.position.y;

        transform.rotation = matterBody.angle;

        //console.log('entity id : ' + entityID + ' ,position x: ' + transform.x + ' , y: ' + transform.y + ' , rotation : ' + transform.rotation);
    }
}