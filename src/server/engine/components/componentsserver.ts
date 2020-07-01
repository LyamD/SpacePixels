import { Component } from "./components";

// Les components déclarer ici doivent aussi être aussi redéclarer dans componentsclient sans constructeur rempli (hors super();)

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