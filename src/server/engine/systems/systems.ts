import { System } from "./systemmanager";
import { Component, C_Transform } from "../components/component";

export class TestSystem extends System {

    constructor(components : Array<string>) {
        super(components);
   }

    run(entities : Array<Component>) {
        let transform : C_Transform = entities['C_Transform'];
        
        transform.x = transform.x + 1;
        console.log(transform.x);
    }

}

// export class Render extends System {

//     run(entities : Array<Component>) {

//     }
// }