import { Component } from "./components";
import { Bodies, Engine, World } from "matter-js";
import { MATTER_JS_BODIES, GameManager } from "../gamemanager";
/**
 * Fichiers reçensant les Components coté serveur pour les components complexes
 * La structure des components déclaré ici doit être redéclarer dans componentsclient.ts
 * @packageDocumentation
 * @module Components.Server
 */
export class C_RigidBody extends Component {

    weight : number;
    BodyID : number;

    constructor(p_weight : number = 1, p_x : number = 0, p_y: number = 0) {
        super();
        this.weight = p_weight;
        this.BodyID = +Math.random().toString().substr(2,9);
        let rigidbodyObject = Bodies.rectangle(p_x, p_y, 64, 64, { frictionAir: 0.05 });
        MATTER_JS_BODIES[this.BodyID] = rigidbodyObject;
        World.addBody(GameManager.matterEngine.world, rigidbodyObject);
    }
}