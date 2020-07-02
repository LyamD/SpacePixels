import { Component } from "./components";
/**
 * Fichiers reçensant les Components coté serveur pour les components complexes
 * La structure des components déclaré ici doit être redéclarer dans componentsclient.ts
 * @packageDocumentation
 * @module Components.Server
 */
export class C_RigidBody extends Component {

    weight : number;
    BodyID : number;

    constructor() {
        super();
        // this.weight = p_weight;
        // this.BodyID = +Math.random().toString().substr(2,9);
        // let rigidbodyObject = Bodies.rectangle(p_x, p_y, 64, 64);
        // MATTER_JS_BODIES[this.BodyID] = rigidbodyObject;
        // World.addBody(matterEngine.world, rigidbodyObject);
    }
}